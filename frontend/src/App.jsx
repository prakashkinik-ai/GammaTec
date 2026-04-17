import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AriaWidget from './components/AriaWidget'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Admissions from './pages/Admissions'
import FinancialAid from './pages/FinancialAid'
import CampusServices from './pages/CampusServices'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/admissions" element={<Admissions />} />
                  <Route path="/financial-aid" element={<FinancialAid />} />
                  <Route path="/campus-services" element={<CampusServices />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <AriaWidget />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
