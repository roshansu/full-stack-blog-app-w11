import { useEffect } from "react";

const Popup = ({ type = "pending", message, onClose }) => {
  useEffect(() => {
    if (type === "success" || type === "error") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
  };

  const icons = {
    pending: "⏳",
    success: "✅",
    error: "❌",
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg ${styles[type]}`}
      >
        <span className="text-xl">{icons[type]}</span>
        <p className="font-medium">{message}</p>

        {/* Close Button */}
        {type !== "pending" && (
          <button
            onClick={onClose}
            className="ml-3 text-sm font-bold hover:opacity-70"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;