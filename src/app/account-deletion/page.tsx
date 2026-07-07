import type { Metadata } from "next";
import LegalPageShell from "@/components/layout/LegalPageShell";
import LegalSection from "@/components/legal/LegalSection";
import AccountDeletionForm from "@/components/legal/AccountDeletionForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kido-nest.fun";

export const metadata: Metadata = {
  title: "Request Account Deletion — KidoNest",
  description:
    "Request deletion of your KidoNest parent account, child profiles, and associated personal data.",
  alternates: {
    canonical: `${siteUrl}/account-deletion`,
  },
};

export default function AccountDeletionPage() {
  return (
    <LegalPageShell
      title="Request Account Deletion"
      description="Use this page to request deletion of your KidoNest parent account and associated data. This URL is provided for Google Play and other platform requirements."
    >
      <LegalSection title="What happens when you request deletion">
        <p>
          When your request is processed, we delete or anonymize personal data linked to your parent
          account, including child profiles, favorites, watch history, assignments, and app
          preferences, unless we must keep limited records for legal, fraud-prevention, or billing
          purposes.
        </p>
        <p>
          Active subscriptions should be cancelled before deletion where possible. Some billing
          records may be retained by our payment processor as required by law.
        </p>
      </LegalSection>

      <LegalSection title="How long it takes">
        <p>
          We review deletion requests within 30 days. You may receive a confirmation email when the
          request is received and again when deletion is complete.
        </p>
      </LegalSection>

      <LegalSection title="Submit a deletion request">
        <p>
          Enter the email address used for your KidoNest parent account. If you signed in with a
          different login method, include the email tied to that account.
        </p>
        <div className="pt-2">
          <AccountDeletionForm />
        </div>
      </LegalSection>

      <LegalSection title="Need help?">
        <p>
          If you cannot access the email on your account, contact{" "}
          <a
            href="mailto:privacy@kido-nest.fun"
            className="font-semibold text-kidnest-violet hover:underline"
          >
            privacy@kido-nest.fun
          </a>{" "}
          with enough information for us to verify ownership before we process the request.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
