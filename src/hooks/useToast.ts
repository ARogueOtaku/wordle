import { useCallback, useRef, useState } from "react";

const useToast = (defaultMessage = "", defaultDuration = 2000) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(defaultMessage);
  const toastTimerRef = useRef<number>(-1);
  const toastReShowTimerRef = useRef<number>(-1);
  const reShowTime = 500;

  const showToast = useCallback(() => setOpen(true), []);

  const hideToast = useCallback(() => setOpen(false), []);

  const setToast = useCallback(
    (message = defaultMessage, duration = defaultDuration, persistent = false) => {
      window.clearTimeout(toastTimerRef.current);
      window.clearTimeout(toastReShowTimerRef.current);
      if (open) {
        hideToast();
        toastReShowTimerRef.current = window.setTimeout(() => {
          setMessage(message);
          showToast();
        }, reShowTime);
      } else {
        setMessage(message);
        showToast();
      }
      if (!persistent) {
        toastTimerRef.current = window.setTimeout(hideToast, duration);
      }
    },
    [defaultMessage, defaultDuration, showToast, hideToast, open]
  );

  return { open, message, showToast, hideToast, setToast };
};

export default useToast;
