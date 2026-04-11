import { motion } from "motion/react";
import { GraduationCap, User, Lock } from "lucide-react";

interface LoginViewProps {
  studentNameInput: string;
  setStudentNameInput: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  loginError: boolean;
  handleLogin: () => void;
}

export const LoginView = ({
  studentNameInput,
  setStudentNameInput,
  password,
  setPassword,
  loginError,
  handleLogin
}: LoginViewProps) => {
  return (
    <motion.div 
      key="login"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-[24px] md:text-[24px] font-bold text-slate-900 font-paperlogy">리드인 내신 대비 대시보드</h1>
          <p className={`mt-2 font-paperlogy ${loginError ? "text-red-500 font-normal" : "text-slate-500"}`}>
            {loginError ? "비밀번호가 일치하지 않습니다" : "내신 대비 학습 현황을 확인해 보세요"}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 font-paperlogy">학생명</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="학생 이름을 입력해 주세요"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-suit"
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
              />
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 font-paperlogy">비밀번호</label>
            <div className="relative">
              <input 
                type="password"
                placeholder="등원 번호를 입력해 주세요"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-suit"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <button 
            onClick={handleLogin}
            disabled={!studentNameInput || !password}
            className={`w-full py-4 bg-blue-600 text-white rounded-xl font-normal hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg font-paperlogy ${!studentNameInput || !password ? "shadow-slate-200" : "shadow-blue-200"}`}
          >
            확인
          </button>
        </div>
      </div>
    </motion.div>
  );
};
