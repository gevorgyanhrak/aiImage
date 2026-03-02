'use client';

import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

type ObserverHandler = (entry: IntersectionObserverEntry) => void;
type ObserverRecord = { observer: IntersectionObserver; handlers: Map<Element, ObserverHandler> };

const rootIds = new WeakMap<Element | Document, string>();
const observerRegistry = new Map<string, ObserverRecord>();
let rootIdCounter = 0;

const getRootId = (root?: Element | Document | null) => {
  if (!root) return 'global';
  const existingId = rootIds.get(root);
  if (existingId) return existingId;
  const newId = `root-${rootIdCounter++}`;
  rootIds.set(root, newId);
  return newId;
};

const getObserverKey = (options: IntersectionObserverInit) => {
  const rootId = getRootId(options.root as Element | Document | null);
  const margin = options.rootMargin ?? '0px';
  const threshold = Array.isArray(options.threshold) ? options.threshold.join('|') : `${options.threshold ?? 0}`;
  return `${rootId}:${margin}:${threshold}`;
};

const getSharedObserver = (options: IntersectionObserverInit) => {
  const key = getObserverKey(options);
  const existingRecord = observerRegistry.get(key);

  if (existingRecord) return { key, record: existingRecord };

  const handlers = new Map<Element, ObserverHandler>();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const handler = handlers.get(entry.target);
      handler?.(entry);
    });
  }, options);

  const record = { observer, handlers };
  observerRegistry.set(key, record);
  return { key, record };
};

const cleanupObserver = (key: string) => {
  const record = observerRegistry.get(key);
  if (!record || record.handlers.size > 0) return;
  record.observer.disconnect();
  observerRegistry.delete(key);
};

interface UseSharedObserverOptions extends IntersectionObserverInit {
  ref: RefObject<Element | null>;
}

export const useSharedIntersectionObserver = ({ ref, root, rootMargin, threshold }: UseSharedObserverOptions) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const { key, record } = getSharedObserver({ root, rootMargin, threshold });

    const handler: ObserverHandler = newEntry => {
      setEntry(newEntry);
    };

    record.handlers.set(target, handler);
    record.observer.observe(target);

    return () => {
      record.observer.unobserve(target);
      record.handlers.delete(target);
      cleanupObserver(key);
    };
  }, [ref, root, rootMargin, threshold]);

  return entry;
};
