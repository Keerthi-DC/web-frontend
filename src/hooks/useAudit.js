// src/hooks/useAudit.js
// Simple wrapper around console.log to match the existing useAudit hook pattern.
// If your project already has useAudit, replace or import it from that file.

export default function useAudit(message) {
  // In a real project you might send this to a logging service.
  console.log(message);
}
