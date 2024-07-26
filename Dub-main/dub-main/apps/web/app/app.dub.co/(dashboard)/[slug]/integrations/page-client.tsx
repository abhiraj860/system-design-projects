"use client";

import useWorkspace from "@/lib/swr/use-workspace";
import { InstalledIntegrationProps } from "@/lib/types";
import IntegrationCard from "@/ui/integrations/integration-card";
import { MaxWidthWrapper, buttonVariants } from "@dub/ui";
import { cn } from "@dub/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function IntegrationsPageClient({
  integrations,
}: {
  integrations: InstalledIntegrationProps[];
}) {
  const { slug, flags } = useWorkspace();

  if (!flags?.integrations) {
    redirect(`/${slug}`);
  }

  return (
    <>
      <div className="flex h-36 w-full items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              Integrations
            </h1>
            <div className="flex gap-2">
              <Link
                href={`/${slug}/integrations/new`}
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "flex h-10 items-center justify-center whitespace-nowrap rounded-lg border px-4 text-sm",
                )}
              >
                Create Integration
              </Link>
              <Link
                href={`/${slug}/integrations/manage`}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "flex h-10 items-center justify-center whitespace-nowrap rounded-lg border px-4 text-sm",
                )}
              >
                My Integrations
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className="flex flex-col gap-3 py-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.clientId} {...integration} />
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
}
