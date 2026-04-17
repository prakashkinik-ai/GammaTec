import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1B3A6B] text-blue-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center font-bold text-[#1B3A6B] text-xs">GTC</div>
              <span className="font-bold text-white">Gamma Technical College</span>
            </div>
            <p className="text-sm">Career-focused education for real-world jobs in Worcester, MA and beyond.</p>
            <p className="text-xs mt-3 text-blue-300">Accredited by NECHE</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Academics</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/programs" className="hover:text-[#F59E0B] transition-colors">Programs of Study</Link></li>
              <li><Link to="/admissions" className="hover:text-[#F59E0B] transition-colors">Admissions</Link></li>
              <li><Link to="/financial-aid" className="hover:text-[#F59E0B] transition-colors">Financial Aid</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Student Life</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/campus-services" className="hover:text-[#F59E0B] transition-colors">Campus Services</Link></li>
              <li><Link to="/about" className="hover:text-[#F59E0B] transition-colors">About Gamma TC</Link></li>
              <li><Link to="/contact" className="hover:text-[#F59E0B] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <address className="text-sm not-italic space-y-1">
              <p>125 Gamma Drive</p>
              <p>Worcester, MA 01605</p>
              <p className="mt-2">(508) 754-3400</p>
              <p>admissions@gammatc.edu</p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-300">
          <p>© 2026 Gamma Technical College. All rights reserved. · FAFSA School Code: 009743</p>
          <p>All data is synthetic — for demo purposes only.</p>
        </div>
      </div>
    </footer>
  )
}
