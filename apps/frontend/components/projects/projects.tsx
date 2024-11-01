'use client';

import { useGetProjectsForProjectsPage } from '@/resources/hooks/todo.hooks';
import { Hash } from 'lucide-react';
import Link from 'next/link';
import { Label } from '../ui/label';
import { getProjectName } from '@/resources/utils/projects-record';

export default function ProjectsList() {
  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetProjectsForProjectsPage();

  if (isProjectsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:px-60 h-full w-full pt-8 flex-col">
      <div className="flex-col items-center justify-between gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Meus Projetos</h1>
        <span className="pt-2">{projectsData?.length} Projetos</span>
      </div>
      <div className="w-full  flex flex-col gap-1 py-4">
        {projectsData?.map((project) => {
          return (
            <Link key={project.id} href={`/todos/projects/${project.id}`}>
              <div className="flex items-center space-x-2 border-b-2 p-4 border-gray-100">
                <Hash className="text-primary h-5 w-5" />
                <Label
                  htmlFor="projects"
                  className="text-base font-normal hover:cursor-pointer"
                >
                  {getProjectName(project.name)}
                </Label>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
