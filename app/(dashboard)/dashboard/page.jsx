import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ValidateBiller from "@/components/forms/ValidateBiller";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const profileCompleted = true;
  const session = await getServerSession(authOptions);

  // redirect to landing page if user is not authenticated
  if (!session) redirect("/");

  // display if user is signed in
  return (
    <main>
      {/* display a dialogue that prompts user to complete their profile before they can see the dashboard */}
      {/* display recent transactions */}
      {/* display a form to make payments */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl">
            Welcome to Your <span className="text-black font-bold">Metr:</span>
          </h1>
          <div>
            <FontAwesomeIcon
              icon={faHand}
              className="w-6 text-orange-500"
              shake
            />
          </div>
        </div>
      </div>
      {!profileCompleted && (
        <div className="mt-10 text-center max-w-60 mx-auto">
          <p className="">
            Your profile is incomplete. Please complete your profile to access
            all dashboard features.
          </p>
          <div className="flex justify-center mt-10">
            <Link href={"/dashboard/profile"} className="button">
              Complete Profile
            </Link>
          </div>
        </div>
      )}

      {/* display only if the user has completed his profile */}
      {profileCompleted && <ValidateBiller />}
    </main>
  );
};

export default Dashboard;
