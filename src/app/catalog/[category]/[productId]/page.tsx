
"use client";

import { notFound } from "next/navigation";
import { allPlants } from "@/lib/placeholder-data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CareTipsGenerator from "@/components/care-tips-generator";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ProductPage({ params }: { params: { productId: string, category: string } }) {
  const { toast } = useToast();
  const { productId, category } = params;

  const plant = allPlants.find((p) => p.id === productId);

  if (!plant) {
    notFound();
  }

  const handleShopNow = () => {
    toast({
      title: "Thanks for your interest!",
      description: "This is a demo. Shopping cart is not implemented.",
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
            <Button size="lg" className="w-full" onClick={handleShopNow}>Shop Now</Button>
          </div>

          <div className="mt-auto">
             <CareTipsGenerator plantName={plant.name} plantType={plant.type} environment={plant.environment} />
          </div>
        </div>
      </div>
    </div>
  );
}
