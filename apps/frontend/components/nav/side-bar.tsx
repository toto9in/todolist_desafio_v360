'use client';
import { Calendar, CheckCircle2, Hash, Inbox, Plus, Tag } from 'lucide-react';
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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetProjectsForProjectsPage } from '@/resources/hooks/todo.hooks';
import { getProjectName } from '@/resources/utils/projects-record';
import { useState } from 'react';
import { CreateProjectDialog } from '../projects/create-project-dialog';

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
    url: '/todos/today',
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

export function TodoSideBar() {
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
    useState(false);

  const pathname = usePathname();

  const isActive = (href: string) => {
    return href === pathname ? 'bg-purple-100 text-purple-700' : '';
  };

  const { data: projectsData } = useGetProjectsForProjectsPage();

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
                asChild
                variant="ghost"
                className={`w-full justify-between ${purpleHoverClass} ${isActive('/projects')}`}
              >
                <Link href={'/todos/projects'} className="flex gap-2">
                  Meus Projetos
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsCreateProjectDialogOpen(true);
                    }}
                  >
                    <Plus className={`h-5 w-5  ${purpleIconClass}`} />
                  </Button>
                  <CreateProjectDialog
                    isOpen={isCreateProjectDialogOpen}
                    setIsCreateProjectDialogOpen={setIsCreateProjectDialogOpen}
                  />
                </Link>
              </Button>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {projectsData?.map((project) => (
                <SidebarMenuSubItem key={project.name}>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/todos/projects/${project.id}`}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-2 ${purpleHoverClass} `}
                      >
                        <Hash className="h-5 w-5 text-primary" />
                        {getProjectName(project.name)}
                      </Button>
                    </Link>
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
