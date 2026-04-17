import { useState } from 'react'

const faqs = [
  {
    title: 'How to Apply',
    content: (
      <ol className="list-decimal list-inside space-y-2 text-gray-600">
        <li>Complete the online application at gammatc.edu/apply ($20 fee)</li>
        <li>Submit official high school transcript or GED certificate</li>
        <li>Submit any prior college transcripts</li>
        <li>Complete placement testing (Accuplacer) if required</li>
        <li>Meet with an admissions advisor</li>
        <li>Attend New Student Orientation (GammaStart)</li>
      </ol>
    ),
  },
  {
    title: 'Admission Requirements',
    content: (
      <div className="text-gray-600">
        <p className="mb-3">Gamma TC practices open admission for most programs. A high school diploma, GED, or equivalent is required. Select programs (Nursing, Dental Hygiene, Surgical Technology) have additional requirements:</p>
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-gray-50"><th className="text-left p-2 border">Program</th><th className="text-left p-2 border">Additional Requirement</th></tr></thead>
          <tbody>
            <tr><td className="p-2 border">Nursing — ADN</td><td className="p-2 border">Min. 2.5 GPA + TEAS exam</td></tr>
            <tr><td className="p-2 border">Dental Hygiene</td><td className="p-2 border">Min. 2.5 GPA + observation hours</td></tr>
            <tr><td className="p-2 border">Surgical Technology</td><td className="p-2 border">Background check + immunization records</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: 'Placement Testing (Accuplacer)',
    content: (
      <div className="text-gray-600 space-y-2">
        <p>Placement testing determines course placement in Math and English. You may be exempt if you have:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>SAT score ≥ 480 Math / 480 Evidence-Based Reading</li>
          <li>ACT score ≥ 22 English / 22 Math</li>
          <li>Prior college credit in college-level Math or English (grade C or better)</li>
        </ul>
        <p className="mt-2">Testing is free. Schedule online at gammatc.edu/testing or call (508) 754-3410.</p>
      </div>
    ),
  },
  {
    title: 'New Student Orientation',
    content: (
      <p className="text-gray-600">All new students must complete GammaStart orientation before registering for classes. Available in-person (half-day) or online (self-paced, ~3 hours). GammaStart covers financial aid, advising, student services, and campus safety.</p>
    ),
  },
  {
    title: 'Dual Enrollment',
    content: (
      <div className="text-gray-600 space-y-2">
        <p>High school juniors and seniors may enroll tuition-free in select Gamma TC courses with school approval. Eligibility requires a 2.5 GPA and counselor/parent signature. Credits earned transfer to your Gamma TC degree upon enrollment.</p>
        <p>Contact dualenrollment@gammatc.edu for the current course list and approval forms.</p>
      </div>
    ),
  },
  {
    title: 'Transfer Credit Policy',
    content: (
      <div className="text-gray-600 space-y-2">
        <p>Gamma TC participates in <strong>MassTransfer</strong> — Massachusetts' statewide credit transfer guarantee. College-level credits with a grade of C or better from regionally accredited institutions will be evaluated for transfer. Submit official transcripts to the Registrar's Office.</p>
        <p>MassTransfer Block guarantees full transfer credit for AAS graduates to MA public 4-year institutions.</p>
      </div>
    ),
  },
  {
    title: 'Application Deadlines',
    content: (
      <table className="w-full text-sm border-collapse text-gray-600">
        <thead><tr className="bg-gray-50"><th className="text-left p-2 border">Semester</th><th className="text-left p-2 border">Priority Deadline</th><th className="text-left p-2 border">Final Deadline</th></tr></thead>
        <tbody>
          <tr><td className="p-2 border">Fall 2026</td><td className="p-2 border">June 1, 2026</td><td className="p-2 border">August 1, 2026</td></tr>
          <tr><td className="p-2 border">Spring 2027</td><td className="p-2 border">October 15, 2026</td><td className="p-2 border">December 1, 2026</td></tr>
          <tr><td className="p-2 border">Summer 2026</td><td className="p-2 border">March 15, 2026</td><td className="p-2 border">April 28, 2026</td></tr>
        </tbody>
      </table>
    ),
  },
]

function Accordion({ title, content }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#1B3A6B]">{title}</span>
        <span className="text-[#0E7490] text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-6 py-4 bg-white border-t border-gray-100">{content}</div>}
    </div>
  )
}

export default function Admissions() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#1B3A6B] to-[#0E7490] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Admissions & Enrollment</h1>
          <p className="text-blue-200 text-lg">We make it simple. Most students can start in just a few weeks.</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {faqs.map(faq => <Accordion key={faq.title} title={faq.title} content={faq.content} />)}
          <div className="text-center mt-10">
            <a href="https://gammatc.edu/apply" className="bg-[#1B3A6B] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#2a5298] transition-colors inline-block">Apply Now →</a>
          </div>
        </div>
      </section>
    </div>
  )
}
