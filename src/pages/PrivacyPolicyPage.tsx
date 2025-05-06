
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p>Last Updated: May 6, 2025</p>
            
            <h2>Introduction</h2>
            <p>
              ReuniteHub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our lost and found service.
            </p>
            
            <h2>Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul>
              <li>Contact information (name, email, phone number) when you report a lost or found item</li>
              <li>Details about lost or found items (descriptions, images, locations)</li>
              <li>Usage information and cookies to improve our service</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Connect individuals who have lost items with those who have found them</li>
              <li>Process and manage lost and found reports</li>
              <li>Communicate with you about potential matches</li>
              <li>Improve our website and services</li>
            </ul>
            
            <h2>Information Sharing</h2>
            <p>
              We only share your contact information when you explicitly agree to connect with another user regarding a lost or found item. We do not sell your personal data to third parties.
            </p>
            
            <h2>Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no internet transmission is completely secure, so we cannot guarantee absolute security.
            </p>
            
            <h2>Your Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal information</li>
              <li>Opt out of communications</li>
              <li>Request that your account be deleted</li>
            </ul>
            
            <h2>Children's Privacy</h2>
            <p>
              Our service is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
            
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@reunitehub.com.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
