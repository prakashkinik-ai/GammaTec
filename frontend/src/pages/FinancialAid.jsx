export default function FinancialAid() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#1B3A6B] to-[#0E7490] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Financial Aid & Tuition</h1>
          <p className="text-blue-200 text-lg">Most Gamma TC students pay little to nothing out of pocket. Let's find your aid.</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Tuition Rates */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Tuition Rates (per credit hour)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B3A6B] text-white">
                    <th className="text-left p-3">Residency</th>
                    <th className="text-left p-3">Per Credit</th>
                    <th className="text-left p-3">Full-Time (30 cr/yr est.)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['MA Resident', '$189', '~$5,670'],
                    ['NEBHE (New England)', '$284', '~$8,520'],
                    ['Out-of-State', '$378', '~$11,340'],
                    ['Dual Enrollment', '$0 (tuition-free)', '—'],
                  ].map(([r, c, t]) => (
                    <tr key={r} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 font-medium">{r}</td>
                      <td className="p-3 text-[#0E7490] font-semibold">{c}</td>
                      <td className="p-3 text-gray-600">{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">* Additional fees (student activity, technology, lab) average $400–$600/year. Textbooks estimated $300–$600/year.</p>
          </div>

          {/* Aid Types */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Available Aid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Federal Pell Grant', desc: 'Up to $7,395/year for eligible students. Based on EFC from FAFSA. Does not need to be repaid.' },
                { name: 'MassGrant', desc: 'Massachusetts need-based grant for MA residents. Award depends on EFC and enrollment status.' },
                { name: 'MassGrant Plus', desc: 'Covers tuition and fees at MA community colleges for eligible programs. Stackable with Pell Grant.' },
                { name: 'Federal Direct Loans', desc: 'Subsidized (need-based, no interest while enrolled) and Unsubsidized loans available.' },
                { name: 'Federal Work-Study', desc: 'Part-time employment on or near campus. Earnings are not reflected as aid on the bill.' },
                { name: 'Foundation Scholarships', desc: 'Gamma TC Foundation awards $500–$3,000 scholarships. Separate application required. Deadline: March 1.' },
                { name: 'Military Tuition Assistance', desc: 'GI Bill (Ch. 33 & 30), MyCAA (spouses), and federal TA for active duty. Yellow Ribbon participant.' },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-[#1B3A6B] mb-1">{name}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAFSA */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2">How to File the FAFSA</h2>
            <div className="inline-block bg-[#F59E0B] text-[#1B3A6B] font-bold px-4 py-2 rounded-lg mb-6">School Code: 009743</div>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Go to <strong>studentaid.gov</strong> and create an FSA ID</li>
              <li>Complete the FAFSA using your most recent tax return (IRS Data Retrieval Tool recommended)</li>
              <li>Enter Gamma TC school code: <strong>009743</strong></li>
              <li>Submit by <strong>March 1</strong> for priority consideration</li>
              <li>Watch your Gamma TC student email for your financial aid award letter</li>
              <li>Accept your awards in the student portal at portal.gammatc.edu</li>
            </ol>
          </div>

          {/* Payment Plan */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">Payment Plan</h2>
            <p className="text-gray-600">Can't pay in full? Gamma TC offers a 3-installment payment plan per semester with a $35 enrollment fee. No interest. Available through the Bursar's Office or portal.gammatc.edu.</p>
          </div>

          {/* MassGrant Plus programs */}
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] mb-4">MassGrant Plus Qualifying Programs</h2>
            <p className="text-gray-600 mb-3">These programs may be fully covered by Pell + MassGrant Plus for eligible MA residents:</p>
            <div className="flex flex-wrap gap-2">
              {['Nursing — ADN', 'Medical Assisting', 'Cybersecurity', 'Network Administration', 'Web Development', 'Data Analytics', 'Business Administration', 'Accounting Technology', 'Health Information Technology', 'Surgical Technology', 'Early Childhood Education', 'Computer Information Systems'].map(p => (
                <span key={p} className="bg-teal-50 text-[#0E7490] text-sm font-medium px-3 py-1 rounded-full border border-teal-200">{p}</span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
