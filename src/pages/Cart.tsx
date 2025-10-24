import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 py-16">
              <h1 className="text-4xl font-black uppercase">Your Cart is Empty</h1>
              <p className="text-muted-foreground">Add some items to get started</p>
              <Button variant="hero" size="lg" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>

          <h1 className="text-4xl md:text-5xl font-black uppercase mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="bg-card border border-border rounded-sm p-4 flex gap-4"
                >
                  <div className="w-24 h-24 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold uppercase">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p className="font-bold">${item.price}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="p-1 hover:bg-accent rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="p-1 hover:bg-accent rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-sm p-6 space-y-6 sticky top-24">
                <h2 className="text-2xl font-black uppercase">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
