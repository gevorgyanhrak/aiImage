# Code Review Issues Report

This document catalogs potential bugs and code quality issues identified during the architecture review.

## High Impact Issues

### Environment Configuration & Startup Failures

#### Issue #2: Unsafe Redis URL Access
**Location**: `src/lib/redis/redis.ts:23`  
**Status**: ✅ Valid  
**Impact**: 🔴 High - Server crashes on startup

**Problem**:  
`process.env.REDIS_GENAI_PUBSUB_SENTINEL_URI!` is dereferenced and passed to `new URL()` with no guard. When cache is enabled (`IS_CACHE_ENABLED=true`) but the Redis URL environment variable is missing, the constructor throws `TypeError: Invalid URL` before any logging can explain the failure. This crashes the server on startup.

**Suggested Fix**:
```typescript
const redisUrl = process.env.REDIS_GENAI_PUBSUB_SENTINEL_URI;
if (!redisUrl) {
  throw new Error('REDIS_GENAI_PUBSUB_SENTINEL_URI is required when cache is enabled');
}
const url = new URL(redisUrl);
```

---

#### Issue #6: Unsafe HUB_DOCUMENT_ID Usage
**Location**: `src/app/page.tsx:15`  
**Status**: ✅ Valid  
**Impact**: 🔴 High - Invalid API calls

**Problem**:  
The non-null assertion (`HUB_DOCUMENT_ID!`) forwards `undefined` to `getHubByDocumentId()` when the environment variable is missing. This causes `/hubs/undefined` Strapi API calls instead of failing loudly. Results in 404s or invalid responses that are harder to trace back to missing configuration.

**Suggested Fix**:
```typescript
if (!HUB_DOCUMENT_ID) {
  throw new Error('NEXT_PUBLIC_HUB_DOCUMENT_ID is required');
}
// or for better UX:
if (!HUB_DOCUMENT_ID) {
  notFound();
}
```

---

### Error Handling

#### Issue #8: Overly Broad Landing Fetch Catch
**Location**: `src/lib/strapi/landings/index.ts:6-14`  
**Status**: ✅ Valid  
**Impact**: 🔴 High - Hidden production errors

**Problem**:  
All Strapi errors (network failures, authentication errors, 500s, 404s) trigger `redirect('/')`, hiding root causes and returning HTTP 200 instead of surfacing the failure. This makes production debugging extremely difficult and masks infrastructure issues. Users see the homepage instead of appropriate error pages, breaking expected behavior.

**Suggested Fix**:
```typescript
export async function getLandingBySlug(slug: string, tags?: string[]) {
  try {
    const res = await strapiFetch<LandingApiResponse>({
      path: `/landings/${slug}`,
      tags,
    });
    return res;
  } catch (error) {
    // Only redirect on 404, rethrow other errors
    if (error instanceof Error && error.message.includes('404')) {
      notFound(); // or redirect('/')
    }
    throw error; // Rethrow network/auth/500 errors
  }
}
```

---

## Medium Impact Issues

### Environment Configuration

#### Issue #3: Unsafe Secret Usage in Cache Revalidator
**Location**: `src/services/cacheRevalidator/cacheRevalidator.ts:77`  
**Status**: ✅ Valid  
**Impact**: 🟡 Medium - Silent cache invalidation failures

**Problem**:  
The non-null assertion sends `undefined` when `NEXT_REVALIDATE_SECRET` isn't set, leading to repeated unauthorized requests (401s) instead of a fail-fast error. This causes silent cache invalidation failures that are hard to debug. The system continues operating but cache invalidation never works.

**Suggested Fix**:
```typescript
const secret = process.env.NEXT_REVALIDATE_SECRET;
if (!secret) {
  throw new Error('NEXT_REVALIDATE_SECRET is required when cache is enabled');
}
// ... later in headers:
'x-revalidate-secret': secret,
```

---

### API Validation

#### Issue #5: Missing Validation for Empty Tag/Path
**Location**: `src/app/api/revalidate/route.ts:18-31`  
**Status**: ✅ Valid  
**Impact**: 🟡 Medium - False-positive success responses

**Problem**:  
`RevalidateParamsSchema` allows both `tag` and `path` fields to be absent. When both are missing, the handler returns `{ ok: true }` without performing any action. This creates false-positive success responses and makes debugging cache invalidation issues harder. The response at line 33 returns `{ ok: true, tag }` even when `tag` is `undefined`.

**Suggested Fix**:
```typescript
const { tag, path } = data;

if (!tag && !path) {
  return new Response(
    JSON.stringify({ ok: false, error: 'Either tag or path must be provided' }),
    { status: 400, headers: { 'Content-Type': 'application/json' } }
  );
}
```

---

### Error Handling

#### Issue #9: Silent Error Swallowing in Cache Revalidator
**Location**: `src/services/cacheRevalidator/cacheRevalidator.ts:80-82`  
**Status**: ✅ Valid  
**Impact**: 🟡 Medium - Monitoring blind spots

**Problem**:  
Errors are stringified and logged but never emitted or rethrown, so monitoring cannot distinguish healthy invalidations from repeated failures. This makes it impossible to alert on cache invalidation failures or track success rates. The `revalidate()` method returns `undefined` on error, hiding failures from callers.

**Suggested Fix**:
```typescript
async revalidate(payload: RevalidateParams) {
  try {
    // ... validation ...
    return await axios.post(`${base}/api/revalidate`, payload, { headers });
  } catch (error) {
    console.error('❌ Error revalidating:', error);
    // Option 1: Rethrow for upstream handling
    throw error;
    // Option 2: Return error status
    // return { success: false, error };
  }
}
```

