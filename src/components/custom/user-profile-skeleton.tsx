const UserProfileSkeleton = () => {
  return (
    <div className="max-w-xl mx-auto py-10 space-y-6 animate-pulse">
      <div className="h-8 w-32 bg-muted rounded" />

      <div className="border rounded-xl p-6 space-y-4">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-10 w-full bg-muted rounded" />

        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-10 w-full bg-muted rounded" />

        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-10 w-full bg-muted rounded" />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
