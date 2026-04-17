import { Link } from 'react-router-dom'

const featured = [
  { name: 'Nursing — ADN', division: 'Health Sciences', credential: 'AAS', icon: '🏥' },
  { name: 'Cybersecurity', division: 'Information Technology', credential: 'AAS', icon: '🔐' },
  { name: 'Business Administration', division: 'Business', credential: 'AAS', icon: '💼' },
  { name: 'Welding Technology', division: 'Trades', credential: 'Diploma', icon: '🔧' },
  { name: 'Early Childhood Education', division: 'Early Childhood', credential: 'AAS', icon: '🧒' },
  { name: 'HVAC/R Technology', division: 'Trades', credential: 'Diploma', icon: '❄️' },
]

const whyGamma = [
  { title: 'Affordable', desc: 'MA residents pay just $189/credit hour. Pell Grant, MassGrant Plus, and institutional scholarships available.', icon: '💰' },
  { title: 'Flexible', desc: 'Day, evening, and online options designed around work and family schedules.', icon: '📅' },
  { title: 'Career-Ready', desc: '96% job placement rate. Employers recruit directly on campus through GammaCareer.', icon: '🎯' },
  { title: 'Supported', desc: 'Tutoring, counseling, food assistance, and advising — all included with enrollment.', icon: '🤝' },
]

const news = [
  { title: 'Cybersecurity Program Earns NSA CAE Designation', date: 'March 15, 2026', summary: 'Gamma TC joins an elite group of institutions recognized by the NSA as a Center of Academic Excellence in Cyber Defense.' },
  { title: 'New Simulation Lab Opens in Health Sciences Building', date: 'February 28, 2026', summary: 'A $2.4M investment brings state-of-the-art patient simulation technology to nursing and surgical technology students.' },
  { title: 'Griffin\'s Pantry Expands Hours for Spring Semester', date: 'January 12, 2026', summary: 'The student food pantry now serves all five weekdays and Saturday mornings to better support our community.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B3A6B] to-[#0E7490] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#F59E0B] font-semibold text-sm uppercase tracking-widest mb-4">Worcester & Shrewsbury, MA</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Career-Focused Education for Real-World Jobs
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              Gamma Technical College delivers affordable, accredited programs that connect students directly to careers in health sciences, technology, business, and the trades.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://gammatc.edu/apply" className="bg-[#F59E0B] text-[#1B3A6B] px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">Apply Now</a>
              <Link to="/programs" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1B3A6B] transition-colors">Explore Programs</Link>
              <Link to="/contact" className="text-blue-200 px-6 py-3 rounded-lg font-semibold hover:text-white transition-colors underline underline-offset-4">Schedule a Tour</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0E7490] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['70+', 'Programs'], ['10,000+', 'Graduates'], ['2', 'Campuses'], ['96%', 'Job Placement']].map(([stat, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold text-[#F59E0B]">{stat}</p>
              <p className="text-sm text-teal-100 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1B3A6B]">Featured Programs</h2>
            <p className="text-gray-600 mt-2">Launch your career with a credential employers trust</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <div key={p.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-[#1B3A6B] text-lg mb-1">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{p.division}</p>
                <span className="inline-block bg-teal-50 text-[#0E7490] text-xs font-semibold px-2 py-1 rounded">{p.credential}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/programs" className="bg-[#1B3A6B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a5298] transition-colors">View All Programs</Link>
          </div>
        </div>
      </section>

      {/* Why Gamma TC */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1B3A6B]">Why Gamma TC?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyGamma.map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#1B3A6B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1B3A6B]">Campus Spotlight</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <p className="text-xs text-[#0E7490] font-semibold uppercase tracking-wide mb-2">{item.date}</p>
                <h3 className="font-bold text-[#1B3A6B] mb-2 leading-tight">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B3A6B] text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-blue-200 mb-8">Applications for Fall 2026 are open. Deadline: August 1, 2026.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://gammatc.edu/apply" className="bg-[#F59E0B] text-[#1B3A6B] px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">Apply Today</a>
            <Link to="/financial-aid" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1B3A6B] transition-colors">Explore Financial Aid</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
