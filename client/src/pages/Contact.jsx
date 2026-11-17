import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (event) => {
    event.preventDefault();
    toast.success("Message received. We will get back to you.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mt-16 mb-16 max-w-xl">
      <p className="text-3xl font-medium">Contact <span className="text-green-700">Us</span></p>
      <p className="mt-3 text-gray-500">Questions about an order, delivery, or your seller account? Send a message.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full border border-gray-300 px-3 py-2 outline-none" />
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-gray-300 px-3 py-2 outline-none" />
        <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" rows={5} className="w-full border border-gray-300 px-3 py-2 outline-none" />
        <button className="px-6 py-2.5 bg-green-700 text-white rounded cursor-pointer">Send</button>
      </form>
      <p className="mt-6 text-sm text-gray-500">Email: support@mymart.com</p>
    </div>
  );
};

export default Contact;
