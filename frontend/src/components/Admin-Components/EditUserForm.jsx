import { useState, useEffect } from "react";

const EditUserForm = ({ onSave, onCancel, user }) => {
  const [role, setRole] = useState("user");

  // Populate role when editing a user
  useEffect(() => {
    if (user) {
      setRole(user.role || "user");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ role }); // Only send the role to the backend
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/75 backdrop-blur-lg flex items-center justify-center p-6 sm:p-12">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          Edit User Role
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (read-only) */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={user?.name || ""}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 cursor-not-allowed"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 cursor-not-allowed"
            />
          </div>

          {/* Role (editable) */}
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Verified (read-only) */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={user?.isVerified || false}
              readOnly
              className="h-4 w-4 accent-amber-500 cursor-not-allowed"
            />
            <label className="text-slate-700 text-sm">Verified</label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-500 transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-3 bg-slate-500 text-white font-semibold rounded-lg shadow-md hover:bg-slate-400 transition-all focus:ring-2 focus:ring-slate-400 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;