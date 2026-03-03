import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useInquiryStore } from "../store/useInquiryStore";
import { Shield, User, Mail } from "lucide-react";

import Alert from "../components/Alert";



const Inquiries = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    inquiries,
    getInquiries,
    getMyInquiries,
    deleteAllInquiries,
  } = useInquiryStore();

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (isAuthenticated && user?.role === "admin") {
        await getInquiries();
      } else if (isAuthenticated) {
        await getMyInquiries();
      } else {
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    fetchData();
  }, [user, isAuthenticated]);

  const handleDeleteAll = async () => {
    try {
      setDeleting(true);
      await deleteAllInquiries();
      await getInquiries();
      setShowConfirm(false);
    } catch (error) {
      console.error("Failed to delete inquiries:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col items-center py-24 px-4 sm:px-12 
    bg-gradient-to-br from-slate-50 via-white to-slate-100 
    dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">

      {/* Header Section */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between mb-14 gap-6">

        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Inquiries
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm sm:text-base">
            Manage and review all property inquiries
          </p>
        </div>

        {/* Delete All Button - Admin Only */}
        {user?.role === "admin" && inquiries.length > 0 && (
          <button
            onClick={() => setShowConfirm(true)}
            disabled={deleting}
            className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 
            text-white font-medium shadow-lg hover:shadow-xl 
            transition-all duration-300 disabled:opacity-50 
            disabled:cursor-not-allowed flex items-center gap-2"
          >
            {deleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              <>🗑 Delete All</>
            )}
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 w-full">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Loading inquiries...
          </p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="flex items-center justify-center h-64 w-full">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg px-8 py-6 rounded-2xl shadow-lg">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No inquiries found.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 w-full max-w-7xl sm:grid-cols-2 lg:grid-cols-3">
          {inquiries.map((inq) => (
            <div
              key={inq._id}
              className="group relative bg-white/70 dark:bg-slate-800/70 
              backdrop-blur-xl border border-white/30 dark:border-slate-700 
              shadow-lg hover:shadow-2xl rounded-2xl p-6 
              transition-all duration-300 hover:-translate-y-2"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br 
              from-amber-400/10 to-orange-500/10 opacity-0 
              group-hover:opacity-100 transition duration-300"></div>

              {/* Header */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-500/20">
                  {inq.user ? (
                    <User size={18} className="text-amber-500" />
                  ) : (
                    <Shield size={18} className="text-amber-500" />
                  )}
                </div>

                <div>
                  <h2 className="font-semibold text-slate-800 dark:text-white text-sm sm:text-base">
                    {inq.user?.name || "Guest User"}
                  </h2>

                  {inq.user?.role && (
                    <span className="text-xs px-2 py-1 rounded-full 
                    bg-amber-500/10 text-amber-600 dark:text-amber-400 
                    uppercase tracking-wide">
                      {inq.user.role}
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-gradient-to-r 
              from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>

              {/* Property */}
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Property:
                </span>{" "}
                {inq.propertyTitle}
              </p>

              {/* Message */}
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 
              line-clamp-3 leading-relaxed">
                {inq.message}
              </p>

              {/* Contact */}
              <div className="mt-5 flex flex-col gap-2 text-sm relative z-10">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail size={16} className="text-amber-500" />
                  {inq.email}
                </div>

                {inq.contactNumber && (
                  <div className="text-slate-600 dark:text-slate-400">
                    📞 {inq.contactNumber}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {showConfirm && (
        <Alert
          title="Delete All Inquiries"
          message="Are you sure you want to delete all inquiries? This action cannot be undone."
          onConfirm={handleDeleteAll}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default Inquiries;