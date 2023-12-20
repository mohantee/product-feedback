import { FeedbackRoutes } from "@features/feedback/routes";
import { queryClient } from "@lib/react-query";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

const CLERK_PUB_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUB_KEY}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SignedIn>
            <Routes>
              <Route element={<FeedbackRoutes />} path="/feedbacks/*" />
              <Route path="*" element={<Navigate to="/feedbacks" />} />
            </Routes>
          </SignedIn>
          <SignedOut>
            <Routes>
              <Route element={<FeedbackRoutes />} path="/feedbacks/*" />
              <Route element={<RedirectToSignIn />} path="/login" />
              <Route path="*" element={<Navigate to="/feedbacks" />} />
            </Routes>
          </SignedOut>
        </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
