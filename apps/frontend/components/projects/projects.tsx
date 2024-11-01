'use client';

import {
  useDeleteProject,
  useGetProjectsForProjectsPage,
} from '@/resources/hooks/todo.hooks';
import { Hash, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { Label } from '../ui/label';
import { getProjectName } from '@/resources/utils/projects-record';
import { Button } from '../ui/button';
import { useState } from 'react';
import { DeleteDialog } from '../delete-dialog';
import { useQueryClient } from '@tanstack/react-query';

export default function ProjectsList() {
  const queryClient = useQueryClient();

  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] =
    useState(false);

  const [project, setProject] = useState<{ name: string; id: number }>({
    name: '',
    id: 0,
  });

  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetProjectsForProjectsPage();

  const deleteProject = useDeleteProject();

  if (isProjectsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:px-60 h-full w-full pt-8 flex-col">
      <div className="flex-col items-center justify-between gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Meus Projetos</h1>
        <span className="pt-2">{projectsData?.length} Projetos</span>
      </div>
      <div className="w-full  flex flex-col justify-between gap-1 py-4">
        {projectsData?.map((project) => {
          return (
            <Link
              key={project.id}
              href={`/todos/projects/${project.id}`}
              className="flex flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-2 border-b-2 p-4 border-gray-100">
                <Hash className="text-primary h-5 w-5" />
                <Label
                  htmlFor="projects"
                  className="text-base font-normal hover:cursor-pointer"
                >
                  {getProjectName(project.name)}
                </Label>
              </div>
              <Button
                variant="ghost"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setIsDeleteProjectDialogOpen(true);
                  setProject({
                    name: getProjectName(project.name),
                    id: project.id,
                  });
                }}
              >
                <Trash2Icon className="text-red-500 h-5 w-5" />
              </Button>
            </Link>
          );
        })}
      </div>
      <DeleteDialog
        title="Deletar Projeto"
        description={`O projeto ${project.name} e todas as suas tarefas serão permanentemente excluídos.`}
        isOpen={isDeleteProjectDialogOpen}
        setIsOpen={setIsDeleteProjectDialogOpen}
        deleteFunction={() =>
          deleteProject.mutateAsync(project.id).then(async () => {
            await queryClient.invalidateQueries({
              queryKey: ['get-projects-for-projects-page'],
            });
          })
        }
      />
    </div>
  );
}
