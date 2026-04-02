import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EN = () => (
  <div className="space-y-8 text-gray-700 leading-relaxed">

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Who We Are</h2>
      <p>
        Amplion ("we", "us", or "our") is an AI automation and web development agency serving
        businesses across North America. We operate the website at <strong>amplion.dev</strong> and
        can be reached at{' '}
        <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
          Pbrochu@amplion.dev
        </a>.
      </p>
      <p className="mt-3">
        This Privacy Policy explains what personal information we collect, how we use it, and your
        rights. Our primary legal obligations are governed by Quebec's{' '}
        <em>Act respecting the protection of personal information in the private sector</em> (Law 25 /
        Bill 64). Canada's federal <em>Personal Information Protection and Electronic Documents Act</em>{' '}
        (PIPEDA) applies to interprovincial and international data transfers, and Canada's
        Anti-Spam Legislation (CASL) governs our commercial communications.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Privacy Officer</h2>
      <p>
        The person responsible for the protection of personal information at Amplion is:
      </p>
      <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm">
        <p><strong>Phillip Brochu</strong> — Privacy Officer</p>
        <p>
          Email:{' '}
          <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
            Pbrochu@amplion.dev
          </a>
        </p>
        <p>You may contact our Privacy Officer directly with any question, request, or complaint
          regarding the handling of your personal information.</p>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information We Collect</h2>
      <p>We collect personal information only when you voluntarily provide it. This includes:</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>
          <strong>Name and email address</strong> — collected when you book a strategy call
          through our Calendly scheduling form.
        </li>
        <li>
          <strong>Project details</strong> — any information you choose to share in the pre-booking
          form or the Calendly notes field about your business and goals.
        </li>
        <li>
          <strong>Communication records</strong> — emails or messages you send directly to us.
        </li>
      </ul>
      <p className="mt-3">
        We do not collect payment card information, government identification, or any sensitive
        personal data through this website. We do not use automated decision-making or profiling
        tools that make decisions about individuals without human review.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">4. How We Use Your Information</h2>
      <p>We use the information you provide solely to:</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Schedule and conduct your free strategy call.</li>
        <li>Follow up with you about your project inquiry (implied CASL consent for 6 months from
          your booking date, or 2 years if an active business relationship begins).</li>
        <li>Communicate about an active project engagement.</li>
        <li>Improve how we respond to inquiries and communicate with potential clients.</li>
      </ul>
      <p className="mt-3">
        We will never sell, rent, or trade your personal information to any third party for marketing
        purposes.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services and Cross-Border Transfers</h2>
      <p>
        We use <strong>Calendly</strong> (Calendly LLC, United States) to manage appointment
        scheduling. When you book a call, your name, email address, and any notes you provide are
        transferred to and stored on servers located in the United States.
      </p>
      <p className="mt-3">
        As required by Quebec's Law 25, we have conducted a Privacy Impact Assessment (PIA) for
        this transfer and have confirmed that contractual safeguards are in place through Calendly's{' '}
        <a
          href="https://calendly.com/dpa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 hover:underline"
        >
          Data Processing Agreement
        </a>
        . Calendly processes your data under their own{' '}
        <a
          href="https://calendly.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 hover:underline"
        >
          Privacy Notice
        </a>
        , which we recommend reviewing.
      </p>
      <p className="mt-3">
        Our website does not currently use third-party advertising trackers, remarketing pixels,
        or analytics platforms that collect personal information.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
      <p>We retain personal information as follows:</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>
          <strong>Inquiry data (name, email, project notes via Calendly):</strong> retained for
          12 months from the date of your booking if no business relationship results.
        </li>
        <li>
          <strong>Client project data:</strong> retained for 3 years from the end of the project
          or last business interaction, as required for accounting and legal purposes.
        </li>
        <li>
          <strong>Email communications:</strong> retained for 3 years from the date of the last
          communication.
        </li>
      </ul>
      <p className="mt-3">
        After the applicable retention period, personal information is securely destroyed or
        anonymized so that it can no longer be associated with you.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
      <p>Under Quebec's Law 25, you have the right to:</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Be informed of the existence of personal information we hold about you.</li>
        <li>Access the personal information we hold about you.</li>
        <li>Request correction of any inaccurate or incomplete information.</li>
        <li>Withdraw your consent to our use of your information at any time.</li>
        <li>Request deletion of your personal information from our records.</li>
        <li>
          <strong>Request de-indexing</strong> — request that we cease disseminating your personal
          information or that any hyperlink attached to your name that gives access to your
          information be de-indexed.
        </li>
        <li>
          <strong>Data portability</strong> — request that computerized personal information you
          have provided be communicated to you or to another organization in a structured,
          commonly used technological format.
        </li>
        <li>Unsubscribe from any commercial communications we send you.</li>
      </ul>
      <p className="mt-3">
        To exercise any of these rights, contact our Privacy Officer at{' '}
        <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
          Pbrochu@amplion.dev
        </a>
        . We will respond within 30 days.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Confidentiality Incidents and Breach Notification</h2>
      <p>
        In the event of a confidentiality incident (including unauthorized access, use, or
        disclosure of your personal information) that presents a risk of serious injury, we will:
      </p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Notify the Commission d'accès à l'information du Québec (CAI) promptly.</li>
        <li>Notify all affected individuals promptly.</li>
        <li>Take all reasonable measures to reduce the risk of injury and prevent further incidents.</li>
        <li>Maintain a register of all confidentiality incidents for a minimum of 5 years.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Security</h2>
      <p>
        We implement reasonable technical and organizational measures to protect your personal
        information from unauthorized access, disclosure, or misuse. Our website is served over
        HTTPS. However, no method of transmission over the internet is 100% secure.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Complaints</h2>
      <p>
        If you have a concern about how we handle your personal information, we encourage you to
        contact us first:
      </p>
      <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm">
        <p><strong>Phillip Brochu — Privacy Officer</strong></p>
        <p>
          <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
            Pbrochu@amplion.dev
          </a>
        </p>
        <p className="mt-2">We will respond within 30 days.</p>
      </div>
      <p className="mt-3">
        If you are not satisfied with our response, you have the right to file a complaint with the{' '}
        <strong>Commission d'accès à l'information du Québec (CAI)</strong>:
      </p>
      <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm">
        <p>Website:{' '}
          <a
            href="https://www.cai.gouv.qc.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 hover:underline"
          >
            www.cai.gouv.qc.ca
          </a>
        </p>
        <p>Phone: 1-888-528-7741</p>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise the
        "Last updated" date at the top of this page. Continued use of our website after any
        changes constitutes your acceptance of the updated policy.
      </p>
      <p className="mt-3">
        This policy is available in English. A French version is available upon request at{' '}
        <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
          Pbrochu@amplion.dev
        </a>.
      </p>
    </section>

  </div>
);

