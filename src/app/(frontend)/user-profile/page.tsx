import UserProfile from "@/components/profile/user-profile";
export const metadata = {
  title: "My Profile",
};
const ProfilePage = () => {
  return (
    <section>
      <UserProfile />
    </section>
  );
};

export default ProfilePage;
