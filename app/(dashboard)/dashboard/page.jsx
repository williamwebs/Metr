import { faHand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Dashboard = () => {
  const profileCompleted = false;

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
            <FontAwesomeIcon icon={faHand} className="w-6 text-orange-500" />
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
      {profileCompleted && <div>Completed Profile!</div>}
    </main>
  );
};

export default Dashboard;
