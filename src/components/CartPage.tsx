import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CartPage = () => {
  const { items, getItemCount, getTotal, updateQuantity, removeFromCart, clearCart } = useCart()

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented soon!')
  }

  return (
    <div className="bg-gray-800 text-white p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
            <p className="text-xl text-gray-300">
                {getItemCount() > 0 ? `${getItemCount()} items in your cart` : 'Your cart is empty'}
            </p>
        </header>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-900 rounded-full flex items-center justify-center">
            <ShoppingCart size={48} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold text-lg shadow-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Item</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                      <p className="text-gray-400">${item.price} each</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border-gray-600 hover:border-gray-500"
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border-gray-600 hover:border-gray-500"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-cyan-400">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Items ({getItemCount()})</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-cyan-400">${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-4 text-lg font-semibold"
              disabled={items.length === 0}
            >
              <CreditCard size={20} className="mr-2" />
              Proceed to Checkout
            </Button>

            <Button
              onClick={clearCart}
              variant="outline"
              className="w-full border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white"
              disabled={items.length === 0}
            >
              <Trash2 size={20} className="mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
