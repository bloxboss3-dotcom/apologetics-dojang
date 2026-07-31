import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* Register the service worker so the installed app opens offline.
   Skipped inside an iframe: the app is also published as a single-file
   artifact, which is framed and ships no sw.js, and registering there would
   only produce a 404 in the console. Any failure is swallowed — a worker that
   will not register is a missing convenience, never a broken app. */
if ("serviceWorker" in navigator && window.top === window.self) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
