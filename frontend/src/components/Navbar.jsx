import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/programs', label: 'Programs' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/financial-aid', label: 'Financial Aid' },
  { to: '/campus-services', label: 'Campus Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-[#1B3A6B] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#F59E0B] rounded-full flex items-center justify-center font-bold text-[#1B3A6B] text-sm">
              GTC
            </div>
            <span className="font-bold text-lg leading-tight hidden sm:block">
              Gamma Technical College
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0E7490] text-white'
                      : 'text-blue-100 hover:bg-[#2a5298] hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="https://gammatc.edu/apply"
              className="ml-2 bg-[#F59E0B] text-[#1B3A6B] px-4 py-2 rounded font-semibold text-sm hover:bg-yellow-400 transition-colors"
            >
              Apply Now
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded text-blue-100 hover:bg-[#2a5298]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-blue-800 bg-[#1B3A6B] pb-3">
          <div className="px-4 pt-2 space-y-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded text-sm font-medium ${
                    isActive ? 'bg-[#0E7490] text-white' : 'text-blue-100 hover:bg-[#2a5298]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="https://gammatc.edu/apply"
              className="block mt-2 bg-[#F59E0B] text-[#1B3A6B] px-3 py-2 rounded font-semibold text-sm text-center"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