const FR = () => (
  <div className="space-y-8 text-gray-700 leading-relaxed">

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Qui sommes-nous</h2>
      <p>
        Amplion (« nous », « notre ») est une agence d'automatisation IA et de développement web
        qui dessert des entreprises à travers l'Amérique du Nord. Nous exploitons le site web{' '}
        <strong>amplion.dev</strong> et pouvons être joints à{' '}
        <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
          Pbrochu@amplion.dev
        </a>.
      </p>
      <p className="mt-3">
        Cette Politique de confidentialité explique quels renseignements personnels nous recueillons,
        comment nous les utilisons et quels sont vos droits. Nos obligations légales principales sont
        régies par la <em>Loi sur la protection des renseignements personnels dans le secteur privé</em>{' '}
        du Québec (Loi 25 / Projet de loi 64). La <em>Loi sur la protection des renseignements personnels
        et les documents électroniques</em> (LPRPDE) du gouvernement fédéral s'applique aux transferts
        interprovenciaux et internationaux de données.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Responsable de la protection des renseignements personnels</h2>
      <p>La personne responsable de la protection des renseignements personnels chez Amplion est :</p>
      <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm">
        <p><strong>Phillip Brochu</strong> — Responsable de la protection des renseignements personnels</p>
        <p>
          Courriel :{' '}
          <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
            Pbrochu@amplion.dev
          </a>
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Renseignements recueillis</h2>
      <p>Nous recueillons des renseignements personnels uniquement lorsque vous nous les fournissez volontairement :</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li><strong>Nom et adresse courriel</strong> — recueillis lors de la prise de rendez-vous via Calendly.</li>
        <li><strong>Détails du projet</strong> — toute information que vous choisissez de partager dans le formulaire de pré-réservation ou les notes Calendly.</li>
        <li><strong>Échanges de communication</strong> — courriels ou messages que vous nous envoyez directement.</li>
      </ul>
      <p className="mt-3">
        Nous n'utilisons pas de prise de décision automatisée ou de profilage qui prend des décisions
        concernant des individus sans révision humaine.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Utilisation des renseignements</h2>
      <p>Nous utilisons vos renseignements uniquement pour :</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Planifier et tenir votre appel stratégique gratuit.</li>
        <li>Assurer le suivi de votre demande de projet.</li>
        <li>Communiquer dans le cadre d'un mandat actif.</li>
        <li>Améliorer notre façon de répondre aux demandes.</li>
      </ul>
      <p className="mt-3">Nous ne vendons, ne louons ni n'échangeons jamais vos renseignements personnels à des tiers à des fins de marketing.</p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Transferts à des tiers et à l'extérieur du Québec</h2>
      <p>
        Nous utilisons <strong>Calendly</strong> (Calendly LLC, États-Unis) pour la gestion des
        rendez-vous. Lorsque vous réservez un appel, vos renseignements sont transférés et stockés
        sur des serveurs situés aux États-Unis. Conformément à la Loi 25, nous avons effectué une
        évaluation des facteurs relatifs à la vie privée (EFVP) pour ce transfert et confirmé la
        présence de mesures contractuelles de protection adéquates.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Conservation des renseignements</h2>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li><strong>Données de demande (sans relation d'affaires) :</strong> conservées 12 mois.</li>
        <li><strong>Données de projet client :</strong> conservées 3 ans après la fin du projet.</li>
        <li><strong>Échanges par courriel :</strong> conservés 3 ans après le dernier échange.</li>
      </ul>
      <p className="mt-3">Après la période applicable, les renseignements sont détruits de façon sécuritaire ou anonymisés.</p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Vos droits</h2>
      <p>En vertu de la Loi 25, vous avez le droit de :</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Être informé de l'existence de renseignements personnels vous concernant.</li>
        <li>Accéder à vos renseignements personnels.</li>
        <li>Demander la correction de renseignements inexacts.</li>
        <li>Retirer votre consentement en tout temps.</li>
        <li>Demander la suppression de vos renseignements.</li>
        <li><strong>Demander la déindexation</strong> de tout hyperlien donnant accès à vos renseignements.</li>
        <li><strong>Portabilité des données</strong> — recevoir vos renseignements dans un format technologique structuré et couramment utilisé.</li>
      </ul>
      <p className="mt-3">
        Pour exercer ces droits, contactez :{' '}
        <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">Pbrochu@amplion.dev</a>.
        Nous répondrons dans les 30 jours.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Incidents de confidentialité</h2>
      <p>En cas d'incident de confidentialité présentant un risque de préjudice sérieux, nous :</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Aviserons la Commission d'accès à l'information (CAI) sans délai.</li>
        <li>Aviserons les personnes concernées sans délai.</li>
        <li>Prendrons toutes les mesures raisonnables pour réduire le risque.</li>
        <li>Tiendrons un registre des incidents pendant au moins 5 ans.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Plaintes</h2>
      <p>Si vous avez une préoccupation, contactez-nous d'abord à{' '}
        <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">Pbrochu@amplion.dev</a>.
        Si vous n'êtes pas satisfait de notre réponse, vous pouvez déposer une plainte auprès de la{' '}
        <strong>Commission d'accès à l'information du Québec (CAI)</strong> :{' '}
        <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">
          www.cai.gouv.qc.ca
        </a>{' '}| 1-888-528-7741.
      </p>
    </section>

  </div>
);

export function PrivacyPolicyPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = lang === 'fr' ? 'Politique de confidentialité — Amplion' : 'Privacy Policy — Amplion';
  }, [lang]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-start justify-between mb-2 gap-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {lang === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
          </h1>
          <div className="flex gap-2 flex-shrink-0 mt-1">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${
                lang === 'en'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'text-gray-500 border-gray-300 hover:border-gray-500'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${
                lang === 'fr'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'text-gray-500 border-gray-300 hover:border-gray-500'
              }`}
            >
              FR
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-10">
          {lang === 'fr' ? 'Dernière mise à jour : 2 avril 2026' : 'Last updated: April 2, 2026'}
        </p>

        {lang === 'en' ? <EN /> : <FR />}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link to="/" className="text-cyan-600 hover:underline text-sm">
            {lang === 'fr' ? '← Retour à l\'accueil' : '← Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
