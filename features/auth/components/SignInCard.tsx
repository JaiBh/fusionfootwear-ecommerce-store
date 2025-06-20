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
import { useEffect, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const redirect = searchParams.get("redirect");

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn("password", {
      email,
      password,
      flow: "signIn",
      redirectTo: redirect || "/",
    })
      .catch((err) => {
        setError("Invalid email or password");
        console.log(err);
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value, { redirectTo: redirect || "/" })
      .catch(() => {
        toast.error("Something went wrong...");
      })
      .finally(() => {
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
          Sign in to continue
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
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={pending}
          >
            Sign In
          </Button>
        </form>
        <Separator></Separator>
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative bg-white border-grey-900"
          >
            <FcGoogle className="size-5 absolute  left-2.5 top-3"></FcGoogle>
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative bg-white border-grey-900"
          >
            <FaGithub className="size-5 absolute left-2.5 top-3"></FaGithub>
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don't have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
