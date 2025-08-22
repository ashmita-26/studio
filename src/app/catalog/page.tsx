import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/lib/placeholder-data";
import Link from "next/link";

export default function CatalogPage() {
  return (
    <div>
      <h1 className="text-4xl font-headline font-bold mb-2">Our Collection</h1>
      <p className="text-lg text-foreground/70 mb-8">
        Find the perfect plant for your space by exploring our curated categories.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link href={`/catalog/${category.slug}`} key={category.id} className="group">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 bg-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <category.icon className="h-10 w-10 text-accent" />
                  <div>
                    <CardTitle className="text-2xl font-headline">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
