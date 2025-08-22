import { notFound } from "next/navigation";
import { categories, allPlants } from "@/lib/placeholder-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories.find((c) => c.slug === params.category);

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
          <Link href={`/catalog/${category.slug}/${plant.id}`} key={plant.id} className="group">
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 bg-card">
              <CardHeader className="p-0">
                <div className="aspect-square relative">
                  <Image 
                    src={plant.imageUrl} 
                    alt={plant.name} 
                    fill
                    className="object-cover"
                    data-ai-hint={plant.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="font-headline text-xl mb-1">{plant.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plant.type}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <p className="font-semibold text-lg text-accent">₹{plant.price.toFixed(2)}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
