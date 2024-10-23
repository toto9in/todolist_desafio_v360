import { Button } from '../ui/button';

export default function AddTaskComponent({
  setShowAddTask,
}: {
  setShowAddTask: (value: boolean) => void;
}) {
  return (
    <div className="flex gap-3 self-end">
      <Button
        className="font-bold"
        variant={'outline'}
        onClick={() => setShowAddTask(false)}
      >
        Cancelar
      </Button>
      <Button className="font-bold">Adicionar tarefa</Button>
    </div>
  );
}
