
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p>Last Updated: May 6, 2025</p>
            
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using ReuniteHub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with these Terms, you must not use our service.
            </p>
            
            <h2>Description of Service</h2>
            <p>
              ReuniteHub provides a platform for users to report lost items and register found items in an effort to reunite owners with their belongings. We do not guarantee that items will be found or returned.
            </p>
            
            <h2>User Responsibilities</h2>
            <p>As a user of ReuniteHub, you agree to:</p>
            <ul>
              <li>Provide accurate and truthful information when reporting lost or found items</li>
              <li>Not use our service for any illegal or unauthorized purpose</li>
              <li>Meet in safe, public locations when arranging to return or collect items</li>
              <li>Verify ownership before returning valuable items</li>
              <li>Not post offensive, harmful, or inappropriate content</li>
            </ul>
            
            <h2>Content Ownership</h2>
            <p>
              You retain all ownership rights to content you submit to ReuniteHub. By posting content, you grant us a non-exclusive, royalty-free license to use, display, and distribute your content in connection with our service.
            </p>
            
            <h2>Disclaimers</h2>
            <p>
              ReuniteHub is provided "as is" without warranties of any kind. We are not responsible for the conduct of users, the accuracy of lost and found reports, or successful returns of items.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, ReuniteHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our service.
            </p>
            
            <h2>Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account for violations of these Terms or for any other reason at our sole discretion.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the State of California without regard to its conflict of law provisions.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We may modify these Terms at any time by posting updated Terms on our website. Your continued use of ReuniteHub after changes constitutes acceptance of the modified Terms.
            </p>
            
            <h2>Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at terms@reunitehub.com.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
