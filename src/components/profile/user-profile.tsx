"use client";

import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { SessionUser } from "@/types/user-types";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UserProfileSkeleton from "../custom/user-profile-skeleton";

const UserProfile = () => {
  const router = useRouter();
  const { data, refetch, isPending } = authClient.useSession();

  const user = data?.user as SessionUser | null;

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [providerName, setProviderName] = useState("");
  const [image, setImage] = useState<string>("");

  const syncForm = (u: SessionUser) => {
    setName(u.name ?? "");
    setPhone(u.phone ?? "");
    setProviderName(u.providerName ?? "");
    setImage(u.image ?? "");
  };

  useEffect(() => {
    if (user) syncForm(user);
  }, [user]);

  if (isPending) return <UserProfileSkeleton />;
  if (!user) return <p className="text-center py-10">Unauthorized</p>;

  const isProvider = user.role === "provider";

  const handleUpdate = async (): Promise<void> => {
    try {
      setSaving(true);

      await api.patch("/profile", {
        name,
        phone,
        image,
        providerName: isProvider ? providerName : undefined,
      });

      await refetch();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err: unknown) {
      toast.error(typeof err === "string" ? err : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) syncForm(user);
    setIsEditing(false);
  };

  return (
    <section className="max-w-xl mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Back
        </Button>

        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Update Profile</Button>
        )}
      </div>

      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* Avatar */}
      <div className="flex justify-center">
        <div className="h-28 w-28 rounded-full border flex items-center justify-center overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt="Profile image"
              width={112}
              height={112}
              className="object-cover"
            />
          ) : (
            <User className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="border rounded-xl p-6 space-y-5 bg-background">
        {/* Image URL (edit only) */}
        {isEditing && (
          <div className="space-y-1">
            <label className="text-sm font-medium">Profile Image URL</label>
            <Input
              placeholder="https://example.com/avatar.png"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        )}

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          {isEditing ? (
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <p className="text-muted-foreground">{user.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <p className="text-muted-foreground">{user.email}</p>
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Phone</label>
          {isEditing ? (
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          ) : (
            <p className="text-muted-foreground">{user.phone || "Not set"}</p>
          )}
        </div>

        {/* Provider only */}
        {isProvider && (
          <div className="space-y-1">
            <label className="text-sm font-medium">Provider Name</label>
            {isEditing ? (
              <Input
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              />
            ) : (
              <p className="text-muted-foreground">
                {user.providerName || "Not set"}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      {isEditing && (
        <div className="flex gap-3">
          <Button className="flex-1" onClick={handleUpdate} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </Button>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
