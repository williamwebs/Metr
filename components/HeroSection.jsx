import Image from "next/image";
import CTA from "./button/CTA";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between h-full md:min-h-screen pt-32 md:pt-12">
      <div className="flex flex-col gap-8 w-full md:w-[55%]">
        <h1 className="font-bold text-6xl md:text-5xl leading-[1.15] md:leading-tight">
          Empower Your <br className="hidden sm:block" /> Electricity Payments{" "}
          <br className="hidden sm:block" /> with{" "}
          <span className="text-orange-500">Metr:</span>
        </h1>
        <p className="text-gray-700 max-w-lg text-lg ">
          Conveniently manage your electricity payments from the comfort of your
          home or on the go. Experience seamless transactions, instant
          notifications, and peace of mind with our secure platform.
        </p>

        <CTA icon={true} title={"Get started"} />
      </div>
      <div className="w-full md:w-[45%]">
        <Image
          src={"/images/electricity-payment.jpg"}
          alt=""
          width={500}
          height={100}
        />
      </div>
    </section>
  );
};

export default HeroSection;
