import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/")}>Return to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    addToCart(product, selectedSize, selectedColor);
    toast.success("Added to cart");
  };

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
            Back to Shop
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square bg-muted rounded-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  {product.category}
                </p>
                <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold">${product.price}</p>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 border rounded-sm font-medium transition-all ${
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-3">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 border rounded-sm font-medium transition-all ${
                        selectedColor === color
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
