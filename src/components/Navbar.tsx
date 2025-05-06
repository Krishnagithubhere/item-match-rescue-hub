
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl gradient-text">ReuniteHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/items" className="text-sm font-medium transition-colors hover:text-primary">
            Browse Items
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            How It Works
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/report/lost">
            <Button variant="outline" className="hidden sm:flex">Report Lost</Button>
          </Link>
          <Link to="/report/found">
            <Button>Report Found</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
