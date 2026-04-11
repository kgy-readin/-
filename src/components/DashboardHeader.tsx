import { GraduationCap, Users, User, Link, RefreshCcw, LogOut } from "lucide-react";
import { StudentInfo } from "../types";

interface DashboardHeaderProps {
  isAdmin: boolean;
  currentViewStudent: StudentInfo | null;
  adminViewStudent: StudentInfo | null;
  setAdminViewStudent: (s: StudentInfo | null) => void;
  students: StudentInfo[];
  classGroups: string[];
  selectedClassGroup: string;
  setSelectedClassGroup: (g: string) => void;
  isRefreshing: boolean;
  fetchData: (initial?: boolean) => void;
  handleLogout: () => void;
}

export const DashboardHeader = ({
  isAdmin,
  currentViewStudent,
  adminViewStudent,
  setAdminViewStudent,
  students,
  classGroups,
  selectedClassGroup,
  setSelectedClassGroup,
  isRefreshing,
  fetchData,
  handleLogout
}: DashboardHeaderProps) => {
  return (
    <header className="bg-white p-6 md:py-7 md:px-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="mt-[3px] mb-[-2px]">
        <div className="flex items-center gap-2 text-blue-600 font-normal font-paperlogy mb-0 text-[15px] md:text-[16px]">
          <GraduationCap className="w-5 h-5 mb-[2px]" />
          <span>
            {isAdmin ? "리드인 내신 대비 대시보드" : `${currentViewStudent?.school} ${currentViewStudent?.grade}`}
          </span>
        </div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-slate-900 font-paperlogy">
          {isAdmin ? "학생별 대시보드 관리" : `${currentViewStudent?.name} 학생 내신 대비`}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {isAdmin ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                className="w-[85px] h-10 pt-[10px] pb-[10px] pl-[31px] pr-[10px] text-[13px] sm:w-[95px] sm:h-auto sm:pl-[38px] sm:pr-3 sm:py-3 sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all font-semibold text-slate-700 font-suit"
                onChange={(e) => {
                  setSelectedClassGroup(e.target.value);
                  if (e.target.value !== "전체" && adminViewStudent && adminViewStudent.classGroup !== e.target.value) {
                    setAdminViewStudent(null);
                  }
                }}
                value={selectedClassGroup}
              >
                {classGroups.map(group => (
                  <option key={group} value={group} className="font-suit">{group}</option>
                ))}
              </select>
              <Users className="absolute left-3 top-[13px] sm:top-3.5 w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] text-slate-400" />
            </div>

            <div className="relative">
              <select 
                className="w-[85px] h-10 pt-[10px] pb-[10px] pl-[31px] pr-[10px] text-[13px] sm:w-[95px] sm:h-auto sm:pl-[38px] sm:pr-3 sm:py-3 sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all font-semibold text-slate-700 font-suit"
                onChange={(e) => {
                  const student = students.find(s => s.name === e.target.value);
                  setAdminViewStudent(student || null);
                }}
                value={adminViewStudent?.name || ""}
              >
                <option value="" className="font-suit">선택</option>
                {students
                  .filter(s => s.name !== "관리자")
                  .filter(s => selectedClassGroup === "전체" || s.classGroup === selectedClassGroup)
                  .map(s => (
                    <option key={s.name} value={s.name} className="font-suit">{s.name}</option>
                  ))
                }
              </select>
              <User className="absolute left-3 top-[13px] sm:top-3.5 w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] text-slate-400" />
            </div>
          </div>
        ) : (
          currentViewStudent?.reportUrl && (
            <a 
              href={currentViewStudent.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-all shadow-sm border border-blue-100 flex items-center justify-center gap-2"
              title="숙제 리포트 보기"
            >
              <Link className="w-6 h-6" />
              <span className="font-semibold text-sm font-paperlogy">숙제 리포트</span>
            </a>
          )
        )}

        <button 
          onClick={() => fetchData(false)}
          disabled={isRefreshing}
          className="w-10 h-10 pl-0 sm:w-auto sm:h-auto sm:p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center disabled:opacity-50"
          title="새로고침"
        >
          <RefreshCcw className={`w-[18px] h-[18px] sm:w-6 sm:h-6 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>

        <button 
          onClick={handleLogout}
          className="w-10 h-10 sm:w-auto sm:h-auto sm:p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center"
          title="로그아웃"
        >
          <LogOut className="w-[18px] h-[18px] sm:w-6 sm:h-6" />
        </button>
      </div>
    </header>
  );
};
