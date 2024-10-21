"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { V360LogoIcon } from "./v360-logo-icon";
import Image from "next/image";

export const SignInCard = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sm tracking-tight text-sky-400">
          {session.user.name}
        </p>
        <Image
          src={session.user.image || "/default-profile.png"}
          height={24}
          width={24}
          alt="picture"
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="w-full flex gap-2 justify-between items-center">
          <span className="text-3xl">Todo List</span>
          <V360LogoIcon />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button
          onClick={() => signIn("google", { callbackUrl: "/todos" })}
          variant="outline"
          size="lg"
          className="w-full justify-center"
        >
          <div className="flex gap-3 items-center">
            <Image
              src="/google-icon.svg"
              height={24}
              width={24}
              alt="google-icon"
            />
            <span className="text-md font-bold">Logar com Google</span>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};
