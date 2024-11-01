'use client';

import {
  useGetProjectById,
  useGetIncompleteTodosByProject,
  useGetCompleteTodosByProject,
} from '@/resources/hooks/todo.hooks';
import { useParams } from 'next/navigation';
import TodosItem from './todo-item';
import { AddTaskWrapper } from './add-task-button';
import { getProjectName } from '@/resources/utils/projects-record';

export default function TodosByProject() {
  const { projectId } = useParams();

  console.log(projectId);

  const {
    data: incompleteTodosByProjectData,
    isLoading: isLoadingIncompleteTodosByProject,
  } = useGetIncompleteTodosByProject(Number(projectId));

  const {
    data: completeTodosByProjectData,
    isLoading: isLoadingCompleteTodosByProject,
  } = useGetCompleteTodosByProject(Number(projectId));

  const { data: projectData, isLoading: isLoadingProjectsData } =
    useGetProjectById(Number(projectId));

  if (
    isLoadingIncompleteTodosByProject ||
    isLoadingCompleteTodosByProject ||
    isLoadingProjectsData
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:px-60 h-full w-full pt-8 flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {projectData?.name ? getProjectName(projectData.name) : ''}
        </h1>
      </div>
      <div className="w-full  flex flex-col gap-1 py-4">
        <TodosItem items={incompleteTodosByProjectData || []} />
      </div>
      <AddTaskWrapper projectId={Number(projectId)} />
      <div className="w-full  flex flex-col gap-1 py-4">
        <TodosItem items={completeTodosByProjectData || []} />
      </div>
    </div>
  );
}
