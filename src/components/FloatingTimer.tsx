import { Play, Pause, Square } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingTimerProps {
  taskName: string;
  isTracking: boolean;
  onStart: () => void;
  onPause: () => void;
  onEnd: () => void;
  elapsedTime: number;
}

export function FloatingTimer({ taskName, isTracking, onStart, onPause, onEnd, elapsedTime }: FloatingTimerProps) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white border-2 border-blue-500 rounded-lg shadow-2xl p-4 min-w-[280px] z-50">
      <div className="mb-3">
        <div className="text-2xl mb-1">{formatTime(elapsedTime)}</div>
        <div className="text-sm text-gray-600">{taskName}</div>
      </div>
      <div className="flex gap-2">
        {isTracking ? (
          <>
            <button
              onClick={onPause}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition-colors flex-1"
            >
              <Pause className="w-4 h-4 fill-black" />
              <span>Pause</span>
            </button>
            <button
              onClick={onEnd}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition-colors flex-1"
            >
              <Square className="w-4 h-4 fill-black" />
              <span>End</span>
            </button>
          </>
        ) : (
          <button
            onClick={onStart}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition-colors w-full"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Start</span>
          </button>
        )}
      </div>
    </div>
  );
}