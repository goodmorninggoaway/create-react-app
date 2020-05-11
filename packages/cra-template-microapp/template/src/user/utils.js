/**
 * These are events triggered by the ShellStateCache whenever new shell state has been loaded into redux
 *
 * These events are primarily consumed by the Extensions which trigger updates based on user updates
 */
const shellStateUpdateEventId = `${process.env.REACT_APP_MICROAPP_ID}-shellStateUpdate`;
export const onShellStateUpdate = listener => {
  window.addEventListener(shellStateUpdateEventId, listener, false);
  return () => window.removeEventListener(shellStateUpdateEventId, listener);
};

export const triggerShellStateUpdated = () => {
  window.dispatchEvent(new CustomEvent(shellStateUpdateEventId));
};
