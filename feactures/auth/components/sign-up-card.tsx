import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { SignInFlow } from "../types";

type SignUpCarddProps = {
  setState: (state: SignInFlow) => void;
};

export default function SignUpCard({ setState }: SignUpCarddProps) {
  const { signIn } = useAuthActions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function onPasswordSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    signIn("password", { email, password, flow: "signUp" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setIsPending(false);
      });
  }

  function handleProviderSignIn(value: "github") {
    void signIn("github");
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0 ">
        <CardTitle>Sign up to continue</CardTitle>
      </CardHeader>
      <CardDescription className="pb-3">
        Use your email or another service to continue
      </CardDescription>
      {!!error && (
        <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            type="text"
            required
          />
          <Input
            disabled={isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={isPending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="w-full relative"
            disabled={isPending}
            onClick={() => handleProviderSignIn("github")}
            variant="outline"
            size="lg"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already haver an account{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
