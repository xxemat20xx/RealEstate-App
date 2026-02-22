import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useInquiryStore } from "../../store/useInquiryStore";

const InquiryModal = ({ property, onClose}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const recaptchaRef = useRef(null);
  const { createInquiry } = useInquiryStore();

  console.log(window.location.hostname)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: `I am interested in ${property.title}. Please provide more details regarding availability and viewing schedules.`,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = recaptchaRef.current.getValue();

    if (!token) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    setLoading(true);

    const result = await createInquiry({
      ...formData,
      propertyId: property._id,
      propertyTitle: property.title,
      recaptchaToken: token,
    });

    setLoading(false);
    recaptchaRef.current.reset();

    if (result?.success) {
      setSubmitted(true);
    } else {
      alert(result?.message || "Something went wrong");
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 text-center animate-in fade-in zoom-in duration-300">
          <h3 className="text-2xl font-serif font-bold mb-4">
            Inquiry Received
          </h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Our senior advisor for {property.address} has been notified.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-slate-900 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white">
            ✕
          </button>
          <h3 className="text-2xl font-serif font-bold mb-2">Private Inquiry</h3>
          <p className="text-slate-400 text-sm">
            Expressing interest in <span className="text-amber-500 font-bold">{property.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input required name="firstName" value={formData.firstName} onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20" placeholder="John" />

            <input required name="lastName" value={formData.lastName} onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20" placeholder="Doe" />
          </div>

          <input required type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20"
            placeholder="john@example.com" />

          <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20"
            placeholder="+1 (555) 000-0000" />

          <textarea rows={3} name="message" value={formData.message} onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/20 resize-none" />

            <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            ref={recaptchaRef}
            />

          <button disabled={loading} type="submit"
            className="w-full bg-amber-600 text-white py-5 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50">
            {loading ? "Submitting..." : "Submit Formal Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;