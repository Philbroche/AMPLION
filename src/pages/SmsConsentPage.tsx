import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function SmsConsentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'SMS Consent Script — Amplion';

    const description =
      "Verbal consent script and documentation for Amplion's Review Request Automation SMS service, per CTIA and TCPA guidelines.";
    let meta = document.querySelector('meta[name="description"]');
    const originalContent = meta?.getAttribute('content') ?? null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    return () => {
      if (originalContent !== null) meta!.setAttribute('content', originalContent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-4xl font-bold text-gray-900 mb-2">SMS Consent Script</h1>

        <p className="text-sm text-gray-500 mb-6">Last updated: May 11, 2026</p>

        <p className="text-gray-700 leading-relaxed mb-8">
          This page documents the verbal consent process used by Amplion's agency clients (home
          service contractors) when collecting permission to send Review Request Automation SMS
          messages. It is published for compliance and transparency purposes, in accordance with
          CTIA messaging principles and TCPA / Quebec Law 25 requirements.
        </p>

        <aside
          aria-label="Compliance Documents"
          className="mb-10 rounded-lg border border-cyan-300 bg-cyan-50 p-5"
        >
          <h2 className="text-base font-semibold text-gray-900 mb-3">Compliance Documents</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy-policy" className="text-cyan-700 hover:underline font-medium">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-cyan-700 hover:underline font-medium">
                Terms of Service
              </Link>
            </li>
            <li>
              <span className="text-gray-700 font-medium">SMS Consent Script</span>
              <span className="text-gray-500"> (this page)</span>
            </li>
          </ul>
        </aside>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Verbal Consent Script</h2>
            <p>
              At the conclusion of a completed service visit, or during the post-service phone
              confirmation call, the technician or office staff member asks the customer the
              following:
            </p>
            <blockquote className="border-l-4 border-cyan-500 bg-gray-50 italic p-4 mt-3 rounded-r">
              "Before we wrap up, we'd love to send you a single text message in the next couple of
              hours from [Contractor Business Name] with a link to leave a Google review for the
              service we just completed. You will receive one (1) message per service visit.
              Standard message and data rates may apply. You can reply STOP at any time to opt out,
              or reply HELP for assistance. Is it okay if we text you at this number?"
            </blockquote>
            <p className="mt-3">
              The customer must respond with a verbal affirmative ("yes", "sure", "go ahead", or
              equivalent) before any SMS is queued. Anything other than an affirmative — including
              silence, hesitation, or refusal — is treated as a non-consent and no message is sent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Example Conversation</h2>
            <div className="bg-gray-50 rounded-lg p-4 mt-3 space-y-2">
              <p>
                <strong className="text-gray-900">Technician:</strong>{' '}
                <span className="text-gray-600">[reads the consent script above]</span>
              </p>
              <p>
                <strong className="text-gray-900">Customer:</strong> "Yes, that's fine."
              </p>
              <p>
                <strong className="text-gray-900">Technician:</strong> "Great — you'll get our text
                within the next two hours. Thanks again for choosing us!"
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How Consent Is Recorded</h2>
            <p>
              The technician or staff member records the verbal "yes" in our CRM (Airtable,
              accessed via an internal n8n workflow). Each consent record includes:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Timestamp of consent</li>
              <li>Technician / staff member name</li>
              <li>Customer name</li>
              <li>Customer phone number</li>
              <li>Service ticket ID</li>
              <li>Contractor business name</li>
            </ul>
            <p className="mt-3">
              Records are retained for the duration of the customer–contractor relationship plus
              two (2) years, for compliance audit purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Confirmation Message (sent within 2 hours of consent)
            </h2>
            <p>The first SMS sent after consent is collected reads:</p>
            <blockquote className="border-l-4 border-cyan-500 bg-gray-50 italic p-4 mt-3 rounded-r">
              "[Contractor Business Name]: Thanks for letting us help you today! Please consider
              leaving us a quick Google review: https://[review-link]
              <br />
              1 msg per service. Msg &amp; data rates may apply.
              <br />
              Reply STOP to opt out, HELP for help."
            </blockquote>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. How to Opt Out</h2>
            <p>Customers may opt out at any time through any of the following:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Reply <strong>STOP</strong> to any received SMS — processed immediately by our SMS
                carrier (Twilio) and applied across all future messages from our system.
              </li>
              <li>
                Email{' '}
                <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
                  Pbrochu@amplion.dev
                </a>{' '}
                requesting removal.
              </li>
              <li>Verbally request removal during any service interaction with the contractor.</li>
            </ul>
            <p className="mt-3">
              Customers may reply <strong>HELP</strong> to any message to receive a help response
              identifying the sender and providing contact information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Mobile Carriers</h2>
            <p>Mobile carriers are not liable for delayed or undelivered messages.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact</h2>
            <p>
              For questions regarding this consent process, SMS records, or to exercise privacy
              rights under Quebec Law 25 / PIPEDA or applicable U.S. consumer protection laws:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm mt-3">
              <p><strong>Phillip Brochu</strong> — Privacy Officer</p>
              <p>Amplion</p>
              <p>629 Rue Bagot, Québec, QC G1N 2B2, Canada</p>
              <p>
                <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
                  Pbrochu@amplion.dev
                </a>
              </p>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link to="/" className="text-cyan-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
