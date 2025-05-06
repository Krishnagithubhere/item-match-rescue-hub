
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 gradient-text">How ReuniteHub Works</h1>
          
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="text-muted-foreground">
                ReuniteHub's mission is simple: to help reunite people with their lost belongings through 
                a community-driven platform. We believe in the power of community and that people genuinely 
                want to help each other. Our platform makes it easy for finders to connect with owners, 
                increasing the chances of successful returns.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Reporting a Lost Item</h2>
              <p className="text-muted-foreground">
                If you've lost something valuable, here's how to use our platform effectively:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Click on the "Report Lost" button from any page of our website.</li>
                <li>Fill in the detailed form about your item, including its description, when and where you lost it, and add photos if available.</li>
                <li>Submit your contact information (your email will not be publicly displayed).</li>
                <li>Review your report and submit it to our database.</li>
                <li>Once submitted, your report will be searchable by other users who may have found your item.</li>
                <li>You'll receive email notifications if someone claims to have found your item.</li>
              </ol>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Reporting a Found Item</h2>
              <p className="text-muted-foreground">
                If you've found an item and want to help return it to its owner:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Click on the "Report Found" button from any page.</li>
                <li>Provide details about the item including where and when you found it.</li>
                <li>Upload a photo if possible (but be careful not to share identifying information for wallets, IDs, etc.).</li>
                <li>Submit your contact details so the owner can reach you.</li>
                <li>You'll be notified if someone claims ownership of the item you found.</li>
              </ol>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Making a Connection</h2>
              <p className="text-muted-foreground">
                When a potential match is found:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>The owner of the lost item will receive a notification about a potential match.</li>
                <li>They can review the finder's report to confirm if it's their item.</li>
                <li>If it's a match, they can use our secure messaging system to contact the finder.</li>
                <li>Both parties can arrange a safe public location to meet or discuss delivery options.</li>
                <li>After the return, both parties can mark the item as "returned" in our system.</li>
              </ol>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Safety Guidelines</h2>
              <p className="text-muted-foreground">
                We take the safety of our users seriously. Here are some guidelines to follow:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Always meet in a public location during daylight hours to exchange items.</li>
                <li>Consider bringing a friend or family member with you for added security.</li>
                <li>Ask for specific details about the item that weren't mentioned in the public posting to verify ownership.</li>
                <li>For valuable items, consider requesting identification or proof of ownership.</li>
                <li>Trust your instincts – if something feels wrong, don't proceed with the exchange.</li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Privacy Protection</h2>
              <p className="text-muted-foreground">
                We protect your privacy by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Never publicly displaying your full contact information.</li>
                <li>Using a secure messaging system for initial communications.</li>
                <li>Giving you control over what details you share about the lost or found item.</li>
                <li>Allowing you to delete your reports once an item has been returned.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
