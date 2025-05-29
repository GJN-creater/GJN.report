import DailyReportPage from "./DailyReportPage";
import "./App.css";

const App = () => {
  return (
    <main className="bg-gradient-to-br from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800 text-gray-900 dark:text-white min-h-screen transition-colors duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 헤더 */}
        <header className="mb-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight leading-tight">
            📋 부서별 업무일지 시스템
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-3">
            부서별로 오늘의 업무를 기록하고 열람자는 체크할 수 있습니다
          </p>
        </header>

        {/* 콘텐츠 섹션 */}
        <section className="relative z-10 overflow-visible bg-white dark:bg-neutral-800 shadow-xl rounded-3xl border border-gray-200 dark:border-neutral-700 p-8 transition-all duration-300 ease-in-out">
          <DailyReportPage />
        </section>
      </div>
    </main>
  );
};

export default App;
