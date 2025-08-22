
"use client";

import { notFound } from "next/navigation";
import { categories, allPlants } from "@/lib/placeholder-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category: categorySlug } = params;

  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }
  
  const plantsInCategory = allPlants.filter(p => p.categorySlug === category.slug);

  return (
    <div>
      <h1 className="text-4xl font-headline font-bold mb-2">{category.name}</h1>
      <p className="text-lg text-foreground/70 mb-8">{category.description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantsInCategory.map((plant) => (
          <Card key={plant.id} className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 bg-card">
            <CardHeader className="p-0">
               <Link href={`/catalog/${plant.categorySlug}/${plant.id}`} className="group">
                <div className="aspect-square relative">
                  <Image 
                    src={plant.imageUrl} 
                    alt={plant.name} 
                    fill
                    className="object-cover"
                    data-ai-hint={plant.dataAiHint}
                  />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="font-headline text-xl mb-1">
                <Link href={`/catalog/${plant.categorySlug}/${plant.id}`}>{plant.name}</Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{plant.type}</p>
               <p className="font-semibold text-lg text-accent mt-2">₹{plant.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Button asChild className="w-full">
                  <Link href={`/catalog/${plant.categorySlug}/${plant.id}`}>Shop Now</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
