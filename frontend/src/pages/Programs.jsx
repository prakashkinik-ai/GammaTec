import { useState } from 'react'

const programs = [
  { name: 'Nursing — ADN', credential: 'AAS', division: 'Health Sciences', duration: '2 years', careers: 'Registered Nurse, Clinical Nurse', tuition: '~$13,500', desc: 'Prepares students for the NCLEX-RN exam and entry-level registered nursing positions in hospitals, clinics, and long-term care.' },
  { name: 'Medical Assisting', credential: 'Certificate', division: 'Health Sciences', duration: '1 year', careers: 'Medical Assistant, Clinical Office Specialist', tuition: '~$6,800', desc: 'Covers clinical and administrative skills for outpatient medical settings including EHR, phlebotomy, and patient intake.' },
  { name: 'Dental Hygiene', credential: 'AAS', division: 'Health Sciences', duration: '2 years', careers: 'Registered Dental Hygienist', tuition: '~$13,500', desc: 'Comprehensive program including didactic, lab, and clinical components. Prepares students for NBDHE board exam.' },
  { name: 'Surgical Technology', credential: 'AAS', division: 'Health Sciences', duration: '2 years', careers: 'Surgical Technologist, CST', tuition: '~$13,500', desc: 'Prepares students to assist surgeons in the operating room. Includes extensive clinical rotations at partner hospitals.' },
  { name: 'Health Information Technology', credential: 'AAS', division: 'Health Sciences', duration: '2 years', careers: 'HIM Technician, Medical Coder', tuition: '~$13,500', desc: 'Covers medical coding (ICD-10, CPT), health records management, and healthcare data systems.' },
  { name: 'Cybersecurity', credential: 'AAS', division: 'Information Technology', duration: '2 years', careers: 'Security Analyst, SOC Analyst, IT Auditor', tuition: '~$13,500', desc: 'NSA CAE-designated program covering network defense, ethical hacking, incident response, and CompTIA Security+ prep.' },
  { name: 'Network Administration', credential: 'AAS', division: 'Information Technology', duration: '2 years', careers: 'Network Admin, Systems Engineer', tuition: '~$13,500', desc: 'Covers TCP/IP, routing, switching, cloud infrastructure, and Cisco networking fundamentals.' },
  { name: 'Computer Information Systems', credential: 'AAS', division: 'Information Technology', duration: '2 years', careers: 'IT Support Specialist, Database Admin', tuition: '~$13,500', desc: 'Broad IT foundation covering programming, databases, systems analysis, and help desk operations.' },
  { name: 'Web Development', credential: 'Certificate', division: 'Information Technology', duration: '1 year', careers: 'Front-End Developer, UI Designer', tuition: '~$6,800', desc: 'HTML, CSS, JavaScript, React, and responsive design principles. Portfolio-based capstone project.' },
  { name: 'Data Analytics', credential: 'Certificate', division: 'Information Technology', duration: '1 year', careers: 'Data Analyst, BI Analyst', tuition: '~$6,800', desc: 'Python, SQL, Tableau, and statistical analysis. Emphasizes real-world data storytelling.' },
  { name: 'Business Administration', credential: 'AAS', division: 'Business', duration: '2 years', careers: 'Office Manager, Business Analyst, Entrepreneur', tuition: '~$13,500', desc: 'Covers accounting, management, marketing, and business communications. MassTransfer pathway to 4-year institutions.' },
  { name: 'Accounting Technology', credential: 'AAS', division: 'Business', duration: '2 years', careers: 'Bookkeeper, Accounting Technician, Payroll Specialist', tuition: '~$13,500', desc: 'QuickBooks, payroll, tax preparation, and financial statement analysis. Prepares students for CPA exam prerequisites.' },
  { name: 'Welding Technology', credential: 'Diploma', division: 'Trades', duration: '1 year', careers: 'Welder, Fabricator, Pipe Welder', tuition: '~$9,000', desc: 'MIG, TIG, and stick welding in state-of-the-art shop facilities. AWS certification prep.' },
  { name: 'Electrical Technology', credential: 'AAS', division: 'Trades', duration: '2 years', careers: 'Electrician, Electrical Inspector', tuition: '~$13,500', desc: 'NEC code, residential and commercial wiring, motor controls, and PLC fundamentals.' },
  { name: 'HVAC/R Technology', credential: 'Diploma', division: 'Trades', duration: '1 year', careers: 'HVAC Technician, Refrigeration Mechanic', tuition: '~$9,000', desc: 'EPA 608 certification prep, refrigeration systems, heating equipment, and system diagnostics.' },
  { name: 'Automotive Service Technology', credential: 'Diploma', division: 'Trades', duration: '1 year', careers: 'Automotive Technician, Service Advisor', tuition: '~$9,000', desc: 'ASE certification prep covering engine, transmission, brakes, electrical, and hybrid systems.' },
  { name: 'Early Childhood Education', credential: 'AAS', division: 'Early Childhood', duration: '2 years', careers: 'Preschool Teacher, Childcare Director', tuition: '~$13,500', desc: 'Child development, curriculum design, and supervised practicum. Qualifies for MA EEC teacher certification.' },
  { name: 'Criminal Justice Technology', credential: 'AAS', division: 'Criminal Justice', duration: '2 years', careers: 'Law Enforcement Officer, Correctional Officer', tuition: '~$13,500', desc: 'Criminal law, corrections, community policing, and criminal investigations.' },
  { name: 'Emergency Medical Services', credential: 'Certificate', division: 'Public Safety', duration: '6 months', careers: 'EMT-Basic, Paramedic (with bridge)', tuition: '~$3,400', desc: 'Massachusetts EMT-Basic certification. 110-hour program with clinical rotations at area hospitals.' },
]

