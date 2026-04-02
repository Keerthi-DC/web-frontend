/**
 * Simple chatbot component for answering website-specific questions.
 *
 * Flow:
 * 1. Mount and load any persisted conversation from localStorage.
 * 2. Provide a button to open/close the chat window.
 * 3. Use an input field to send a query to an endpoint (e.g., /api/chat).
 * 4. Append the message, store history, and call useAudit for logging.
 * @example
 * // In App.jsx
 * import ChatBot from './components/ChatBot';
 *
 * function App() {
 *   return (
 *     <div>
 *       // other app content
 *       <ChatBot />
 *     </div>
 *   );
 * }
 */