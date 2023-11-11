import { FeedbackRoutes } from "@features/feedback/routes";
import { queryClient } from "@lib/react-query";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<FeedbackRoutes />} path="/feedbacks/*" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
