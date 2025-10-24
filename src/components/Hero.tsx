import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 space-y-8">
        <div className="space-y-4">
          <div className="inline-block text-7xl md:text-9xl font-black tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
            XOS
          </div>
          <h1 className="text-2xl md:text-4xl font-light tracking-[0.3em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Official Scepture
          </h1>
        </div>
        
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            All Bills On God
          </h2>
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
    </section>
  );
};

export default Hero;
