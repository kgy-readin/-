import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { BookOpen, CheckCircle } from "lucide-react";
import { StudentInfo } from "../types";

interface ProgressChartsProps {
  isAdmin: boolean;
  currentViewStudent: StudentInfo | null;
  loading: boolean;
  unitChartData: any[];
  itemChartData: any[];
}

export const ProgressCharts = ({
  isAdmin,
  currentViewStudent,
  loading,
  unitChartData,
  itemChartData
}: ProgressChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 3. Unit-wise Chart */}
      <div className="order-3">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
          <div className="flex items-center gap-3 mb-0">
            <div className="w-[37px] h-[37px] bg-blue-50 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-[19px] font-semibold text-slate-900 font-paperlogy">
              {isAdmin && currentViewStudent && <span className="text-blue-600 mr-1 font-paperlogy">{currentViewStudent.name}</span>}
              단원별 진행률
            </h2>
          </div>
          <div className="h-[350px] w-full mt-4">
            {!loading && unitChartData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart 
                  // @ts-ignore
                  key={`unit-chart-${unitChartData.map(d => d.unit).join(',')}`}
                  data={unitChartData} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="unit" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Paperozi' }} 
                    dy={10}
                    tickFormatter={(value) => value.length > 4 ? value.substring(0, 4) : value}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Paperozi' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[320px] font-suit">
                            <p className="font-bold text-slate-900 mb-1 font-suit">{data.unit}</p>
                            <p className="text-blue-600 font-bold text-lg mb-2 font-suit">진행률: {data.average}%</p>
                            <div className="pt-2 border-t border-slate-50">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 font-suit">완료 항목</p>
                              <p className="text-xs text-slate-600 leading-relaxed font-medium font-suit">
                                {data.completedList}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="average" 
                    barSize={40}
                    shape={(props: any) => {
                      let { x, y, width, height, average } = props;
                      const fill = average >= 80 ? '#2563eb' : average >= 50 ? '#60a5fa' : '#93c5fd';
                      if (height < 5) {
                        y = y - (5 - height);
                        height = 5;
                      }
                      const radius = Math.min(6, height);
                      return (
                        <path 
                          d={`M${x},${y + radius} Q${x},${y} ${x + radius},${y} L${x + width - radius},${y} Q${x + width},${y} ${x + width},${y + radius} L${x + width},${y + height} L${x},${y + height} Z`} 
                          fill={fill} 
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* 4. Item-wise Chart */}
      <div className="order-4">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
          <div className="flex items-center gap-3 mb-0">
            <div className="w-[37px] h-[37px] bg-indigo-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-[19px] font-semibold text-slate-900 font-paperlogy">
              {isAdmin && currentViewStudent && <span className="text-indigo-600 mr-1 font-paperlogy">{currentViewStudent.name}</span>}
              항목별 진행률
            </h2>
          </div>
          <div className="h-[350px] w-full mt-4">
            {!loading && itemChartData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart 
                  // @ts-ignore
                  key={`item-chart-${itemChartData.map(d => d.item).join(',')}`}
                  data={itemChartData} 
                  layout="vertical" 
                  margin={{ top: 0, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Paperozi' }} />
                  <YAxis dataKey="item" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 500, fontFamily: 'Paperozi' }} width={70} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[320px] font-suit">
                            <p className="font-bold text-slate-900 mb-1 font-suit">{data.item}</p>
                            <p className="text-indigo-600 font-bold text-lg mb-2 font-suit">진행률: {data.average}%</p>
                            <div className="pt-2 border-t border-slate-50">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 font-suit">완료 단원</p>
                              <p className="text-xs text-slate-600 leading-relaxed font-medium font-suit">
                                {data.completedList}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="average" 
                    barSize={20}
                    shape={(props: any) => {
                      let { x, y, width, height, average } = props;
                      const fill = average >= 80 ? '#4f46e5' : average >= 50 ? '#818cf8' : '#c7d2fe';
                      if (width < 5) width = 5;
                      const radius = Math.min(6, width);
                      return (
                        <path 
                          d={`M${x},${y} L${x + width - radius},${y} Q${x + width},${y} ${x + width},${y + radius} L${x + width},${y + height - radius} Q${x + width},${y + height} ${x + width - radius},${y + height} L${x},${y + height} Z`} 
                          fill={fill} 
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
