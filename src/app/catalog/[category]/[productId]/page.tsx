import { notFound } from "next/navigation";
import { allPlants } from "@/lib/placeholder-data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CareTipsGenerator from "@/components/care-tips-generator";

export function generateStaticParams() {
    return allPlants.map((plant) => ({
      category: plant.categorySlug,
      productId: plant.id,
    }));
}

export default function ProductPage({ params }: { params: { productId: string } }) {
  const plant = allPlants.find((p) => p.id === params.productId);

  if (!plant) {
    notFound();
  }

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
          <p className="text-3xl font-semibold text-accent mb-6">${plant.price.toFixed(2)}</p>
          <p className="text-foreground/80 leading-relaxed mb-8">{plant.description}</p>
          
          <div className="mt-auto">
             <CareTipsGenerator plantName={plant.name} plantType={plant.type} environment={plant.environment} />
          </div>
        </div>
      </div>
    </div>
  );
}
