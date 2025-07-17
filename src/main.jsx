import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Minimal from "./Minimal";
import Projects from "./ProjectsPage";

const App3DLazy = React.lazy(() => import("./App3D"));

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Minimal />} />
      <Route
        path="/room"
        element={
          <React.Suspense fallback="Loading 3‑D…">
            <App3DLazy />
          </React.Suspense>
        }
      />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  </BrowserRouter>
);
