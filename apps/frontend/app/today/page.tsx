import TodayList from '@/components/today/today-list';

export default function TodayPage() {
  return (
    <div className="flex justify-center min-h-screen w-full">
      <div className="w-full flex flex-col">
        <main className="flex flex-col gap-4 p-4 lg:px-8">
          <TodayList />
        </main>
      </div>
    </div>
  );
}
