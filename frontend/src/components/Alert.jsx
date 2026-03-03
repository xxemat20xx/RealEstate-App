import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmAlert = ({ message, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

        {/* Premium Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onCancel}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full max-w-md"
        >
          {/* Glow Background */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 blur-xl opacity-20" />

          {/* Glass Card */}
          <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.25)] p-8 text-center">

            {/* Floating Icon */}
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mb-5 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-inner"
            >
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"
                />
              </svg>
            </motion.div>

            {/* Message */}
            <p className="text-xl font-semibold text-gray-800 leading-relaxed mb-8">
              {message}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Confirm
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmAlert;