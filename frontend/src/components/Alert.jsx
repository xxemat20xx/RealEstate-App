import React from "react";

const ConfirmAlert = ({ message, onConfirm, onCancel }) => {
  return (
<div className="fixed inset-0 flex items-center justify-center z-50">
  {/* Semi-transparent overlay */}
  <div className="absolute inset-0 bg-black/20"></div>

  {/* Alert box */}
  <div className="relative bg-white rounded-xl shadow-2xl p-6 w-80 text-center border-2 border-amber-600">
    <p className="mb-6 text-gray-900 font-semibold text-lg">{message}</p>
    <div className="flex justify-around gap-4">
      <button
        className="px-5 py-2 bg-white text-amber-600 font-bold border-2 border-amber-600 rounded-lg hover:bg-amber-50 hover:border-amber-700 transition-colors"
        onClick={onCancel}
      >
        No
      </button>
      <button
        className="px-5 py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors shadow-lg"
        onClick={onConfirm}
      >
        Yes
      </button>
    </div>
  </div>
</div>
  );
};

export default ConfirmAlert;