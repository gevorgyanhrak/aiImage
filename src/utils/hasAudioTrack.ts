type AudioCapableVideoElement = HTMLVideoElement & {
  mozHasAudio?: boolean;
  webkitAudioDecodedByteCount?: number;
  audioTracks?: { length: number };
};

const hasAudioTrack = (video?: HTMLVideoElement | null): boolean => {
  if (!video) {
    return false;
  }

  const media = video as AudioCapableVideoElement;

  // Safari
  try {
    if (media.audioTracks?.length) {
      return true;
    }
  } catch {
    // ignore
  }

  // Firefox
  if (Boolean(media.mozHasAudio)) {
    return true;
  }

  // Chrome and Chromium-based browsers - Check decoded byte count
  if (media.webkitAudioDecodedByteCount && media.webkitAudioDecodedByteCount > 0) {
    return true;
  }

  return false;
};

export default hasAudioTrack;
