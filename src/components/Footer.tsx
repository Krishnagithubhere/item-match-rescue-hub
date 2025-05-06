
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg gradient-text">ReuniteHub</h3>
            <p className="text-sm text-muted-foreground">
              Connecting people with their lost belongings since 2025.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/items" className="hover:text-primary transition-colors">Browse Items</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Report</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/report/lost" className="hover:text-primary transition-colors">Report Lost Item</Link></li>
              <li><Link to="/report/found" className="hover:text-primary transition-colors">Report Found Item</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@reunitehub.com" className="hover:text-primary transition-colors">support@reunitehub.com</a></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ReuniteHub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            Made with ❤️ to reunite people with their belongings
          </div>
        </div>
      </div>
    </footer>
  );
}
