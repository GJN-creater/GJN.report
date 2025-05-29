import { uploadFilesToFirebase } from "@/lib/uploadFilesToFirebase";
import { saveReport, fetchReports, updateReportReaders } from "@/lib/utils"; // 🔹 updateReportReaders 추가
import { useEffect, useState } from "react";
import { format, isWithinInterval, parse } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Check } from "lucide-react";

interface Report {
  id: number | string;
  dept: string;
  content: string;
  note: string;
  readers: string[];
  createdAt: string;
  files: string[];
}

const departments = ["마케팅", "개발", "영업", "운영", "인테리어", "관리"];
const readers = [
  "정태수", "방영희", "강영국", "나건주", "최지안", "이혜수",
  "홍준호", "윤영한", "박대휘", "이상원", "김솔비", "손창용",
  "왕희도", "오채연", "소종호", "윤지은", "김재환", "이윤희"
];

export default function DailyReportPage() {
  const [selectedDept, setSelectedDept] = useState<string>(departments[0]);
  const [content, setContent] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [reports, setReports] = useState<Report[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [filterDates, setFilterDates] = useState<[Date | null, Date | null]>([null, null]);
  const [filterDept, setFilterDept] = useState<string | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchReports();
      setReports(data);
    };
    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAttachedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    const now = format(new Date(), "yyyy-MM-dd");

    let uploadedUrls: string[] = [];
    if (attachedFiles.length > 0) uploadedUrls = await uploadFilesToFirebase(attachedFiles);

    if (editId !== null) {
      setReports(prev => prev.map(r => r.id === editId
        ? { ...r, dept: selectedDept, content, note, files: uploadedUrls }
        : r));
      setEditId(null);
    } else {
      const newReport: Report = {
        id: Date.now(),
        dept: selectedDept,
        content,
        note,
        readers: [],
        createdAt: now,
        files: uploadedUrls,
      };
      setReports([newReport, ...reports]);

      await saveReport({
        writer: "관리자",
        department: selectedDept,
        content,
        note,
        createdAt: now,
        files: uploadedUrls,
        readers: [],
      });
    }

    setContent("");
    setNote("");
    setAttachedFiles([]);
  };

  // 🔹 열람자 토글 시 Firestore에도 업데이트
  const handleReadToggle = (id: number | string, name: string) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === id) {
          const updatedReaders = r.readers.includes(name)
            ? r.readers.filter(n => n !== name)
            : [...r.readers, name];

          if (typeof r.id === "string") {
            updateReportReaders(r.id, updatedReaders); // Firestore 업데이트
          }

          return { ...r, readers: updatedReaders };
        }
        return r;
      })
    );
  };

  const handleEdit = (report: Report) => {
    setSelectedDept(report.dept);
    setContent(report.content);
    setNote(report.note);
    setEditId(typeof report.id === "number" ? report.id : null);
  };

  const handleDelete = (id: number | string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setReports(prev => prev.filter(r => r.id !== id));
    }
  };

  const filtered = reports.filter(r => {
    const date = parse(r.createdAt, "yyyy-MM-dd", new Date());
    const matchDate = filterDates[0] && filterDates[1]
      ? isWithinInterval(date, { start: filterDates[0], end: filterDates[1] })
      : true;
    const matchDept = !filterDept || filterDept === r.dept;
    return matchDate && matchDept;
  });

  const grouped = filtered.reduce<Record<string, Report[]>>((acc, r) => {
    (acc[r.createdAt] ||= []).push(r);
    return acc;
  }, {});
  const sortedDates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="flex justify-center overflow-visible relative z-0">
      <div className="w-full max-w-[1600px] grid grid-cols-[440px_1fr] gap-24 mt-12 items-start px-12">
        <div className="content-wrapper space-y-6 sticky top-12 h-fit">
          <Card className="p-6 shadow-xl bg-white rounded-xl border border-gray-200">
            <h2 className="text-lg font-bold text-center text-indigo-700 dark:text-indigo-300">
              📌 부서별 업무일지 작성
            </h2>

            <div className="flex flex-wrap justify-start gap-2 mt-4 pl-2">
              {departments.map(dept => (
                <Button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    "text-sm px-4 py-1 rounded-full border duration-200",
                    selectedDept === dept
                      ? "bg-indigo-600 text-white ring-2 ring-indigo-300 scale-105 shadow"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  )}
                >
                  {dept}
                </Button>
              ))}
            </div>

            <div className="space-y-4 mt-4">
              <Textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="내용 작성"
                rows={6}
              />
              <Textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="비고"
                rows={4}
              />
              <div>
                <label className="block font-semibold text-sm">파일 첨부</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              <div className="text-right">
                <Button onClick={handleSubmit} className="transition-transform hover:scale-105">
                  {editId ? "수정 완료" : "업무일지 등록"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex-1 min-w-0 flex flex-col space-y-6 pr-6 mt-4">
          <div className="flex flex-wrap gap-2 items-center px-2">
            <DatePicker
              selectsRange
              startDate={filterDates[0]}
              endDate={filterDates[1]}
              onChange={(update) => setFilterDates(update)}
              dateFormat="yyyy-MM-dd"
              placeholderText="날짜 선택"
              className="border px-3 py-2 rounded-md text-sm"
              popperPlacement="bottom-start"
              portalId="root"
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
            {(filterDates[0] || filterDates[1]) && (
              <Button variant="outline" onClick={() => setFilterDates([null, null])}>날짜 초기화</Button>
            )}
            {filterDept && (
              <Button variant="outline" onClick={() => setFilterDept(null)}>부서 초기화</Button>
            )}
          </div>

          {sortedDates.map(date => (
            <div key={date} className="space-y-4">
              <h3 className="text-base font-bold text-gray-700 dark:text-gray-200 border-b pb-1">{date}</h3>
              {grouped[date].map(report => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl border shadow p-4 space-y-3 transition-shadow hover:shadow-lg"
                >
                  <div className="flex justify-between items-center">
                    <strong className="!text-black !dark:text-black !text-lg !tracking-tight">[{report.dept}]</strong>
                    <div className="space-x-2">
                      <Button size="sm" className="bg-yellow-300 text-black px-2 py-1" onClick={() => handleEdit(report)}>수정</Button>
                      <Button size="sm" className="bg-red-500 text-white px-2 py-1" onClick={() => handleDelete(report.id)}>삭제</Button>
                    </div>
                  </div>

                  <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-100">{report.content}</pre>
                  {report.note && (
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">📒 {report.note}</div>
                  )}
                  {Array.isArray(report.files) && report.files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">📌첨부파일:</p>
                      <ul className="list-disc list-inside text-sm text-blue-600">
                        {report.files.map((fileUrl, idx) => {
                          const urlWithoutQuery = fileUrl.split("?")[0];
                          const fileNameEncoded = urlWithoutQuery.substring(urlWithoutQuery.lastIndexOf("/") + 1);
                          const decodedFullName = decodeURIComponent(fileNameEncoded);
                          const cleanName = decodedFullName.split("-").slice(1).join("-");
                          return (
                            <li key={idx}>
                              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                                {cleanName}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="mt-3 relative z-0 overflow-visible">
                    <Popover open={openPopoverId === report.id} onOpenChange={(open) => setOpenPopoverId(open ? Number(report.id) : null)}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">열람자 체크</Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        align="start"
                        sideOffset={8}
                        className="z-[9999] w-[320px] max-h-[300px] overflow-y-auto rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-xl p-4"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {readers.map(reader => {
                            const isChecked = report.readers.includes(reader);
                            return (
                              <div
                                key={reader}
                                onClick={() => handleReadToggle(report.id, reader)}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer border transition",
                                  isChecked
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-gray-100 hover:bg-gray-200 border-transparent text-gray-800 dark:text-gray-300"
                                )}
                              >
                                {isChecked && <Check size={16} className="shrink-0" />}
                                <span>{reader}</span>
                              </div>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