---




### Memory Leaks & Resource Management

#### Issue #11: AbortController Not Cleaned Up on Unmount
**Location**: `src/components/PresetEditor/UploadArea/index.tsx:37`  
**Status**: ✅ Valid  
**Impact**: 🔴 High - Memory leaks and unnecessary network requests

**Problem**:  
`AbortController` is created in `onFileSelect` but never aborted when the component unmounts during an upload. If a user navigates away or the component unmounts while uploading, the request continues in the background, wasting bandwidth and potentially causing memory leaks. The controller is created but there's no cleanup in a `useEffect` return function.

**Suggested Fix**:
```typescript
const UploadArea = ({ id, ... }: IUploadArea) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  
  useEffect(() => {
    return () => {
      // Abort any ongoing uploads on unmount
      abortControllerRef.current?.abort();
    };
  }, []);

  const onFileSelect = async (urls: string[]) => {
    // Abort previous upload if exists
    abortControllerRef.current?.abort();
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    try {
      const response = await uploadToCDN({
        sourceUrl: localUrl,
        options: {
          signal: controller.signal,
          onProgress: (p: number) => setProgress(p),
        },
      });
      // ... rest of logic
    } catch (error) {
      if (error.name === 'AbortError') {
        // Upload was cancelled, don't show error
        return;
      }
      // ... error handling
    }
  };
};
```

---

#### Issue #12: Video Frame Capture Memory Leak
**Location**: `src/utils/captureVideoFrame.ts:1-41`  
**Status**: ✅ Valid  
**Impact**: 🔴 High - GPU memory leaks

**Problem**:  
`captureFirstFrameDataUrl` creates a video element and sets up event listeners, but if the promise is rejected before `loadeddata` fires (e.g., network error, timeout), the cleanup function is never called. The video element, blob URL, and event listeners remain in memory. Additionally, if the component unmounts or the video source changes before the promise resolves, cleanup never happens.

**Suggested Fix**:
```typescript
export async function captureFirstFrameDataUrl(videoSrc: string, signal?: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    let cleanupCalled = false;
    
    const cleanup = () => {
      if (cleanupCalled) return;
      cleanupCalled = true;
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('error', onError);
      video.src = '';
      video.load();
      if (videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }
    };

    const onError = () => {
      cleanup();
      reject(new Error('Failed to load video for thumbnail'));
    };

    const onLoadedData = () => {
      try {
        // ... existing logic ...
        cleanup();
        resolve(dataUrl);
      } catch (e) {
        cleanup();
        reject(e);
      }
    };

    // Handle abort signal
    if (signal) {
      signal.addEventListener('abort', () => {
        cleanup();
        reject(new Error('Video capture aborted'));
      });
    }

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('error', onError);
    video.src = videoSrc;
  });
}
```

---

### Error Handling & User Experience

#### Issue #13: Silent Error Handling in PreviewFooter
**Location**: `src/components/PresetEditor/PreviewFooter/index.tsx:70-72`  
**Status**: ✅ Valid  
**Impact**: 🔴 High - Poor user experience, hidden failures

**Problem**:  
Errors in `onGenerate` are caught and only logged to console with a TODO comment. Users get no feedback when generation fails (network errors, API errors, invalid responses). The button loading state resets, making it appear as if nothing happened. This creates a frustrating user experience where failures are invisible.

**Suggested Fix**:
```typescript
const [error, setError] = useState<string | null>(null);

const onGenerate = async () => {
  try {
    setError(null);
    setIsLoading(true);
    // ... existing logic ...
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate. Please try again.';
    setError(errorMessage);
    // TODO: Replace with toast notification
    console.error('Generation error:', error);
  } finally {
    setIsLoading(false);
  }
};

// In JSX, show error message:
{error && (
  <div className="text-red-500 text-sm mt-2">{error}</div>
)}
```

---

#### Issue #14: Missing Error State Display in UploadArea
**Location**: `src/components/PresetEditor/UploadArea/index.tsx:58-62`  
**Status**: ✅ Valid  
**Impact**: 🟡 Medium - Poor user feedback

**Problem**:  
When upload fails, the error is logged but `setStatus(UploadStatus.IDLE)` resets the UI, making it appear as if nothing happened. Users don't know why their upload failed or that it failed at all. The `ERROR` status exists but is only set via `onError` callback, not from upload failures.

**Suggested Fix**:
```typescript
catch (error) {
  console.error(error);
  setProgress(0);
  setStatus(UploadStatus.ERROR); // Show error state instead of resetting
  // Optionally store error message for display
}
```

---

### Performance Issues

---

#### Issue #16: Missing Timeout on Strapi Fetch
**Location**: `src/lib/strapi.ts:28-52`  
**Status**: ⚠️ Improvement (not a bug)  
**Impact**: 🟢 Optional resilience hardening

**Problem**:  
`strapiFetch` defers to the platform `fetch` implementation (via `nextFetch`). Next.js already enforces request timeouts in the runtime, so the absence of a local `AbortController` does not create a functional bug—calls will still reject once the framework-level timeout elapses. Adding a custom timeout might be desirable for quicker failures, but it is not required for correctness.

**Suggested Fix**:  
Optional enhancement if stricter SLAs are needed; no action required for baseline functionality.

---

