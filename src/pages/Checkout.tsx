import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateWhatsAppMessage = () => {
    let message = `*New Order from XOS*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}\n\n`;
    message += `*Order Items:*\n`;
    
    cart.forEach((item, index) => {
      message += `\n${index + 1}. ${item.name}\n`;
      message += `   Size: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total: $${getCartTotal().toFixed(2)}*`;
    
    return encodeURIComponent(message);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Generate WhatsApp message
    const message = generateWhatsAppMessage();
    const whatsappNumber = "1234567890"; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Clear cart and redirect
    clearCart();
    toast.success("Redirecting to WhatsApp...");
    window.open(whatsappUrl, "_blank");
    
    // Navigate back to home after a short delay
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 py-16">
              <h1 className="text-4xl font-black uppercase">Your Cart is Empty</h1>
              <p className="text-muted-foreground">Add some items before checking out</p>
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
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/cart")}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>

          <h1 className="text-4xl md:text-5xl font-black uppercase mb-8">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Billing Form */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="text-2xl font-black uppercase mb-6">Billing Details</h2>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St, City, State, ZIP"
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full mt-6">
                    Place Order via WhatsApp
                  </Button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-sm p-6">
                <h2 className="text-2xl font-black uppercase mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 pb-4 border-b border-border last:border-0"
                    >
                      <div className="w-16 h-16 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-bold text-sm uppercase">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize} | {item.selectedColor} | Qty: {item.quantity}
                        </p>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-accent border border-border rounded-sm p-4">
                <p className="text-sm text-muted-foreground">
                  * Shipping costs will be calculated and confirmed via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
