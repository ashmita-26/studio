"use client";

import { notFound } from "next/navigation";
import { allPlants } from "@/lib/placeholder-data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CareTipsGenerator from "@/components/care-tips-generator";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export default function ProductPage({ params }: { params: { productId: string, category: string } }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const plant = allPlants.find((p) => p.id === params.productId);

  if (!plant) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(plant);
    toast({
      title: "Added to cart",
      description: `${plant.name} has been added to your cart.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-card">
          <Image
            src={plant.imageUrl}
            alt={plant.name}
            width={600}
            height={600}
            className="object-cover w-full h-full"
            data-ai-hint={plant.dataAiHint}
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">{plant.name}</h1>
          <div className="mb-4">
            <Badge variant="secondary">{plant.type}</Badge>
          </div>
          <p className="text-3xl font-semibold text-accent mb-6">₹{plant.price.toFixed(2)}</p>
          <p className="text-foreground/80 leading-relaxed mb-8">{plant.description}</p>
          
          <div className="flex gap-4 mb-6">
            <Button size="lg" className="w-full" onClick={handleAddToCart}>Shop Now</Button>
            <Button size="lg" variant="outline" className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          <div className="mt-auto">
             <CareTipsGenerator plantName={plant.name} plantType={plant.type} environment={plant.environment} />
          </div>
        </div>
      </div>
    </div>
  );
}
