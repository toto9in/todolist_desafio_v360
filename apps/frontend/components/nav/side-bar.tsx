'use client';
import { Calendar, CheckCircle2, Inbox, Plus, Tag } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar';
import { UserProfile } from '../user-profile/user-profile';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const purpleHoverClass = 'hover:bg-purple-100 hover:text-purple-700';
const purpleIconClass = 'text-purple-600';

const items = [
  {
    title: 'Entrada',
    url: '/todos',
    icon: <Inbox className="w-4 h-4 text-primary" />,
  },
  {
    title: 'Hoje',
    url: '/today',
    icon: <Calendar className="w-4 h-4 text-primary" />,
  },
  {
    title: 'Em breve',
    url: '#',
    icon: <CheckCircle2 className="w-4 h-4 text-primary" />,
  },
  {
    title: 'Filtros e etiquetas',
    url: '#',
    icon: <Tag className="w-4 h-4 text-primary" />,
  },
];

const projects = [
  { name: 'Personal', color: 'bg-blue-500' },
  { name: 'Work', color: 'bg-green-500' },
  { name: 'Shopping', color: 'bg-yellow-500' },
];

export function TodoSideBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return href === pathname ? 'bg-purple-100 text-purple-700' : '';
  };

  return (
    <Sidebar>
      <SidebarHeader className="pl-3">
        <UserProfile />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="font-semibold">
                    <Button
                      asChild
                      variant="ghost"
                      className={`w-full justify-start gap-2 ${purpleHoverClass} ${isActive(item.url)}`}
                    >
                      <Link replace href={item.url} className="flex gap-2">
                        {item.icon} {item.title}{' '}
                      </Link>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="font-semibold">
              <Button
                variant="ghost"
                className={`w-full justify-between ${purpleHoverClass}`}
              >
                Projects
                <Plus className={`h-5 w-5 ${purpleIconClass}`} />
              </Button>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {projects.map((project) => (
                <SidebarMenuSubItem key={project.name}>
                  <SidebarMenuSubButton asChild>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-2 ${purpleHoverClass} `}
                    >
                      <div
                        className={cn('h-2 w-2 rounded-full', project.color)}
                      />
                      {project.name}
                    </Button>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
