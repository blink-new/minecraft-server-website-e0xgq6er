import { useCart } from '../contexts/CartContext'
import { Plus, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'

const ShopPage = () => {
  const { addToCart, getItemCount } = useCart()

  const shopItems = [
    {
      id: 'diamond-sword',
      name: 'Diamond Sword',
      price: 50,
      image: '/api/placeholder/150/150',
      description: 'A powerful diamond sword for your adventures'
    },
    {
      id: 'enchanted-bow',
      name: 'Enchanted Bow',
      price: 75,
      image: '/api/placeholder/150/150',
      description: 'Bow with special enchantments for better range'
    },
    {
      id: 'netherite-armor',
      name: 'Netherite Armor Set',
      price: 200,
      image: '/api/placeholder/150/150',
      description: 'Complete armor set made from netherite'
    },
    {
      id: 'ender-pearl',
      name: 'Ender Pearl Pack',
      price: 25,
      image: '/api/placeholder/150/150',
      description: 'Pack of 16 ender pearls for teleportation'
    },
    {
      id: 'golden-apple',
      name: 'Golden Apple',
      price: 30,
      image: '/api/placeholder/150/150',
      description: 'Enchanted golden apple for health boost'
    },
    {
      id: 'elytra',
      name: 'Elytra Wings',
      price: 150,
      image: '/api/placeholder/150/150',
      description: 'Wings that let you glide through the sky'
    }
  ]

  return (
    <div className="bg-gray-800 text-white p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Ranks</h1>
            <Link
                to="/cart"
                className="flex items-center gap-3 px-6 py-3 bg-gray-900/60 hover:bg-gray-700/60 rounded-full text-white transition-all duration-300 shadow-lg"
            >
                <ShoppingCart size={24} />
                <span className="text-lg font-semibold">Cart</span>
                {getItemCount() > 0 && (
                <span className="bg-cyan-400 text-slate-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {getItemCount()}
                </span>
                )}
            </Link>
        </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shopItems.map((item) => (
          <Card key={item.id} className="bg-gray-900/50 border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
            <CardHeader>
              <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Item</span>
                </div>
              </div>
              <CardTitle className="text-white">{item.name}</CardTitle>
              <CardDescription className="text-gray-300">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-cyan-400">
                  ${item.price}
                </span>
                <Button
                  onClick={() => addToCart(item)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
                >
                  <Plus size={20} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ShopPage
