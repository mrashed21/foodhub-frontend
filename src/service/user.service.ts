export const userService = {
  getSession: async function () {
    try {
      const res = await fetch(`/api/auth/get-session`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const session = await res.json();

      if (!session?.user) {
        return { data: null, error: { message: "Session missing" } };
      }

      return { data: session, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
