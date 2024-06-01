import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CTA from "@/components/button/CTA";
import Balance from "@/components/wallet/Balance";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  // redirect to landing page if user is not authenticated
  if (!session) redirect("/");
  return (
    <div className="mx-auto max-w-3xl">
      {/* display a form that fetches the user details from the db auth */}
      {/* the form should also accept users phone number  */}
      <div className="flex flex-col md:flex-row items-start gap-10 md:gap-20">
        <div className="rounded-full flex items-center justify-center shadow">
          <Image
            src={session?.user?.image}
            alt="avartar"
            width={100}
            height={100}
            className="rounded-full shadow-md"
          />
        </div>

        <div className="w-full">
          <Balance />
          <div>
            <p className="mb-10">
              Fill in your{" "}
              <span className="text-orange-500 font-bold">Phone number</span> &{" "}
              <span className="text-orange-500 font-bold">Meter number</span> so
              you dont have to type them manually everytime you want to purchase
              energy. Also, it helps us send you{" "}
              <span className="text-orange-500 font-bold">
                SMS notification
              </span>{" "}
              when your subscription is getting low.
            </p>
          </div>
          <form>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="fullname"
                  value={session?.user?.name}
                  className="read-only_input"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={session?.user?.email}
                  className="read-only_input"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="phone"
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="meter">Meter Number</label>
                <input
                  type="number"
                  name="meter"
                  placeholder="meter"
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="meter">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Customer name"
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="meter">Customer Address</label>
                <textarea
                  type="text"
                  name="customerAddress"
                  placeholder="Customer address"
                  className="input"
                />
              </div>
            </div>

            <div className="my-10 w-full block mx-auto">
              <CTA title={"Update profile"} icon={false} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
