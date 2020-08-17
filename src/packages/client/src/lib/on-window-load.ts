export const onWindowLoad = function onWindowLoad(callback: () => void): void {
  if (
    typeof window === 'undefined' ||
    window.document.readyState === 'complete' ||
    window.document.readyState === 'interactive'
  ) {
    callback();
  } else {
    window.addEventListener('DOMContentLoaded', callback);
  }
};
