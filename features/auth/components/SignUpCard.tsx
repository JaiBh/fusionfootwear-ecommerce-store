import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface SignUpProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpProps) => {
  const { signIn } = useAuthActions();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const redirect = searchParams.get("redirect");

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    signIn("password", {
      name,
      email,
      password,
      flow: "signUp",
      redirectTo: redirect || "/",
    })
      .catch((err) => {
        setError("This email is already in use");
        console.log(err);
      })
      .finally(() => {
        setPending(false);
      });
  };
  const onProviderSignup = (value: "github" | "google") => {
    setPending(true);
    signIn(value, { redirectTo: redirect || "/" }).finally(() => {
      setPending(false);
    });
  };
  return (
    <Card className="p-6 shadow-none border-none">
      <CardHeader className="pt-0 px-0 space-y-2">
        <Image
          src={logo}
          alt="Logo"
          width={72}
          height={72}
          priority
          className="mx-auto"
        ></Image>
        <CardTitle className="text-center text-present-3-bold">
          Welcome to FusionFootwear
        </CardTitle>
        <CardDescription className="text-center">
          Sign up to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm mb-6 text-destructive">
          <TriangleAlert className="size-4"></TriangleAlert>
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Full Name"
            required
          ></Input>
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            type="email"
            required
          ></Input>
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            type="password"
            required
          ></Input>
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm password"
            type="password"
            required
          ></Input>
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <Separator></Separator>
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignup("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute  left-2.5 top-3"></FcGoogle>
            Sign up with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignup("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute left-2.5 top-3"></FaGithub>
            Sign up with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
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
};

export default SignUpCard;
