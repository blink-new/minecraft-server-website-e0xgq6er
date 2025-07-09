import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingCart, Gem, Star } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/shop', icon: ShoppingCart, label: 'Ranks' }, // Assuming Ranks is the shop
    { href: '/coins', icon: Gem, label: 'Coins' }, // Placeholder for coins page
  ]

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-6 border-r border-gray-700">
      <div className="flex items-center gap-4 mb-10">
        <img src="/avatar.png" alt="Guest Avatar" className="w-12 h-12 rounded-full bg-gray-700" />
        <div>
          <p className="font-semibold text-lg">Guest</p>
          <button className="text-sm text-cyan-400 hover:underline">Login</button>
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400 border-l-4 border-cyan-500'
                  : 'hover:bg-gray-800'
              }`}
            >
              <item.icon size={22} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-cyan-400">Top Customer</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <Star size={24} className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-400">No top customer yet.</p>
              <p className="text-sm text-gray-500">Be the first to shine!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
