import { FeedbackRoutes } from "@features/feedback/routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FeedbackRoutes />} path="/feedbacks/*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