const divisions = ['All', 'Health Sciences', 'Information Technology', 'Business', 'Trades', 'Early Childhood', 'Criminal Justice', 'Public Safety']

export default function Programs() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const visible = filter === 'All' ? programs : programs.filter(p => p.division === filter)

  return (
    <div>
      <section className="bg-gradient-to-r from-[#1B3A6B] to-[#0E7490] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Programs of Study</h1>
          <p className="text-blue-200 text-lg">19 career-focused programs. Many qualify for MassGrant Plus funding.</p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {divisions.map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === d
                    ? 'bg-[#1B3A6B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map(p => (
              <div
                key={p.name}
                onClick={() => setSelected(p)}
                className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md hover:border-[#0E7490] transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-teal-50 text-[#0E7490] font-semibold px-2 py-1 rounded">{p.credential}</span>
                  <span className="text-xs text-gray-400">{p.duration}</span>
                </div>
                <h3 className="font-bold text-[#1B3A6B] text-lg mb-1">{p.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{p.division}</p>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{p.careers}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs bg-teal-50 text-[#0E7490] font-semibold px-2 py-1 rounded">{selected.credential}</span>
                <p className="text-xs text-gray-400 mt-1">{selected.division}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-3">{selected.name}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{selected.desc}</p>
            <dl className="grid grid-cols-2 gap-3 text-sm mb-6">
              <div><dt className="text-gray-400 text-xs uppercase tracking-wide">Duration</dt><dd className="font-semibold text-gray-800">{selected.duration}</dd></div>
              <div><dt className="text-gray-400 text-xs uppercase tracking-wide">Est. Tuition</dt><dd className="font-semibold text-gray-800">{selected.tuition}</dd></div>
              <div className="col-span-2"><dt className="text-gray-400 text-xs uppercase tracking-wide">Career Outcomes</dt><dd className="font-semibold text-gray-800">{selected.careers}</dd></div>
            </dl>
            <p className="text-xs text-gray-400 mb-4">Advisor contact: admissions@gammatc.edu · (508) 754-3400</p>
            <a href="https://gammatc.edu/apply" className="block w-full bg-[#1B3A6B] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#2a5298] transition-colors">Apply to This Program</a>
          </div>
        </div>
      )}
    </div>
  )
}
