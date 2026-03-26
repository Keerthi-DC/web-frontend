import React, { Component } from "react";

/** ErrorBoundary component
 *  Catches JavaScript errors anywhere in the child component tree.
 *  Logs error to console and renders a fallback UI.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message || "Unknown error."}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
