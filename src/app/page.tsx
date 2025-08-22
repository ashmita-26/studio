import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flower, Leaf, Sprout, Trees } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const categories = [
  { name: 'Indoor Plants', href: '/catalog/indoor-plants', icon: Sprout, description: 'Brighten up your living space.' },
  { name: 'Outdoor Plants', href: '/catalog/outdoor-plants', icon: Leaf, description: 'Enhance your garden or patio.' },
  { name: 'Flowering Plants', href: '/catalog/flowering-plants', icon: Flower, description: 'Add a splash of color.' },
  { name: 'Trees & Shrubs', href: '/catalog/trees-shrubs', icon: Trees, description: 'Create shade and structure.' },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative py-20 md:py-32 bg-primary/20">
          <div className="absolute inset-0">
             <Image
                src="https://i.ibb.co/Pggx3fT/karuna-nursery-garden-parassala-thiruvananthapuram-plant-nurseries-xghx6iww89.jpg"
                alt="Lush green plants in a nursery"
                data-ai-hint="lush green plants"
                fill
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary-foreground mb-4">Welcome to Verdant Vista</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8">
              Discover a world of green. From vibrant indoor plants to majestic outdoor trees, find the perfect addition to your home and garden.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/catalog">Explore Our Collection <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

        <section id="categories" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Browse Our Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <Link href={category.href} key={category.name} className="group">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 bg-card">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                       <category.icon className="w-8 h-8 text-accent" />
                       <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Your Oasis of Greenery</h2>
                <p className="text-lg text-foreground/80 mb-4">
                  At Verdant Vista, we're passionate about plants. Our nursery is a sanctuary for plant lovers, offering a diverse selection of high-quality flora. We believe in the power of plants to transform spaces and enrich lives.
                </p>
                <p className="text-foreground/80">
                  Our expert team is always on hand to provide advice, from choosing the right plant to helping it thrive in its new home. We're more than just a nursery; we're a community of green thumbs.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                 <Image src="https://placehold.co/600x400.png" alt="Happy customer with a plant" data-ai-hint="smiling person plant" width={600} height={400} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
