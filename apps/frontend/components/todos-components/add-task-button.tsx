import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddTaskComponent from './add-task-component';

export const AddTaskWrapper = ({
  parentId,
  projectId,
}: {
  parentId?: number;
  projectId?: number;
}) => {
  const [showAddTask, setShowAddTask] = useState(false);

  return showAddTask ? (
    <AddTaskComponent
      setShowAddTask={setShowAddTask}
      parentId={parentId}
      projectId={projectId}
    />
  ) : (
    <AddTaskButton onClick={() => setShowAddTask(true)} />
  );
};

export default function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="pl-2 flex mt-2 flex-1" onClick={onClick}>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex items-center gap-2 justify-center">
          <Plus className="h-5 w-5 text-primary hover:bg-primary hover:rounded-xl hover:text-white" />
          <h3 className="text-base font-light tracking-tight text-foreground/70 whitespace-nowrap">
            Add task
          </h3>
        </div>
      </div>
    </button>
  );
}
