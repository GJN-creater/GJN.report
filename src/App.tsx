// src/App.tsx
import DailyReportPage from "./DailyReportPage";

const App = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 dark:text-white font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 animate-fadeIn">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary dark:text-white">
            📋 부서별 업무일지 시스템
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4">
            부서별로 오늘의 업무를 기록하고 열람자를 체크하세요.
          </p>
        </header>

        <section className="bg-white dark:bg-neutral-800 rounded-3xl shadow-card p-6 sm:p-10 transition duration-500 ease-in-out transform hover:scale-[1.01]">
          <DailyReportPage />
        </section>
      </div>
    </main>
  );
};

export default App;
