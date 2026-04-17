const leadership = [
  { name: 'Dr. Patricia Nguyen', title: 'President', note: 'Ed.D., University of Massachusetts Amherst' },
  { name: 'Dr. Raymond Osei', title: 'VP, Academic Affairs', note: 'Ph.D., Northeastern University' },
  { name: 'Ms. Karen Fitzgerald', title: 'VP, Student Services', note: 'M.Ed., Worcester State University' },
  { name: 'Mr. Thomas Albanese', title: 'VP, Finance & Operations', note: 'MBA, Clark University' },
]

const timeline = [
  { year: '1972', event: 'Gamma Technical College founded in Worcester, MA, with programs in Drafting and Business.' },
  { year: '1985', event: 'Health Sciences division established. Nursing program graduates first cohort.' },
  { year: '1998', event: 'Information Technology division launched. Enrollment exceeds 3,000 students.' },
  { year: '2008', event: 'Shrewsbury Campus opens at 47 Harrington Way.' },
  { year: '2016', event: 'NECHE re-accreditation for 10 years. MassTransfer Block adopted.' },
  { year: '2022', event: '50th Anniversary. Enrollment surpasses 10,000. Cybersecurity earns NSA CAE designation.' },
  { year: '2026', event: 'New Health Sciences simulation lab opens. ARIA AI assistant deployed.' },
]

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#1B3A6B] to-[#0E7490] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">About Gamma TC</h1>
          <p className="text-blue-200 text-lg">Serving Worcester and Central Massachusetts since 1972.</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-14">

          {/* Mission */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed italic">"Gamma Technical College empowers students from all backgrounds to achieve meaningful careers through affordable, accessible, and industry-aligned technical education."</p>
            <p className="text-gray-500 mt-4">Our vision is a Central Massachusetts where every resident has access to the skills and credentials needed for economic self-sufficiency and lifelong learning.</p>
          </div>

          {/* At a glance */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['1972', 'Founded'], ['10,000+', 'Students Enrolled'], ['70+', 'Programs'], ['96%', 'Job Placement Rate']].map(([stat, label]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-6">
                <p className="text-3xl font-bold text-[#1B3A6B]">{stat}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Locations */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Campuses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#1B3A6B] text-lg mb-2">Main Campus — Worcester</h3>
                <p className="text-gray-600 text-sm">125 Gamma Drive<br />Worcester, MA 01605<br />(508) 754-3400<br />Free parking · WRTA routes 20 & 26</p>
                <div className="mt-4 bg-gray-100 rounded-lg h-40 flex items-center justify-center text-gray-400 text-sm">
                  [Map — 125 Gamma Drive, Worcester, MA 01605]
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#1B3A6B] text-lg mb-2">Shrewsbury Campus</h3>
                <p className="text-gray-600 text-sm">47 Harrington Way<br />Shrewsbury, MA 01545<br />(508) 754-3500<br />Free parking · Evening & weekend classes</p>
                <div className="mt-4 bg-gray-100 rounded-lg h-40 flex items-center justify-center text-gray-400 text-sm">
                  [Map — 47 Harrington Way, Shrewsbury, MA 01545]
                </div>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">Leadership</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leadership.map(({ name, title, note }) => (
                <div key={name} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-[#1B3A6B] text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-[#1B3A6B]">{name}</p>
                    <p className="text-sm text-[#0E7490] font-medium">{title}</p>
                    <p className="text-xs text-gray-400">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#1B3A6B] mb-2">Accreditation</h2>
            <p className="text-gray-600">Gamma Technical College is accredited by the <strong>New England Commission of Higher Education (NECHE)</strong>, the regional accreditor for colleges and universities in the six New England states. NECHE accreditation ensures that Gamma TC meets rigorous standards for academic quality and institutional effectiveness.</p>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-6">History</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {timeline.map(({ year, event }) => (
                  <div key={year} className="flex gap-6 pl-12 relative">
                    <div className="absolute left-0 w-8 h-8 bg-[#0E7490] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{year.slice(2)}</div>
                    <div>
                      <p className="font-bold text-[#1B3A6B] text-sm">{year}</p>
                      <p className="text-gray-600 text-sm">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
