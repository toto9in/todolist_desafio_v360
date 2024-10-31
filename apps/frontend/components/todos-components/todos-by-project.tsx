'use client';

import {
  useGetProjectById,
  useGetTodosByProject,
} from '@/resources/hooks/todo.hooks';
import { useParams } from 'next/navigation';
import TodosItem from './todo-item';
import { AddTaskWrapper } from './add-task-button';

export default function TodosByProject() {
  const { projectId } = useParams();

  console.log(projectId);

  const { data: todosByProjectData } = useGetTodosByProject(Number(projectId));

  const { data: projectData } = useGetProjectById(Number(projectId));

  return (
    <div className="xl:px-60 h-full w-full pt-8 flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {projectData?.name}
        </h1>
      </div>
      <div className="w-full  flex flex-col gap-1 py-4">
        <TodosItem items={todosByProjectData || []} />
      </div>
      <AddTaskWrapper projectId={Number(projectId)} />
    </div>
  );
}
