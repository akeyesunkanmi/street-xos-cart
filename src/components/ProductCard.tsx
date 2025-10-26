import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-card border border-border rounded-sm overflow-hidden hover:border-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-muted overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4 space-y-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-sm uppercase tracking-wide truncate">
            {product.name}
          </h3>
        </Link>
        <div>
          <span className="font-bold text-lg">₦{product.price.toLocaleString()}</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <Button variant="default" className="w-full">
            Select
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
