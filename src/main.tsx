import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import FeedbackProvider from "./context/feedback-provider.tsx";
import AddFeedback from "./pages/addFeedback.tsx";
import Roadmap from "./pages/roadmap.tsx";
import Details from "./pages/details.tsx";
import EditFeedback from "./pages/editFeedback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FeedbackProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<App />} />
          <Route path="/add-feedback" element={<AddFeedback />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/edit-feedback/:id" element={<EditFeedback />} />
        </Routes>
      </BrowserRouter>
    </FeedbackProvider>
  </StrictMode>,
);
