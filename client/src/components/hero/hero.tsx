import "./hero.css";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";

export function Hero() {
  const { redirectToSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  return (
    <div className="hero">
      <div className="hero__title">
        <h1>Frontend Mentor</h1>
        <p>Product Board</p>
      </div>

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
    </div>
  );
}
