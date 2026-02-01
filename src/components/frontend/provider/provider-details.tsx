"use client";

import { usePublicSingleProvider } from "@/api/public-api/provider.api";
import Container from "@/common/container/container";
import ProviderDetailsSkeleton from "@/components/custom/provider-details-skeleton";
import Image from "next/image";
import Link from "next/link";

interface ProviderDetailsProps {
  id: string;
}

const ProviderDetails = ({ id }: ProviderDetailsProps) => {
  const { data, isLoading, isError } = usePublicSingleProvider(id);

  if (isLoading)
    return (
      <Container className="py-8">
        <ProviderDetailsSkeleton />
      </Container>
    );

  if (isError || !data?.data)
    return <p className="text-center py-10">Provider not found</p>;

  const provider = data.data;

  return (
    <section className="py-8">
      <Container className="space-y-10">
        {/* ===== Provider Header ===== */}
        <div className="flex items-center gap-5">
          <Image
            src={provider.user.image || "/avatar.png"}
            alt={provider.user.name}
            width={90}
            height={90}
            className="rounded-full border object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {provider.user.providerName }
            </h1>
            <p className="text-sm text-muted-foreground">
              Managed by {provider.user.name}
            </p>
          </div>
        </div>

        {/* ===== Menus ===== */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Available Meals</h2>

          {provider.menus.length === 0 ? (
            <p>No meals available</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {provider.menus.map((menu: any) => (
                <Link
                  key={menu.id}
                  href={`/meals/${menu.id}`}
                  className="group"
                >
                  <div className="h-full border rounded-xl overflow-hidden transition hover:shadow-lg hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative h-44 w-full">
                      <Image
                        src={menu.image || "/food-placeholder.png"}
                        alt={menu.name}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-lg">{menu.name}</h3>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {menu.description}
                      </p>

                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-primary">
                          ৳{menu.price}
                        </span>

                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            menu.isAvailable
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {menu.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      {/* Cuisine */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {menu.cuisine.map((c: string) => (
                          <span
                            key={c}
                            className="text-xs bg-muted px-2 py-0.5 rounded-full"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProviderDetails;
