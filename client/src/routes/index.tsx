import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { FeedbackRoutes } from "@features/feedback/routes";
import { CreateFeedback } from "@features/feedback/routes/create-feedback";
import { EditFeedback } from "@features/feedback/routes/edit-feedback";
import { Feedback } from "@features/feedback/routes/feedback";
import { FeedbackRoadmap } from "@features/feedback/routes/feedback-roadmap/feedback-roadmap";
import { Feedbacks } from "@features/feedback/routes/feedbacks";
import { useRoutes } from "react-router-dom";

const protectedRoutes = [
  {
    path: "/feedbacks/",
    element: <FeedbackRoutes />,
    children: [
      {
        path: "create",
        element: <CreateFeedback />,
      },
      {
        path: "edit/:id",
        element: <EditFeedback />,
      },
    ],
  },
];

const publicRoutes = [
  {
    path: "/login",
    element: <RedirectToSignIn />,
  },
];

const commonRoutes = [
  {
    path: "/feedbacks/*",
    element: <FeedbackRoutes />,
    children: [
      {
        path: "",
        element: <Feedbacks />,
      },
      {
        path: ":id",
        element: <Feedback />,
      },
      {
        path: "roadmap",
        element: <FeedbackRoadmap />,
      },
    ],
  },
];

export function AppRoutes() {
  const { isSignedIn } = useUser();

  const routes = isSignedIn ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
}
