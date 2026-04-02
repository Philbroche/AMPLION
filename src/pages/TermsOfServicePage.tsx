import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EN = () => (
  <div className="space-y-8 text-gray-700 leading-relaxed">

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Nature of This Agreement</h2>
      <p>
        The parties acknowledge that this Agreement constitutes a commercial contract between two
        businesses. The Quebec <em>Consumer Protection Act</em> does not apply to this Agreement.
        This Agreement is governed by Quebec's <em>Civil Code</em> and applicable federal law.
      </p>
      <p className="mt-3">
        By accessing or using the Amplion website at <strong>amplion.dev</strong>, or by engaging
        Amplion for any services, you agree to be bound by these Terms of Service. If you do not
        agree, please do not use this website or our services.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Services</h2>
      <p>
        Amplion provides custom digital and AI automation services including website development,
        workflow automation, AI-powered creative production, and managed digital services. The
        specific scope, deliverables, timeline, and pricing for any engagement will be defined in a
        separate written proposal provided before work begins. These Terms apply to all engagements
        in addition to any project-specific agreement.
      </p>
      <p className="mt-3">We reserve the right to decline any project inquiry at our discretion.</p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Client Responsibilities</h2>
      <p>To allow us to deliver our services effectively, you agree to:</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Provide accurate, complete, and timely information we request regarding your project.</li>
        <li>Review and provide feedback on deliverables within agreed timelines.</li>
        <li>Ensure you hold the legal rights to any content, logos, images, or materials you provide
          for use in your project.</li>
        <li>Designate a primary point of contact for your project.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Payment Terms</h2>
      <p>Payment terms are specified in your individual project proposal. Unless otherwise agreed in writing:</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>A deposit may be required before work commences.</li>
        <li>Invoices are due within 14 days of the invoice date.</li>
        <li>Late payments may result in a pause in work until the balance is settled.</li>
        <li>All prices are in Canadian Dollars (CAD) unless otherwise stated.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
      <p>
        Upon receipt of full payment for a project, Amplion transfers ownership of the custom
        deliverables created specifically for you (such as website code, designs, and written
        content) to you.
      </p>
      <p className="mt-3">
        The following remain the exclusive property of Amplion and are licensed to you (not
        transferred) on a non-exclusive, non-transferable basis for use of the delivered project:
      </p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Pre-existing tools, frameworks, prompt libraries, automation templates, n8n workflows,
          and internal methodologies developed independently by Amplion, whether or not incorporated
          into your deliverables.</li>
        <li>General know-how and processes developed independently by Amplion.</li>
      </ul>
      <p className="mt-3">
        Third-party tools and platforms used in your project remain subject to their own licensing terms.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Confidentiality</h2>
      <p>
        Both parties agree to keep confidential any non-public business information shared during
        the course of an engagement and to implement reasonable security measures to protect it.
        This obligation does not apply to information that is publicly available or that must be
        disclosed by law. In the event of a data security incident affecting the other party's
        confidential information, the discovering party will notify the other within 48 hours of
        becoming aware.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Amplion's total liability for any claim
        arising out of our services shall not exceed the total amount paid by you for the specific
        project giving rise to the claim.
      </p>
      <p className="mt-3">
        This limitation does not apply to, and Amplion does not limit liability for:
      </p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Gross negligence (<em>faute lourde</em>) or intentional misconduct (<em>faute intentionnelle</em>),
          as required by Article 1474 of the Civil Code of Quebec.</li>
        <li>Breaches of the confidentiality obligations in Section 6.</li>
        <li>Privacy breaches governed by Quebec's Law 25.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Force Majeure</h2>
      <p>
        Neither party shall be liable for delays or failure to perform obligations resulting from
        events beyond their reasonable control, including but not limited to: natural disasters,
        government actions or restrictions, internet or telecommunications infrastructure failures,
        third-party platform or API outages (including AI service providers, automation platforms,
        or cloud hosting services), or other events constituting superior force under Article 1470
        of the Civil Code of Quebec.
      </p>
      <p className="mt-3">
        The affected party will notify the other promptly. Obligations are suspended (not cancelled)
        during the force majeure event. If the event extends beyond 30 consecutive days, either party
        may terminate the affected project without penalty, with payment due for all work completed
        to that date.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Revisions and Scope Changes</h2>
      <p>
        Project proposals include a defined number of revision rounds. Requests for work outside
        the agreed scope will be quoted and invoiced separately. We will always notify you before
        proceeding with any out-of-scope work.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Termination</h2>
      <p>
        Either party may terminate a project engagement with written notice. If you terminate an
        active project, you agree to pay for all work completed to the termination date. Amplion
        reserves the right to terminate an engagement if payment obligations are not met or if you
        act in a manner inconsistent with these Terms.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Dispute Resolution</h2>
      <p>
        In the event of a dispute, the parties agree to the following process before resorting to
        litigation:
      </p>
      <ol className="list-decimal pl-6 mt-3 space-y-2">
        <li><strong>Good-faith negotiation</strong> — the parties will attempt to resolve the dispute
          through direct discussion within 15 business days of written notice of the dispute.</li>
        <li><strong>Mediation</strong> — if negotiation fails, the parties will submit to non-binding
          mediation with a mutually agreed mediator before initiating court proceedings.</li>
        <li><strong>Litigation</strong> — if mediation fails, disputes shall be resolved exclusively
          in the courts of the Province of Quebec.</li>
      </ol>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Website Use</h2>
      <p>
        Content on amplion.dev is for informational purposes only. You may not reproduce, distribute,
        or use any content without our prior written permission. We may modify or discontinue any
        part of our website at any time without notice.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the Province of Quebec and the federal laws of
        Canada applicable therein. Subject to the dispute resolution process in Section 11, both
        parties consent to the exclusive jurisdiction of the courts of the Province of Quebec.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The "Last updated" date will reflect any
        changes. Continued use of our website or services after changes are posted constitutes
        your acceptance.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Contact</h2>
      <div className="bg-gray-50 rounded-lg p-4 text-sm mt-3">
        <p><strong>Amplion</strong></p>
        <p>
          Email:{' '}
          <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
            Pbrochu@amplion.dev
          </a>
        </p>
        <p>Website: amplion.dev | Canada</p>
      </div>
    </section>

  </div>
);

