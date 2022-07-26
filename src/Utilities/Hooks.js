import { useEffect, useState } from "react";

export const useTimer = () => {
  const [timer, resetTimer] = useState(60);

  useEffect(() => {
    if (timer >= 1) {
      setTimeout(() => {
        resetTimer((prev) => prev - 1);
      }, 1000);
    } else {
      resetTimer(0);
    }
  }, [timer]);

  return {
    timer,
    resetTimer,
  };
};
