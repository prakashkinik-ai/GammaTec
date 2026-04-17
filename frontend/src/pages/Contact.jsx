import { useState } from 'react'

const departments = [
  { dept: 'Admissions', phone: '(508) 754-3401', email: 'admissions@gammatc.edu', location: 'SS-101' },
  { dept: 'Financial Aid', phone: '(508) 754-3402', email: 'finaid@gammatc.edu', location: 'SS-103' },
  { dept: 'Registrar', phone: '(508) 754-3403', email: 'registrar@gammatc.edu', location: 'SS-104' },
  { dept: 'Bursar', phone: '(508) 754-3404', email: 'bursar@gammatc.edu', location: 'SS-106' },
  { dept: 'IT Help Desk', phone: '(508) 754-3490', email: 'ithelpdesk@gammatc.edu', location: 'IT-100' },
  { dept: 'Library', phone: '(508) 754-3420', email: 'library@gammatc.edu', location: 'LIB-Main' },
  { dept: 'Counseling', phone: '(508) 754-3470', email: 'wellness@gammatc.edu', location: 'SS-102' },
  { dept: 'Career Services', phone: '(508) 754-3480', email: 'careers@gammatc.edu', location: 'SS-210' },
  { dept: 'Disability Services', phone: '(508) 754-3460', email: 'accessibility@gammatc.edu', location: 'SS-108' },
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      await fetch(`${API_URL}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } catch (_) {}
    setSubmitted(true)
    setSending(false)
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-[#1B3A6B] to-[#0E7490] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-blue-200 text-lg">We're here to help. Reach out anytime.</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Campus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Main Campus — Worcester', addr: '125 Gamma Drive, Worcester, MA 01605', phone: '(508) 754-3400', hours: 'Mon–Thu 7:30 AM–8 PM · Fri 7:30 AM–5 PM · Sat 8 AM–1 PM' },
              { name: 'Shrewsbury Campus', addr: '47 Harrington Way, Shrewsbury, MA 01545', phone: '(508) 754-3500', hours: 'Mon–Thu 7:30 AM–8 PM · Fri 7:30 AM–5 PM' },
            ].map(c => (
              <div key={c.name} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#1B3A6B] text-xl mb-3">{c.name}</h3>
                <address className="not-italic text-gray-600 text-sm space-y-1">
                  <p>📍 {c.addr}</p>
                  <p>📞 {c.phone}</p>
                  <p>🕐 {c.hours}</p>
                </address>
              </div>
            ))}
          </div>

          {/* Department Directory */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Department Directory</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B3A6B] text-white">
                    <th className="text-left p-3">Department</th>
                    <th className="text-left p-3">Phone</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(d => (
                    <tr key={d.dept} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-[#1B3A6B]">{d.dept}</td>
                      <td className="p-3 text-gray-600">{d.phone}</td>
                      <td className="p-3"><a href={`mailto:${d.email}`} className="text-[#0E7490] hover:underline">{d.email}</a></td>
                      <td className="p-3 text-gray-400 text-xs">{d.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Send a Message</h2>
            {submitted ? (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
                <p className="text-2xl mb-2">✅</p>
                <p className="font-semibold text-[#1B3A6B]">Message received!</p>
                <p className="text-gray-600 text-sm mt-1">We'll get back to you within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0E7490]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0E7490]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0E7490] bg-white">
                    <option value="">Select a topic...</option>
                    <option>Admissions Question</option>
                    <option>Financial Aid</option>
                    <option>Program Information</option>
                    <option>Campus Visit / Tour</option>
                    <option>IT Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0E7490] resize-none" />
                </div>
                <button type="submit" disabled={sending} className="bg-[#1B3A6B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a5298] transition-colors disabled:opacity-50">
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  )
}
