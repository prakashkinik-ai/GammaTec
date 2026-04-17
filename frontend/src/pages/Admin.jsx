import { useState, useEffect, useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const MAX_LOG = 5

function StatusBadge({ status }) {
  const colors = { Open: 'bg-red-100 text-red-700', 'In Progress': 'bg-yellow-100 text-yellow-700', Resolved: 'bg-green-100 text-green-700' }
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>
}

function PriorityBadge({ priority }) {
  const colors = { High: 'bg-red-50 text-red-600', Medium: 'bg-orange-50 text-orange-600', Low: 'bg-blue-50 text-blue-600' }
  return <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors[priority] || ''}`}>{priority}</span>
}

export default function Admin() {
  const [students, setStudents] = useState([])
  const [tickets, setTickets] = useState([])
  const [stats, setStats] = useState(null)
  const [search, setSearch] = useState('')
  const [ticketFilter, setTicketFilter] = useState('All')
  const [editingPhone, setEditingPhone] = useState(null)
  const [phoneValue, setPhoneValue] = useState('')
  const [log, setLog] = useState([])
  const [tab, setTab] = useState('students')

  function addLog(method, endpoint, status) {
    setLog(prev => [{ method, endpoint, status, ts: new Date().toLocaleTimeString() }, ...prev].slice(0, MAX_LOG))
  }

  const apiFetch = useCallback(async (endpoint, options = {}) => {
    const method = options.method || 'GET'
    try {
      const res = await fetch(`${API_URL}${endpoint}`, { headers: { 'Content-Type': 'application/json' }, ...options })
      addLog(method, endpoint, res.status)
      return res.ok ? res.json() : null
    } catch (err) {
      addLog(method, endpoint, 'ERR')
      return null
    }
  }, [])

  const loadData = useCallback(async () => {
    const [s, t, st] = await Promise.all([
      apiFetch('/customers?limit=100'),
      apiFetch('/tickets'),
      apiFetch('/stats'),
    ])
    if (s) setStudents(s)
    if (t) setTickets(t)
    if (st) setStats(st)
  }, [apiFetch])

  useEffect(() => { loadData() }, [loadData])

  const filtered = students.filter(s => {
    const q = search.toLowerCase()
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.phone.includes(q) || s.id.toLowerCase().includes(q)
    const matchTicket = ticketFilter === 'All' || (ticketFilter === 'With Tickets' ? s.ticket : !s.ticket) || s.ticket?.status === ticketFilter
    return matchSearch && matchTicket
  })

  async function savePhone(id) {
    const data = await apiFetch(`/customers/${id}/phone`, { method: 'PATCH', body: JSON.stringify({ phone: phoneValue }) })
    if (data?.success) {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, phone: phoneValue } : s))
      setEditingPhone(null)
    }
  }

  async function updateTicketStatus(ticketId, status) {
    const data = await apiFetch(`/tickets/${ticketId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
    if (data?.success) {
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t))
      setStudents(prev => prev.map(s => s.ticket?.id === ticketId ? { ...s, ticket: { ...s.ticket, status } } : s))
      await apiFetch('/stats').then(st => { if (st) setStats(st) })
    }
  }

  const ticketsByStatus = (status) => tickets.filter(t => t.status === status)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1B3A6B] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center font-bold text-[#1B3A6B] text-xs">GTC</div>
          <div>
            <p className="font-bold leading-tight">Gamma TC Admin</p>
            <p className="text-xs text-blue-300">ARIA CRM Dashboard</p>
          </div>
        </div>
        <button onClick={loadData} className="text-xs bg-[#0E7490] hover:bg-teal-600 px-3 py-1.5 rounded font-medium transition-colors">↻ Refresh</button>
      </header>

      {/* Stats bar */}
      {stats && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              ['Total Students', stats.totalStudents, 'text-[#1B3A6B]'],
              ['Open Tickets', stats.tickets.open, 'text-red-600'],
              ['In Progress', stats.tickets.inProgress, 'text-yellow-600'],
              ['Resolved', stats.tickets.resolved, 'text-green-600'],
              ['High Priority', stats.priority.high, 'text-red-500'],
              ['Full-Time', stats.fullTime, 'text-[#0E7490]'],
            ].map(([label, val, cls]) => (
              <div key={label} className="text-center">
                <p className={`text-2xl font-bold ${cls}`}>{val}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-7xl mx-auto flex gap-6">
          {['students', 'tickets'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`py-3 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-[#0E7490] text-[#0E7490]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
              {t === 'students' ? 'Student Records' : 'Ticket Board'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {tab === 'students' && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Search by name, phone, or ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0E7490] w-72"
              />
              <select value={ticketFilter} onChange={e => setTicketFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0E7490]">
                {['All', 'With Tickets', 'Open', 'In Progress', 'Resolved'].map(f => <option key={f}>{f}</option>)}
              </select>
              <span className="text-xs text-gray-400 self-center">{filtered.length} records</span>
            </div>

            {/* Student Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Program</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ticket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(s => (
                      <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-[#1B3A6B]">{s.name}</p>
                            <p className="text-xs text-gray-400">{s.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {editingPhone === s.id ? (
                            <div className="flex gap-1">
                              <input
                                type="text"
                                value={phoneValue}
                                onChange={e => setPhoneValue(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') savePhone(s.id); if (e.key === 'Escape') setEditingPhone(null) }}
                                className="border border-[#0E7490] rounded px-2 py-1 text-xs w-36 focus:outline-none"
                                autoFocus
                              />
                              <button onClick={() => savePhone(s.id)} className="text-xs bg-[#0E7490] text-white px-2 py-1 rounded hover:bg-teal-600">✓</button>
                              <button onClick={() => setEditingPhone(null)} className="text-xs text-gray-400 hover:text-gray-600 px-1">✕</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => { setEditingPhone(s.id); setPhoneValue(s.phone) }}
                              className="text-[#0E7490] hover:underline font-mono text-xs"
                              title="Click to edit phone"
                            >
                              {s.phone}
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 max-w-[180px]">
                          <span className="line-clamp-2">{s.program}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.enrollmentStatus === 'Full-Time' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                            {s.enrollmentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {s.ticket ? (
                            <div>
                              <div className="flex items-center gap-1 mb-0.5">
                                <span className="font-mono text-xs text-gray-400">{s.ticket.id}</span>
                                <StatusBadge status={s.ticket.status} />
                                <PriorityBadge priority={s.ticket.priority} />
                              </div>
                              <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{s.ticket.subject}</p>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'tickets' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Open', 'In Progress', 'Resolved'].map(status => (
              <div key={status} className="space-y-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={status} />
                  <span className="text-sm font-semibold text-gray-700">{ticketsByStatus(status).length}</span>
                </div>
                {ticketsByStatus(status).map(t => (
                  <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs text-gray-400">{t.id}</span>
                      <PriorityBadge priority={t.priority} />
                    </div>
                    <p className="text-sm font-medium text-[#1B3A6B] mb-1 leading-snug">{t.subject}</p>
                    {t.student && <p className="text-xs text-gray-400 mb-2">{t.student.name} · {t.student.program?.split('(')[0].trim()}</p>}
                    <p className="text-xs text-[#0E7490]">{t.type}</p>
                    {/* Quick status move buttons */}
                    <div className="flex gap-1 mt-3">
                      {['Open', 'In Progress', 'Resolved'].filter(s => s !== status).map(s => (
                        <button
                          key={s}
                          onClick={() => updateTicketStatus(t.id, s)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition-colors"
                        >
                          → {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* API Log */}
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-xs text-gray-400 font-mono mb-3 uppercase tracking-widest">API Log — Last {MAX_LOG} Calls</p>
          {log.length === 0 ? (
            <p className="text-xs text-gray-600 font-mono">No calls yet. Load page to see logs.</p>
          ) : (
            <div className="space-y-1">
              {log.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-mono">
                  <span className={`w-16 text-center py-0.5 rounded text-xs font-bold ${entry.method === 'GET' ? 'bg-blue-900 text-blue-300' : 'bg-orange-900 text-orange-300'}`}>{entry.method}</span>
                  <span className="text-gray-300 flex-1">{entry.endpoint}</span>
                  <span className={`font-bold ${String(entry.status).startsWith('2') ? 'text-green-400' : entry.status === 'ERR' ? 'text-red-400' : 'text-yellow-400'}`}>{entry.status}</span>
                  <span className="text-gray-500">{entry.ts}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
