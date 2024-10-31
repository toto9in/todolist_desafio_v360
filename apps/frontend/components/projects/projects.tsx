'use client';

import { useGetProjectsForProjectsPage } from '@/resources/hooks/todo.hooks';
import { Hash } from 'lucide-react';
import Link from 'next/link';
import { Label } from '../ui/label';

export default function ProjectsList() {
  const { data: projectsData } = useGetProjectsForProjectsPage();

  return (
    <div className="xl:px-60 h-full w-full pt-8 flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Projetos</h1>
      </div>
      <div className="w-full  flex flex-col gap-1 py-4">
        {projectsData?.map((project) => {
          return (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <div className="flex items-center space-x-2 border-b-2 p-2 border-gray-100">
                <Hash className="text-primary h-5 w-5" />
                <Label
                  htmlFor="projects"
                  className="text-base font-normal hover:cursor-pointer"
                >
                  {project.name}
                </Label>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
