import { FeedbackRoutes } from "@features/feedback/routes";
import { queryClient } from "@lib/react-query";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <SignedIn>
          <BrowserRouter>
            <Routes>
              <Route element={<FeedbackRoutes />} path="/feedbacks/*" />
            </Routes>
          </BrowserRouter>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
