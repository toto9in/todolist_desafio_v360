import TodosByProject from '@/components/todos-components/todos-by-project';

export default function ProjectIdPage() {
  return (
    <div className="flex justify-center min-h-screen w-full">
      <div className="w-full flex flex-col">
        <main className="flex flex-col gap-4 p-4 lg:px-8">
          <TodosByProject />
        </main>
      </div>
    </div>
  );
}