import { Link } from "react-router-dom";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card border border-border rounded-sm overflow-hidden hover:border-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-sm uppercase tracking-wide truncate">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${product.price}</span>
          <span className="text-xs text-muted-foreground">{product.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
