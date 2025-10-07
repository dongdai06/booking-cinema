import { useEffect, useRef, useState } from "react";

export const useCountdown = (initialSeconds: number) => {
  const [remaining, setRemaining] = useState(initialSeconds);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (intervalRef.current) return; // tránh tạo nhiều interval
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = (seconds = initialSeconds) => {
    stop();
    setRemaining(seconds);
  };

  const formatMMSS = (seconds: number) => {
    if (seconds < 0) seconds = 0;
    const mm = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mm}:${ss}`;
  };

  useEffect(() => {
    start();
    return stop;
  }, [initialSeconds]);

  return {
    remaining,
    formatted: formatMMSS(remaining),
    start,
    stop,
    reset,
  };
};
