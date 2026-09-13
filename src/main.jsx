import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Patch Node.prototype.removeChild to silently handle cases where
// the node being removed is not actually a child (happens with Framer Motion + React cleanup)
const originalRemoveChild = Node.prototype.removeChild;
Node.prototype.removeChild = function (child) {
  try {
    return originalRemoveChild.call(this, child);
  } catch (e) {
    if (
      e.message?.includes("removeChild") ||
      e.message?.includes("is not a child")
    ) {
      // Silently ignore - this is a harmless race condition with animations
      console.debug("[Suppressed removeChild error]", e.message);
      return child;
    }
    throw e;
  }
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);


