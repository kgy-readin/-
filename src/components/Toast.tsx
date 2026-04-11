import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ToastProps {
  toast: { message: string; type: "success" | "error" } | null;
}

export const Toast = ({ toast }: ToastProps) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
          className={`fixed top-1/2 left-1/2 z-50 px-8 py-4 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-4 min-w-[300px] border text-center ${
            toast.type === "success" 
              ? "bg-white/95 backdrop-blur-sm text-emerald-600 border-emerald-100" 
              : "bg-white/95 backdrop-blur-sm text-red-600 border-red-100"
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            toast.type === "success" ? "bg-emerald-50" : "bg-red-50"
          }`}>
            {toast.type === "success" ? (
              <CheckCircle className="w-10 h-10" />
            ) : (
              <AlertCircle className="w-10 h-10" />
            )}
          </div>
          <span className="text-lg font-bold">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
