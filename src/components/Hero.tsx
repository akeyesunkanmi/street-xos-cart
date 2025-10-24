import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Moving images background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 overflow-hidden">
        <div className="flex gap-8 animate-[scroll_20s_linear_infinite]">
          <img src={product1} alt="" className="h-64 w-auto object-cover grayscale" />
          <img src={product2} alt="" className="h-64 w-auto object-cover grayscale" />
          <img src={product1} alt="" className="h-64 w-auto object-cover grayscale" />
          <img src={product2} alt="" className="h-64 w-auto object-cover grayscale" />
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 space-y-8">
        <div className="space-y-4">
          <div className="inline-block text-7xl md:text-9xl font-playfair font-black tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
            XOS
          </div>
          <h1 className="text-2xl md:text-4xl font-playfair font-light tracking-[0.3em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            XO Savage Collections
          </h1>
        </div>
        
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <p className="text-lg md:text-xl text-muted-foreground tracking-wide">
            Exclusive Collection
          </p>
        </div>

        <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button variant="hero" size="xl" onClick={scrollToProducts}>
            Shop The Collection
          </Button>
        </div>

        <button
          onClick={scrollToProducts}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll to products"
        >
          <ArrowDown className="h-8 w-8" />
        </button>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
