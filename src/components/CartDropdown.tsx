import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const CartDropdown = () => {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = getTotalItems();

  return (
    <div className="relative">
      {/* Cart Icon Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs min-w-[1.25rem] h-5 flex items-center justify-center p-0"
          >
            {totalItems}
          </Badge>
        )}
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Dropdown */}
          <Card className="absolute right-0 top-full mt-2 w-96 max-h-96 z-50 glass border border-border shadow-lg">
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold">Shopping Cart ({totalItems})</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Cart Items */}
              {items.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-4 border-b border-border/50 last:border-b-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-primary font-semibold">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-6 h-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-6 h-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearCart}
                        className="text-destructive hover:text-destructive"
                      >
                        Clear Cart
                      </Button>
                    </div>
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CartDropdown;