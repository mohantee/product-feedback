import "./hero.css";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";

export function Hero() {
  const { redirectToSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  return (
    <div className="hero">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="255"
        height="137"
        viewBox="0 0 255 137"
        fill="none"
      >
        <rect
          width="255"
          height="137"
          rx="10"
          fill="url(#paint0_radial_0_1731)"
        />
        <mask
          id="mask0_0_1731"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="255"
          height="137"
        >
          <rect width="255" height="137" rx="10" fill="white" />
        </mask>
        <g mask="url(#mask0_0_1731)">
          <g opacity="0.765433" filter="url(#filter0_f_0_1731)">
            <circle cx="-0.5" cy="-40.5" r="96" fill="#7AD8FB" />
          </g>
          <g filter="url(#filter1_f_0_1731)">
            <circle cx="304.5" cy="137.5" r="96" fill="#FBB57A" />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_0_1731"
            x="-186.203"
            y="-226.203"
            width="371.407"
            height="371.407"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="44.8517"
              result="effect1_foregroundBlur_0_1731"
            />
          </filter>
          <filter
            id="filter1_f_0_1731"
            x="118.797"
            y="-48.2033"
            width="371.407"
            height="371.407"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="44.8517"
              result="effect1_foregroundBlur_0_1731"
            />
          </filter>
          <radialGradient
            id="paint0_radial_0_1731"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(264.945 -14.2296) rotate(146.823) scale(322.666 301.288)"
          >
            <stop stopColor="#E84D70" />
            <stop offset="0.530886" stopColor="#A337F6" />
            <stop offset="1" stopColor="#28A7ED" />
          </radialGradient>
        </defs>
      </svg>
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
