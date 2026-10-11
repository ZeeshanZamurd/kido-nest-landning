import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell from "@/components/layout/LegalPageShell";
import LegalSection from "@/components/legal/LegalSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kido-nest.fun";

export const metadata: Metadata = {
  title: "Privacy Policy — KidoNest",
  description:
    "Learn how KidoNest collects, uses, and protects personal information for parents and children.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description="KidoNest is a parent-controlled video platform for families. This policy explains what we collect, why we collect it, and the choices you have."
      lastUpdated="September 30, 2026"
    >
      <LegalSection title="1. Who we are">
        <p>
          KidoNest (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides a mobile app and
          related services that help parents approve content and manage a safer viewing experience
          for children. Our website is{" "}
          <a href={siteUrl} className="font-semibold text-kidnest-violet hover:underline">
            kido-nest.fun
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>
          <strong>Parent account information:</strong> name, email address, authentication
          identifiers (including Firebase user IDs), subscription status, and settings you choose in
          the app.
        </p>
        <p>
          <strong>Child profile information:</strong> profile name, avatar, interests, viewing
          history, favorites, and parent-approved assignments created by the parent account.
        </p>
        <p>
          <strong>Contact details you submit:</strong> if you request a channel, playlist, or video,
          we collect the email address or phone number you provide so we can contact you about that
          request.
        </p>
        <p>
          <strong>Device or other IDs:</strong> identifiers tied to the app install or device that
          our service providers use to sign you in, prevent fraud, and operate playback. This
          includes Firebase app/installation identifiers sent to Google for authentication, and
          device fingerprinting data sent to Stripe when you subscribe. YouTube playback in the app
          may also send identifiers to Google.
        </p>
        <p>
          <strong>Approximate location:</strong> at sign-up we look up a country from your IP
          address (via ipapi.co) so we can set account region. We do not collect precise GPS
          location.
        </p>
        <p>
          <strong>Installed apps:</strong> if you use parental app blocking, we read the list of
          apps on the device and store the package names you choose to block on our servers so the
          block list can sync to that child profile.
        </p>
        <p>
          <strong>App activity:</strong> watch progress, favorites, search queries in Discover, and
          other in-app actions needed to run parent-approved viewing.
        </p>
        <p>
          <strong>Diagnostics:</strong> technical logs (device type, OS, IP address, and error
          details) needed to operate, secure, and debug the service.
        </p>
        <p>
          <strong>Payment information:</strong> subscription purchases are processed by Stripe. We do
          not store full payment card numbers on our servers. Stripe collects payment details and
          related fraud-prevention data as an independent payment processor.
        </p>
        <p>
          <strong>Waitlist and support requests:</strong> email address and any message you submit
          through our website forms.
        </p>
      </LegalSection>

      <LegalSection title="3. How we use information">
        <p>We use personal information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>create and manage parent and child profiles;</li>
          <li>authenticate users and keep accounts secure;</li>
          <li>deliver parent-approved videos and app features;</li>
          <li>process subscriptions and provide customer support;</li>
          <li>improve performance, reliability, and safety;</li>
          <li>comply with legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Children's privacy">
        <p>
          KidoNest is designed for use by families under parental supervision. Child profiles are
          created and managed by a parent or legal guardian. We do not knowingly collect personal
          information directly from children without parental involvement.
        </p>
        <p>
          Parents control which content is available, can manage child profiles, and may request
          deletion of account data at any time.
        </p>
      </LegalSection>

      <LegalSection title="5. How we share information">
        <p>We share information with service providers that help us run KidoNest, including:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Firebase / Google — authentication, account identifiers, and in-app YouTube playback;
          </li>
          <li>
            Stripe — subscription billing and fraud prevention (including device identifiers);
          </li>
          <li>ipapi.co — IP-based country lookup at account creation;</li>
          <li>cloud hosting and media storage providers that host our API and video files.</li>
        </ul>
        <p>
          We do not sell personal information. We do not use collected data for advertising or
          tracking across other apps. We may disclose information if required by law or to protect
          users, our rights, or the security of the service.
        </p>
      </LegalSection>

      <LegalSection title="6. Data retention">
        <p>
          We keep account information while your account is active and for a reasonable period
          afterward where needed for legal, security, or billing purposes. When you request account
          deletion, we delete or anonymize personal data unless we must retain certain records by
          law.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We use administrative, technical, and organizational safeguards designed to protect
          personal information. No method of transmission or storage is completely secure, so we
          cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="8. Your choices and rights">
        <p>
          Depending on where you live, you may have rights to access, correct, delete, or restrict
          certain processing of your personal information. Parents can update profile details in the
          app and may request account deletion at any time.
        </p>
        <p>
          To request deletion of your KidoNest account and associated data, visit our{" "}
          <Link href="/account-deletion" className="font-semibold text-kidnest-violet hover:underline">
            account deletion page
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. International users">
        <p>
          KidoNest may process and store information in countries other than your own. By using the
          service, you understand that your information may be transferred to facilities located
          outside your country of residence.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the
          &quot;Last updated&quot; date at the top of this page. Continued use of KidoNest after an
          update means you accept the revised policy.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact us">
        <p>
          Questions about this Privacy Policy can be sent to{" "}
          <a
            href="mailto:privacy@kido-nest.fun"
            className="font-semibold text-kidnest-violet hover:underline"
          >
            privacy@kido-nest.fun
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
