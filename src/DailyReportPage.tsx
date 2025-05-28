import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Report {
  id: number;
  dept: string;
  content: string;
  progress: string;
  note: string;
  readers: string[];
  createdAt: string;
}

const departments = ["마케팅", "개발", "영업", "운영", "인테리어", "관리"];
const readers = [
  "정태수", "방영희", "강영국", "나건주", "최지안", "이혜수",
  "홍준호", "윤영한", "박대휘", "이상원", "김솔비", "손창용",
  "왕희도", "오채연", "소종호", "윤지은", "김재환", "이윤희"
];

export default function DailyReportPage() {
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState("");
  const [note, setNote] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterDept, setFilterDept] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("daily-reports");
    if (stored) setReports(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("daily-reports", JSON.stringify(reports));
  }, [reports]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    const now = format(new Date(), "yyyy-MM-dd");

    if (editId !== null) {
      setReports(prev =>
        prev.map(r =>
          r.id === editId
            ? { ...r, dept: selectedDept, content, progress, note }
            : r
        )
      );
      setEditId(null);
    } else {
      const newReport: Report = {
        id: Date.now(),
        dept: selectedDept,
        content,
        progress,
        note,
        readers: [],
        createdAt: now,
      };
      setReports([newReport, ...reports]);
    }

    setContent("");
    setProgress("");
    setNote("");
  };

  const handleReadToggle = (id: number, name: string) => {
    setReports(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              readers: r.readers.includes(name)
                ? r.readers.filter(n => n !== name)
                : [...r.readers, name],
            }
          : r
      )
    );
  };

  const handleEdit = (report: Report) => {
    setSelectedDept(report.dept);
    setContent(report.content);
    setProgress(report.progress);
    setNote(report.note);
    setEditId(report.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setReports(prev => prev.filter(r => r.id !== id));
    }
  };

  const filtered = reports.filter(r => {
    const matchDate = filterDate ? format(filterDate, "yyyy-MM-dd") === r.createdAt : true;
    const matchDept = filterDept ? filterDept === r.dept : true;
    return matchDate && matchDept;
  });

  const grouped = filtered.reduce<Record<string, Report[]>>((acc, r) => {
    (acc[r.createdAt] ||= []).push(r);
    return acc;
  }, {});
  const sortedDates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="space-y-10">
      <Card className="p-6 bg-white dark:bg-neutral-800 shadow-card rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-blue-600 dark:text-blue-300">
          📌 부서별 업무일지 작성
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {departments.map(dept => (
            <Button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={cn(
                "w-full py-2 text-sm font-medium rounded-lg transition",
                selectedDept === dept
                  ? "bg-blue-600 text-white ring-2 ring-blue-300"
                  : "bg-white dark:bg-neutral-700 dark:text-white text-gray-800 border border-gray-300 hover:bg-gray-50"
              )}
            >
              {dept}
            </Button>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="금일 주요 업무사항" className="min-h-[80px]" />
          <Textarea value={progress} onChange={e => setProgress(e.target.value)} placeholder="완료도 (예: 80%)" className="min-h-[80px]" />
          <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="비고" className="min-h-[80px]" />
        </div>

        <div className="text-right mt-4">
          <Button onClick={handleSubmit}>{editId ? "수정 완료" : "업무일지 등록"}</Button>
        </div>
      </Card>

      <div className="flex flex-wrap gap-4 items-center">
        <DatePicker
          selected={filterDate}
          onChange={setFilterDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜 선택"
          className="border px-3 py-2 rounded-md text-sm"
        />
        <select
          value={filterDept || ""}
          onChange={e => setFilterDept(e.target.value || null)}
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="">전체 부서</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        {filterDate && <Button variant="outline" onClick={() => setFilterDate(null)}>날짜 초기화</Button>}
        {filterDept && <Button variant="outline" onClick={() => setFilterDept(null)}>부서 초기화</Button>}
      </div>

      {sortedDates.map(date => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-3">{date}</h3>
          <div className="space-y-4">
            {grouped[date].map(report => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-soft border p-5 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">[{report.dept}]</span>
                  <div className="space-x-2">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black" onClick={() => handleEdit(report)}>
                      수정
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete(report.id)}>
                      삭제
                    </Button>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-gray-800 dark:text-gray-100">📌 주요업무: {report.content}</p>
                  <p>✅ 완료도: {report.progress}</p>
                  <p>🗒️ 비고: {report.note}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-1 text-gray-600 dark:text-gray-300">열람자 체크:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {readers.map(reader => (
                      <Toggle
                        key={reader}
                        label={reader}
                        checked={report.readers.includes(reader)}
                        onCheckedChange={() => handleReadToggle(report.id, reader)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
