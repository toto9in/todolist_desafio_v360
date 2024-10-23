import TodoList from '@/components/todos-components/todo-list';

export default function TodosPage() {
  return (
    <div className="flex justify-center min-h-screen w-full">
      <div className="w-full flex flex-col">
        <main className="flex flex-col gap-4 p-4 lg:px-8">
          <TodoList />
        </main>
      </div>
    </div>
  );
}
