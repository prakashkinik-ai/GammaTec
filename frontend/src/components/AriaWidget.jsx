import { useState, useRef, useEffect } from 'react'

const CANNED = [
  { pattern: /apply|application|apply now/i, response: "To apply to Gamma TC, visit gammatc.edu/apply. The application fee is $20 and deadlines are: Fall — Aug 1, Spring — Dec 1, Summer — Apr 28. Need help? Call (508) 754-3400." },
  { pattern: /tuition|cost|how much|price/i, response: "Massachusetts residents pay $189/credit hour. Full-time annual cost is approximately $6,760–$7,160 including fees and books. Financial aid is available — file your FAFSA at studentaid.gov using school code 009743." },
  { pattern: /fafsa|financial aid|grant|scholarship/i, response: "We offer Pell Grants, MassGrant, MassGrant Plus, Federal Loans, Work-Study, and Foundation Scholarships. File your FAFSA by March 1 for priority consideration. School code: 009743." },
  { pattern: /nursing|medical|health|dental|surgical/i, response: "Our Health Sciences programs include Nursing (ADN), Medical Assisting, Dental Hygiene, Surgical Technology, and more. Many qualify for MassGrant Plus funding. Visit our Programs page to learn more." },
  { pattern: /cybersecurity|network|computer|web|data/i, response: "Our IT programs include Cybersecurity (AAS), Network Administration, CIS, Web Development, and Data Analytics — all qualifying for MassGrant Plus. Classes available online and in-person." },
  { pattern: /location|address|campus|where|directions|parking/i, response: "Main Campus: 125 Gamma Drive, Worcester, MA 01605 — (508) 754-3400. Shrewsbury Campus: 47 Harrington Way, Shrewsbury, MA 01545. Free parking available. WRTA routes 20 & 26 serve the main campus." },
  { pattern: /hours|open|close|office/i, response: "Both campuses are open Mon–Thu 7:30 AM–8 PM, Fri 7:30 AM–5 PM. Main Campus is also open Sat 8 AM–1 PM." },
  { pattern: /transfer|university|umass|worcester state|masstransfer/i, response: "Gamma TC participates in MassTransfer — complete an AS degree and transfer to any MA state university with full credit recognition. We have agreements with UMass Lowell, Worcester State, Assumption University, and more." },
  { pattern: /counseling|mental health|stress|wellness/i, response: "Free, confidential counseling is available at our Student Wellness Center (up to 8 sessions/year). Same-day crisis appointments available. Call (508) 754-3470 or visit SS-102." },
  { pattern: /food|hungry|pantry|griffin/i, response: "Griffin's Pantry provides free food assistance to all enrolled students — no appointment or paperwork needed. Just bring your student ID. Located at SS-115, Mon–Thu 9 AM–6 PM." },
  { pattern: /password|portal|canvas|login|email|wifi/i, response: "For IT help: ithelpdesk@gammatc.edu or (508) 754-3490. Portal: portal.gammatc.edu. Canvas: canvas.gammatc.edu. Student email uses Microsoft Outlook 365." },
  { pattern: /military|veteran|gi bill|va|tuition assistance/i, response: "We accept GI Bill (Ch. 33 & 30), Federal Tuition Assistance, MyCAA, and participate in the Yellow Ribbon Program. Contact veterans@gammatc.edu or (508) 754-3445." },
]

const DEFAULT = "Great question! For the most detailed help, call us at (508) 754-3400 or email admissions@gammatc.edu. You can also visit our offices at 125 Gamma Drive, Worcester, MA — Mon–Fri 8 AM–5 PM."

function getResponse(input) {
  for (const { pattern, response } of CANNED) {
    if (pattern.test(input)) return response
  }
  return DEFAULT
}

export default function AriaWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'aria', text: "Hi! I'm ARIA 👋 Ask me about admissions, programs, financial aid, campus services, or IT support." }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function send() {
    const text = input.trim()
    if (!text) return
    const newMessages = [...messages, { from: 'user', text }, { from: 'aria', text: getResponse(text) }]
    setMessages(newMessages)
    setInput('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[360px] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-[#0E7490] text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-lg leading-tight">ARIA</p>
              <p className="text-xs text-teal-100">Gamma Technical College Assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-teal-200 text-xl leading-none">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-[#1B3A6B] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask me anything..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-[#0E7490]"
            />
            <button
              onClick={send}
              className="bg-[#0E7490] text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-[#0891b2] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        title="Chat with ARIA — your Gamma TC assistant"
        className="w-16 h-16 bg-[#0E7490] text-white rounded-full shadow-lg flex flex-col items-center justify-center hover:bg-[#0891b2] transition-colors animate-pulse hover:animate-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="text-[10px] font-bold mt-0.5">ARIA</span>
      </button>
    </div>
  )
}
