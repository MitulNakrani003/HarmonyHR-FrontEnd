import { useEffect, type RefObject } from 'react';

/**
 * A custom hook that triggers a callback when a click is detected outside of the referenced element.
 * @param ref - A React ref object attached to the element to monitor.
 * @param callback - The function to call when an outside click is detected.
 */
const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;