const FR = () => (
  <div className="space-y-8 text-gray-700 leading-relaxed">

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Nature de l'entente</h2>
      <p>
        Les parties reconnaissent que la présente entente constitue un contrat commercial entre deux
        entreprises. La <em>Loi sur la protection du consommateur</em> du Québec ne s'applique pas
        à cette entente. Elle est régie par le <em>Code civil du Québec</em> et les lois fédérales
        applicables.
      </p>
      <p className="mt-3">
        En accédant au site web d'Amplion à l'adresse <strong>amplion.dev</strong> ou en retenant
        les services d'Amplion, vous acceptez d'être lié par les présentes Conditions d'utilisation.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Services</h2>
      <p>
        Amplion fournit des services numériques personnalisés et d'automatisation IA, notamment le
        développement web, l'automatisation de flux de travail, la création assistée par IA et la
        gestion numérique intégrale. La portée, les livrables, l'échéancier et la tarification de
        chaque mandat seront définis dans une proposition écrite distincte remise avant le début des
        travaux.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Responsabilités du client</h2>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Fournir des informations exactes, complètes et en temps opportun concernant votre projet.</li>
        <li>Réviser les livrables et fournir vos commentaires dans les délais convenus.</li>
        <li>Vous assurer de détenir les droits légaux sur tout contenu fourni à Amplion.</li>
        <li>Désigner un interlocuteur principal pour votre projet.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Modalités de paiement</h2>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>Un dépôt peut être requis avant le début des travaux.</li>
        <li>Les factures sont payables dans les 14 jours suivant la date de facturation.</li>
        <li>Un retard de paiement peut entraîner une suspension des travaux.</li>
        <li>Tous les prix sont en dollars canadiens (CAD) sauf indication contraire.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Propriété intellectuelle</h2>
      <p>
        À la réception du paiement intégral, Amplion vous cède la propriété des livrables personnalisés
        créés spécifiquement pour vous. Les outils préexistants, gabarits d'automatisation, bibliothèques
        de prompts, flux de travail n8n et méthodologies internes demeurent la propriété exclusive
        d'Amplion et vous sont accordés sous forme de licence non exclusive pour l'utilisation des livrables.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Confidentialité</h2>
      <p>
        Les deux parties s'engagent à préserver la confidentialité de toute information commerciale
        non publique échangée dans le cadre d'un mandat et à mettre en œuvre des mesures de sécurité
        raisonnables. En cas d'incident de sécurité touchant les informations confidentielles de l'autre
        partie, la partie qui en prend connaissance notifiera l'autre dans les 48 heures.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation de responsabilité</h2>
      <p>
        La responsabilité totale d'Amplion pour toute réclamation découlant de nos services est
        limitée au montant total payé pour le projet en cause.
      </p>
      <p className="mt-3">Cette limitation ne s'applique pas à :</p>
      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>La faute lourde ou la faute intentionnelle, conformément à l'article 1474 du Code civil du Québec.</li>
        <li>Les manquements aux obligations de confidentialité.</li>
        <li>Les atteintes à la vie privée régies par la Loi 25.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Force majeure</h2>
      <p>
        Aucune partie ne sera responsable des retards ou manquements résultant d'événements hors de
        son contrôle raisonnable, incluant les catastrophes naturelles, les actions gouvernementales,
        les pannes d'infrastructures internet ou de plateformes tierces (fournisseurs IA, plateformes
        d'automatisation, hébergement infonuagique), ou tout autre cas de force majeure au sens de
        l'article 1470 du Code civil du Québec.
      </p>
      <p className="mt-3">
        Si l'événement se prolonge au-delà de 30 jours consécutifs, chaque partie peut résilier le
        mandat sans pénalité, le paiement étant dû pour les travaux complétés jusqu'à cette date.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Résolution des différends</h2>
      <ol className="list-decimal pl-6 mt-3 space-y-2">
        <li><strong>Négociation de bonne foi</strong> — dans les 15 jours ouvrables suivant l'avis écrit du différend.</li>
        <li><strong>Médiation</strong> — si la négociation échoue, les parties soumettront le différend à une médiation non contraignante.</li>
        <li><strong>Tribunaux</strong> — si la médiation échoue, les différends seront soumis aux tribunaux de la Province de Québec.</li>
      </ol>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Droit applicable</h2>
      <p>
        Les présentes Conditions sont régies par les lois de la Province de Québec et les lois fédérales
        du Canada qui y sont applicables.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact</h2>
      <div className="bg-gray-50 rounded-lg p-4 text-sm mt-3">
        <p><strong>Amplion</strong></p>
        <p>
          Courriel :{' '}
          <a href="mailto:Pbrochu@amplion.dev" className="text-cyan-600 hover:underline">
            Pbrochu@amplion.dev
          </a>
        </p>
        <p>Site web : amplion.dev | Canada</p>
      </div>
    </section>

  </div>
);

export function TermsOfServicePage() {
  const [lang, setLang] = useState<'en' | 'fr'>('fr');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = lang === 'fr' ? 'Conditions d\'utilisation — Amplion' : 'Terms of Service — Amplion';
  }, [lang]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-start justify-between mb-2 gap-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {lang === 'fr' ? "Conditions d'utilisation" : 'Terms of Service'}
          </h1>
          <div className="flex gap-2 flex-shrink-0 mt-1">
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
          </div>
        </div>

        {lang === 'fr' && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            Conformément à la Charte de la langue française, la version française vous est présentée en premier.
            Vous pouvez choisir la version anglaise en cliquant sur « EN » ci-dessus.
          </div>
        )}

        <p className="text-sm text-gray-500 mb-10">
          {lang === 'fr' ? 'Dernière mise à jour : 2 avril 2026' : 'Last updated: April 2, 2026'}
        </p>

        {lang === 'fr' ? <FR /> : <EN />}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link to="/" className="text-cyan-600 hover:underline text-sm">
            {lang === 'fr' ? "← Retour à l'accueil" : '← Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
