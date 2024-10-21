import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Providers from "../_providers/Providers";
import { TodoSideBar } from "@/components/nav/side-bar";

export default function TodosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <SidebarProvider>
        <TodoSideBar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </Providers>
  );
}
