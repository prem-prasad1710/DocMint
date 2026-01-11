import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | DocMint',
  description: 'Privacy Policy for DocMint - Learn how we collect, use, and protect your personal information',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Your Privacy Matters</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                At <strong className="text-blue-600 dark:text-blue-400">DocMint</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered document generation platform. Please read this policy carefully.
              </p>
            </div>

            {/* 1. Information We Collect */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white text-lg font-bold">1</span>
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">1.1 Personal Information</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                When you register for an account, we collect:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-slate-700 dark:text-slate-300">Full name and email address</li>
                <li className="text-slate-700 dark:text-slate-300">Password (encrypted and securely stored)</li>
                <li className="text-slate-700 dark:text-slate-300">Company name (optional)</li>
                <li className="text-slate-700 dark:text-slate-300">Payment information (processed securely through Stripe)</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">1.2 Document Data</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                When you generate documents, we collect:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-slate-700 dark:text-slate-300">Document type, industry, and country selections</li>
                <li className="text-slate-700 dark:text-slate-300">Form data entered during document generation</li>
                <li className="text-slate-700 dark:text-slate-300">Generated documents and templates used</li>
                <li className="text-slate-700 dark:text-slate-300">Document creation and modification timestamps</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">1.3 Usage Information</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                We automatically collect:
              </p>
              <ul className="space-y-2">
                <li className="text-slate-700 dark:text-slate-300">IP address and browser type</li>
                <li className="text-slate-700 dark:text-slate-300">Device information and operating system</li>
                <li className="text-slate-700 dark:text-slate-300">Pages visited and features used</li>
                <li className="text-slate-700 dark:text-slate-300">Time and date of visits</li>
              </ul>
            </section>

            {/* 2. How We Use Your Information */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white text-lg font-bold">2</span>
                How We Use Your Information
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="space-y-3">
                <li className="text-slate-700 dark:text-slate-300"><strong>Provide Services:</strong> Generate documents, maintain your account, and process payments</li>
                <li className="text-slate-700 dark:text-slate-300"><strong>Improve Our Platform:</strong> Analyze usage patterns to enhance features and user experience</li>
                <li className="text-slate-700 dark:text-slate-300"><strong>Communication:</strong> Send transactional emails, updates, and customer support responses</li>
                <li className="text-slate-700 dark:text-slate-300"><strong>Security:</strong> Detect fraud, prevent abuse, and protect our users</li>
                <li className="text-slate-700 dark:text-slate-300"><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
                <li className="text-slate-700 dark:text-slate-300"><strong>Marketing:</strong> Send promotional materials (you can opt-out anytime)</li>
              </ul>
            </section>

            {/* 3. Data Sharing and Disclosure */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl text-white text-lg font-bold">3</span>
                Data Sharing and Disclosure
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                We do NOT sell your personal information. We may share your data with:
              </p>
              <ul className="space-y-3">
                <li className="text-slate-700 dark:text-slate-300"><strong>Service Providers:</strong> Stripe (payments), MongoDB (database), Vercel (hosting)</li>
                <li className="text-slate-700 dark:text-slate-300"><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li className="text-slate-700 dark:text-slate-300"><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                <li className="text-slate-700 dark:text-slate-300"><strong>With Your Consent:</strong> Any other sharing will require your explicit permission</li>
              </ul>
            </section>

            {/* 4. Data Security */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white text-lg font-bold">4</span>
                Data Security
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="space-y-3">
                <li className="text-slate-700 dark:text-slate-300">🔒 <strong>Encryption:</strong> All data transmitted using HTTPS/TLS encryption</li>
                <li className="text-slate-700 dark:text-slate-300">🔐 <strong>Password Protection:</strong> Passwords hashed using bcrypt</li>
                <li className="text-slate-700 dark:text-slate-300">🛡️ <strong>Secure Storage:</strong> Data stored in encrypted MongoDB databases</li>
                <li className="text-slate-700 dark:text-slate-300">👁️ <strong>Access Controls:</strong> Strict access limitations and monitoring</li>
                <li className="text-slate-700 dark:text-slate-300">🔍 <strong>Regular Audits:</strong> Periodic security assessments and updates</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 mt-4 text-sm italic">
                Note: While we strive to protect your data, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            {/* 5. Your Rights */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white text-lg font-bold">5</span>
                Your Privacy Rights
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-3">
                <li className="text-slate-700 dark:text-slate-300">✅ <strong>Access:</strong> Request a copy of your personal data</li>
                <li className="text-slate-700 dark:text-slate-300">✏️ <strong>Correction:</strong> Update or correct inaccurate information</li>
                <li className="text-slate-700 dark:text-slate-300">🗑️ <strong>Deletion:</strong> Request deletion of your account and data</li>
                <li className="text-slate-700 dark:text-slate-300">📥 <strong>Data Portability:</strong> Export your data in a machine-readable format</li>
                <li className="text-slate-700 dark:text-slate-300">🚫 <strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li className="text-slate-700 dark:text-slate-300">⚠️ <strong>Object:</strong> Object to processing of your personal data</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@docmint.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">privacy@docmint.com</a>
              </p>
            </section>

            {/* 6. Cookies */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl text-white text-lg font-bold">6</span>
                Cookies and Tracking
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="space-y-2">
                <li className="text-slate-700 dark:text-slate-300">Keep you logged in to your account</li>
                <li className="text-slate-700 dark:text-slate-300">Remember your preferences (e.g., dark mode)</li>
                <li className="text-slate-700 dark:text-slate-300">Analyze site traffic and usage patterns</li>
                <li className="text-slate-700 dark:text-slate-300">Improve our services and user experience</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                You can control cookies through your browser settings. Note that disabling cookies may affect functionality.
              </p>
            </section>

            {/* 7. Data Retention */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white text-lg font-bold">7</span>
                Data Retention
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                We retain your data as long as your account is active or as needed to provide services. When you delete your account:
              </p>
              <ul className="space-y-2">
                <li className="text-slate-700 dark:text-slate-300">Personal data is deleted within 30 days</li>
                <li className="text-slate-700 dark:text-slate-300">Some data may be retained for legal/accounting purposes</li>
                <li className="text-slate-700 dark:text-slate-300">Anonymized usage data may be kept for analytics</li>
              </ul>
            </section>

            {/* 8. Children's Privacy */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl text-white text-lg font-bold">8</span>
                Children's Privacy
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                DocMint is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* 9. International Transfers */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl text-white text-lg font-bold">9</span>
                International Data Transfers
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable data protection laws.
              </p>
            </section>

            {/* 10. Changes to Policy */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl text-white text-lg font-bold">10</span>
                Changes to This Policy
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* Contact Section */}
            <section className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-slate-700 dark:text-slate-300">
                  📧 Email: <a href="mailto:privacy@docmint.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">privacy@docmint.com</a>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  📧 Support: <a href="mailto:support@docmint.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">support@docmint.com</a>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  🌐 Website: <a href="https://doc-mint-six.vercel.app" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">https://doc-mint-six.vercel.app</a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
