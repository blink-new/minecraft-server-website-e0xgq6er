import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Gem, Star, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MinecraftProfile {
  username: string;
  uuid: string;
  avatar: string;
}

const Sidebar = () => {
  const location = useLocation();
  const { user, login, logout, isAuthenticated, updateMinecraftUsername } = useAuth();
  const [profile, setProfile] = useState<MinecraftProfile | null>(null);
  const [minecraftUsername, setMinecraftUsername] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.metadata.minecraftUsername) {
        try {
          const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${user.metadata.minecraftUsername}`);
          if (response.ok) {
            const data = await response.json();
            setProfile({
              username: data.name,
              uuid: data.id,
              avatar: `https://crafatar.com/avatars/${data.id}?overlay`,
            });
          }
        } catch (error) {
          console.error("Failed to fetch Minecraft profile", error);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleUsernameUpdate = () => {
    if (minecraftUsername) {
      updateMinecraftUsername(minecraftUsername);
    }
  };

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/shop', icon: ShoppingCart, label: 'Ranks' },
    { href: '/coins', icon: Gem, label: 'Coins' },
  ];

  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col p-6 border-r border-gray-700">
      <div className="flex items-center gap-4 mb-8">
        <img 
          src={profile?.avatar || '/avatar.png'} 
          alt="User Avatar" 
          className="w-16 h-16 rounded-full bg-gray-700 object-cover"
        />
        <div>
          {isAuthenticated && user ? (
            <>
              <p className="font-semibold text-lg">Welcome back,</p>
              <p className="text-cyan-400 text-xl">{profile?.username || user.email}</p>
            </>
          ) : (
            <p className="font-semibold text-xl">Guest</p>
          )}
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400 border-l-4 border-cyan-500'
                  : 'hover:bg-gray-800'
              }`}
            >
              <item.icon size={24} />
              <span className="font-medium text-lg">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="bg-gray-800/50 p-4 rounded-lg my-8">
        <h3 className="font-bold text-lg mb-3 text-cyan-400">Top Customer</h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <Star size={28} className="text-gray-500" />
          </div>
          <div>
            <p className="text-gray-400">No top customer yet.</p>
            <p className="text-sm text-gray-500">Be the first to shine!</p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        {isAuthenticated ? (
          <>
            {!user?.metadata.minecraftUsername && (
              <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">Link your Minecraft account:</p>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Minecraft Username"
                    value={minecraftUsername}
                    onChange={(e) => setMinecraftUsername(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                  />
                  <Button onClick={handleUsernameUpdate} className="bg-cyan-600 hover:bg-cyan-500">Set</Button>
                </div>
              </div>
            )}
            <Button onClick={logout} className="w-full flex items-center justify-center gap-3 bg-red-600/80 hover:bg-red-600">
              <LogOut size={20} />
              <span className="font-semibold">Logout</span>
            </Button>
          </>
        ) : (
          <Button onClick={login} className="w-full bg-cyan-600 hover:bg-cyan-500">
            Login / Register
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
