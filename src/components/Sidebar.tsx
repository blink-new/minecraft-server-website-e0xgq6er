import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingCart, Gem, Star, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useMinecraftProfile } from '../hooks/useMinecraftProfile'

const Sidebar = () => {
  const location = useLocation()
  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/shop', icon: ShoppingCart, label: 'Ranks' },
    { href: '/coins', icon: Gem, label: 'Coins' },
  ]

  // Minecraft login state
  const profile = useMinecraftProfile()
  const [input, setInput] = useState("")

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-6 border-r border-gray-700 min-h-screen">
      <div className="flex flex-col items-center gap-4 mb-10">
        {profile.ign ? (
          <>
            <img
              src={profile.skinUrl}
              alt={profile.ign + "'s skin"}
              className="w-16 h-16 rounded-lg bg-gray-700 border-2 border-cyan-400 shadow"
              onError={e => (e.currentTarget.src = '/avatar.png')}
            />
            <div className="text-center">
              <p className="font-semibold text-lg break-all">{profile.ign}</p>
              <button
                className="text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1 mt-1"
                onClick={profile.logout}
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <img src="/avatar.png" alt="Guest Avatar" className="w-16 h-16 rounded-lg bg-gray-700" />
            <form
              className="w-full flex flex-col gap-2"
              onSubmit={e => {
                e.preventDefault()
                if (input.trim()) profile.fetchSkin(input.trim())
              }}
            >
              <input
                type="text"
                placeholder="Enter Minecraft IGN"
                className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 text-sm"
                value={input}
                onChange={e => setInput(e.target.value)}
                autoComplete="username"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-white rounded px-3 py-1 text-sm font-semibold transition"
                disabled={profile.loading}
              >
                {profile.loading ? 'Loading...' : 'Login'}
              </button>
              {profile.error && <span className="text-xs text-red-400">{profile.error}</span>}
            </form>
          </>
        )}
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
