import Image from "next/image";

export const V360LogoIcon = () => {
  return (
    <div className="w-[54px] h-[50px] bg-purple-950 flex justify-center items-center rounded-sm">
      <Image src="/v360logo.png" height={50} width={50} alt="v360icon" />
    </div>
  );
};
