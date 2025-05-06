
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-brand-soft-gray to-white py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter animate-fade-in">
                  <span className="gradient-text">Reunite</span> with your lost belongings
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Lost something valuable? Found an item that belongs to someone else? 
                  Our platform connects people to help return lost items to their rightful owners.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Link to="/report/lost">
                    <Button size="lg" className="w-full sm:w-auto">Report a Lost Item</Button>
                  </Link>
                  <Link to="/report/found">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">Report a Found Item</Button>
                  </Link>
                </div>
              </div>
              <div className="lg:order-last animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&q=85&w=2000" 
                  alt="Lost and Found Items" 
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight gradient-text">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our simple process helps reconnect people with their lost items
              </p>
            </div>
            
            <div className="grid gap-12 md:grid-cols-3">
              <div className="group space-y-4 text-center">
                <div className="rounded-full bg-brand-light-purple p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-brand-purple font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold">Report</h3>
                <p className="text-muted-foreground">
                  Submit a detailed report about your lost item or something you've found, including photos and location information.
                </p>
              </div>
              
              <div className="group space-y-4 text-center">
                <div className="rounded-full bg-brand-light-purple p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-brand-purple font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold">Connect</h3>
                <p className="text-muted-foreground">
                  Our platform connects users who have lost items with those who have found them through our search and match system.
                </p>
              </div>
              
              <div className="group space-y-4 text-center">
                <div className="rounded-full bg-brand-light-purple p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-brand-purple font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold">Reunite</h3>
                <p className="text-muted-foreground">
                  Arrange safe meetups or delivery options to reunite lost items with their rightful owners.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="bg-brand-soft-gray py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Browse Lost & Found Items</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Check our database of reported items. Your lost item might be waiting for you, 
                or you might help someone else find what they're looking for.
              </p>
              <div className="pt-4">
                <Link to="/items">
                  <Button size="lg">Browse Items</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
