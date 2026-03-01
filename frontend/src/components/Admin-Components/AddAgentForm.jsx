import { useState, useEffect } from "react";

const AddAgentForm = ({ onSave, onCancel, agent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  });

  // Populate form when editing an agent
  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name || "",
        email: agent.email || "",
        contactNumber: agent.contactNumber || "",
        address: agent.address || "",
      });
    }
  }, [agent]);

  const clearFormData = () => {
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      address: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass form data to onSave function
    clearFormData(); // Clear form after submission
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/75 backdrop-blur-lg flex items-center justify-center p-6 sm:p-12">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
          {agent ? "Edit Agent" : "Add New Agent"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* Contact Number Field */}
          <div>
            <input
              type="text"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* Address Field */}
          <div>
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-500 transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {agent ? "Save Changes" : "Save Agent"}
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

export default AddAgentForm;