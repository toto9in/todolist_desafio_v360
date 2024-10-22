import TodoList from '@/components/todos-components/todo-list';

export default function TodosPage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <TodoList />
        </main>
      </div>
    </div>
  );
}
