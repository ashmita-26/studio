"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function CartPage() {
  const { cart, removeItem, updateQuantity } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Example 8% tax
  const total = subtotal + tax;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Your Shopping Cart</h1>
        {cart.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
               <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                 <ShoppingCart className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="mt-4">Your cart is empty</CardTitle>
              <CardDescription>Looks like you haven't added anything to your cart yet.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/catalog">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint}/>
                        </div>
                        <div className="flex-grow">
                          <Link href={`/catalog/${item.categorySlug}/${item.id}`} className="font-semibold hover:underline">{item.name}</Link>
                          <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                           <button onClick={() => removeItem(item.id)} className="text-xs text-destructive hover:underline mt-1 flex items-center gap-1">
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} className="h-8 w-14 text-center" />
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-semibold w-20 text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (8%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-4">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full">Proceed to Checkout</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
