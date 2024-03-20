import CTA from "@/components/button/CTA";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Dashboard = () => {
  const profileCompleted = true;

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
      {profileCompleted && (
        <div className="mx-auto max-w-md my-10">
          {/* get electricity biller from paybeta.ng  */}
          {/* form - meter_number meter_type biller_type amount reference */}
          <form>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="name">meter_number</label>
                <input
                  type="number"
                  name="meter_number"
                  placeholder="04273972845"
                  className="block w-full border rounded p-2 outline-none"
                />
                validate meter_number before proceeding
              </div>

              <div>
                <label htmlFor="meter_type">meter_type</label>
                fetch from the api (prepaid / postpaid)
              </div>

              <div>
                <label htmlFor="biller_type">biller_type</label>
                <input
                  type="text"
                  name="biller_type"
                  placeholder="ikeja-electric"
                  className="block w-full border rounded p-2 outline-amber-500"
                />
              </div>

              <div>
                <label htmlFor="amount">amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="amount"
                  className="block w-full border rounded p-2 outline-amber-500"
                />
              </div>
            </div>

            <div className="my-10 w-full block mx-auto">
              <CTA title={"Purchase"} icon={true} />
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
