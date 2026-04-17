const services = [
  {
    icon: '📚',
    name: 'Library',
    subtitle: 'Merriweather Library',
    desc: 'Access to 50,000+ print and digital resources, 8 study rooms, and databases including JSTOR, ProQuest, and LinkedIn Learning.',
    details: 'Mon–Thu 7:30 AM–9 PM · Fri 7:30 AM–5 PM · Sat 9 AM–2 PM · (508) 754-3420',
  },
  {
    icon: '🎓',
    name: 'Tutoring',
    subtitle: 'Learning Success Center',
    desc: 'Free tutoring in Math, English, and Science. Drop-in and appointment-based. Online tutoring via Microsoft Teams available.',
    details: 'Room AS-110 · Mon–Thu 8 AM–7 PM · (508) 754-3430',
  },
  {
    icon: '💬',
    name: 'Counseling',
    subtitle: 'Student Wellness Center',
    desc: 'Free, confidential counseling services. Up to 8 sessions per academic year. Same-day crisis appointments available.',
    details: 'Room SS-102 · Mon–Fri 8 AM–5 PM · (508) 754-3470 · wellness@gammatc.edu',
  },
  {
    icon: '♿',
    name: 'Disability Services',
    subtitle: 'Office of Accessibility',
    desc: 'Academic accommodations, assistive technology, extended testing time, and note-taking support. Register each semester.',
    details: 'Room SS-108 · Mon–Fri 8 AM–5 PM · (508) 754-3460 · accessibility@gammatc.edu',
  },
  {
    icon: '💼',
    name: 'Career Services',
    subtitle: 'GammaCareer Center',
    desc: 'Resume reviews, mock interviews, job fairs, and access to the GammaCareer job board. Employer recruiting events each semester.',
    details: 'Room SS-210 · Mon–Fri 8:30 AM–5 PM · (508) 754-3480 · careers@gammatc.edu',
  },
  {
    icon: '🥫',
    name: "Griffin's Pantry",
    subtitle: 'Student Food Assistance',
    desc: 'Free food pantry for all enrolled students. No appointment or paperwork needed — just bring your student ID. Restocked weekly.',
    details: 'Room SS-115 · Mon–Thu 9 AM–6 PM · Fri 9 AM–3 PM · pantry@gammatc.edu',
  },
  {
    icon: '🎗️',
    name: 'Student Life',
    subtitle: 'Clubs & Activities',
    desc: '20+ active student clubs including Phi Theta Kappa, Student Government Association, cultural organizations, and program-specific clubs.',
    details: 'Student Activities Office · SS-201 · (508) 754-3450',
  },
  {
    icon: '🪖',
    name: 'Military & Veterans',
    subtitle: 'Veterans Resource Center',
    desc: 'GI Bill processing, Yellow Ribbon Program, priority registration, and a dedicated lounge for veteran students and military families.',
    details: 'Room SS-105 · Mon–Fri 8 AM–5 PM · (508) 754-3445 · veterans@gammatc.edu',
  },
]

export default function CampusServices() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#1B3A6B] to-[#0E7490] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Campus Services</h1>
          <p className="text-blue-200 text-lg">Everything you need to succeed — included with your enrollment.</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(s => (
            <div key={s.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-[#1B3A6B] text-lg mb-0.5">{s.name}</h3>
              <p className="text-xs text-[#0E7490] font-semibold mb-3">{s.subtitle}</p>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{s.desc}</p>
              <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">{s.details}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
