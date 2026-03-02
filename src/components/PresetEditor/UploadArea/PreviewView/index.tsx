'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { TEST_IDS } from '../constants/testIds';
import { PULSE_NAMES } from '@/constants/pulseNames';

interface IPreviewView {
  url: string;
  onClear: () => void;
}

const PREVIEW_HEIGHT = 160;
const MIN_WIDTH = 96;
const MAX_WIDTH = 240;

const PreviewView = ({ url, onClear }: IPreviewView) => {
  const [wrapWidth, setWrapWidth] = useState<number>(PREVIEW_HEIGHT);
  return (
    <div className="relative w-full flex items-center justify-center" data-testid={TEST_IDS.DONE}>
      <div className="relative overflow-hidden" style={{ height: PREVIEW_HEIGHT, width: wrapWidth }} data-testid={TEST_IDS.PREVIEW_IMAGE}>
        <Image
          src={url}
          alt="uploaded"
          fill
          sizes={`${wrapWidth}px`}
          className="object-contain [image-orientation:from-image]"
          onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            if (naturalWidth && naturalHeight) {
              const ratio = naturalWidth / naturalHeight;
              const computed = Math.round(PREVIEW_HEIGHT * ratio);
              const clamped = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, computed));
              setWrapWidth(clamped);
            }
          }}
        />
        <button
          type="button"
          onClick={onClear}
          aria-label="Remove image"
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-[#1f1f1f]/90 text-foreground hover:bg-[#2a2a2a] shadow"
          data-testid={TEST_IDS.PREVIEW_REMOVE_BUTTON}
          data-pulse-name={PULSE_NAMES.REMOVE_BUTTON}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PreviewView;
