import { SignInCard } from "@/components/sign-in-card";

export default function Home() {
  return (
    <div className="max-w-[988px] min-h-screen mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <SignInCard />
    </div>
  );
}
