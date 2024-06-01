import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserProfile from "@/components/forms/Profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  // // redirect to landing page if user is not authenticated
  if (!session) redirect("/");

  return (
    <div className="mx-auto max-w-3xl">
      <UserProfile />
    </div>
  );
};

export default Profile;
