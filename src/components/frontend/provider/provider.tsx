"use client";

import { usePublicProviders } from "@/api/public-api/provider.api";
import Container from "@/common/container/container";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Provider = () => {
  const { data, isLoading } = usePublicProviders();
  const router = useRouter();

  const providers = data?.data ?? [];

  return (
    <section className="py-16">
      <Container>
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-8">All Restaurants</h1>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-16 w-16 rounded-full mx-auto mb-3" />
                <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-3 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Provider Cards */}
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="border rounded-lg p-4 text-center cursor-pointer transition hover:shadow-md hover:-translate-y-1"
              >
                <Link href={`/providers/${provider.id}`}>
                  {/* Avatar */}
                  <div className="h-16 w-16 mx-auto rounded-full bg-muted mb-3 flex items-center justify-center text-sm font-semibold">
                    {provider.user.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <h3 className="font-medium text-sm">{provider.user.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {provider._count.menus}+ meals
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && providers.length === 0 && (
          <p className="text-center text-muted-foreground">
            No providers found
          </p>
        )}
      </Container>
    </section>
  );
};

export default Provider;
