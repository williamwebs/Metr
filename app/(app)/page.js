import Card from "@/components/card/Card";
import { features } from "@/constants/constants";
import HowItWorks from "@/components/HowItWorks";
import HeroSection from "@/components/HeroSection";
import CTA from "@/components/button/CTA";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  // redirect user to dashboard when authenticated
  if (session) redirect("/dashboard");

  // display if user is not signed in
  return (
    <main className="min-h-screen">
      <HeroSection />
      <section className="my-28">
        <h2 className="text-center text-2xl md:text-3xl font-bold">
          Why Metr?
        </h2>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10">
          {features.map((i) => (
            <Card title={i.title} icon={i.icon} description={i.description} />
          ))}
        </div>
      </section>
      <HowItWorks />
      <div className="flex justify-start md:justify-center">
        <CTA icon={true} title={"Get started"} />
      </div>
    </main>
  );
}
