import {
  Aside,
  CategoryFilters,
  Roadmap,
} from "@features/feedback/components/aside";
import { FeedbackControls } from "@features/feedback/components/feedback-controls";
import { FeedbackList } from "@features/feedback/components/feedback-list";
import "./feedbacks.css";
import { useFilterParams } from "@features/feedback/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { SearchParamProps } from "@features/feedback/types";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

export function Feedbacks() {
  const searchParams = useFilterParams();

  return (
    <>
      <div className="mobile-bar">
        <div>
          <h1>Front-end Mentor</h1>
          <p>Feedback Board</p>
        </div>
        <SidebarDialog searchParams={searchParams} />
      </div>
      <div className="feedbacks-container">
        <Aside searchParams={searchParams} />
        <div className="feedback-list">
          <FeedbackControls searchParams={searchParams} />
          <FeedbackList searchParams={searchParams} />
        </div>
      </div>
    </>
  );
}

function SidebarDialog({ searchParams }: SearchParamProps) {
  const { redirectToSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
          >
            <rect width="20" height="3" fill="white" />
            <rect y="7" width="20" height="3" fill="white" />
            <rect y="14" width="20" height="3" fill="white" />
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <CategoryFilters searchParams={searchParams} />
          <Roadmap />

          <div className="feedback-sign-in">
            {isSignedIn ? (
              <div className="user-info">
                {user.fullName}
                <UserButton />
              </div>
            ) : (
              <button onClick={() => redirectToSignIn()} className="sign">
                Sign in
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
