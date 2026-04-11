import { Calendar, TrendingUp } from "lucide-react";
import { StudentInfo } from "../types";

interface StatsCardsProps {
  currentViewStudent: StudentInfo | null;
  formattedExamInfo: string;
  dDay: number | null;
  totalProgress: number;
}

export const StatsCards = ({
  currentViewStudent,
  formattedExamInfo,
  dDay,
  totalProgress
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 1. D-Day Block */}
      <div className="order-1">
        <div className="bg-blue-50 p-6 rounded-3xl shadow-sm border border-blue-100 flex items-center justify-between h-[100px]">
          <div className="flex items-center gap-4">
            <div className="w-[46px] h-[46px] bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-blue-600 font-medium text-[15px] font-paperlogy">{formattedExamInfo}</p>
              <h3 className="text-[21px] md:text-[23px] font-semibold text-slate-900 leading-tight font-paperlogy">{currentViewStudent?.examName || "시험"}까지</h3>
            </div>
          </div>
          <div className="text-[28px] md:text-[32px] font-bold text-blue-600 font-paperlogy">
            {dDay !== null ? (dDay > 0 ? `D-${dDay}` : dDay === 0 ? "D-Day" : `D+${Math.abs(dDay)}`) : "-"}
          </div>
        </div>
      </div>

      {/* 2. Total Progress Block */}
      <div className="order-2">
        <div className="bg-indigo-50 p-6 rounded-3xl shadow-sm border border-indigo-100 flex items-center justify-between h-[100px]">
          <div className="flex items-center gap-4">
            <div className="w-[46px] h-[46px] bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-indigo-600 font-medium text-[15px] font-paperlogy">전체 진행률</p>
              <h3 className="text-[21px] md:text-[23px] font-semibold text-slate-900 leading-tight font-paperlogy">학습 완성도</h3>
            </div>
          </div>
          <div className="text-[28px] md:text-[32px] font-bold text-indigo-600 font-paperlogy">
            {totalProgress}%
          </div>
        </div>
      </div>
    </div>
  );
};
