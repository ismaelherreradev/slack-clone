"use client";

import { useState } from "react";

import { SignInFlow } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

export default function AuthScreen() {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
}
