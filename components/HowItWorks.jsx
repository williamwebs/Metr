const HowItWorks = () => {
  return (
    <section className="my-20">
      <h2 className="text-center text-2xl md:text-3xl font-bold">
        How it works?
      </h2>

      <div class="w-full grid grid-cols-9 mt-10">
        {/* 1 */}
        {/* display only on mobile */}
        <div className="md:hidden col-span-1 rounded-full bg-black flex items-center justify-center w-1 relative">
          <div className="absolute border-2 border-orange-500 w-8 h-8 rounded-full flex items-center justify-center bg-white ">
            1
          </div>
        </div>
        <div class="col-span-8 md:col-span-4 w-full h-full ">
          <div class="w-full h-full p-2 md:pl-4">
            <h1 class=" text-xl font-medium py-2">Sign Up</h1>
            <p class=" sm:text-sm text-xs">
              Register for a Metr account using your email address and create a
              secure password.
            </p>
          </div>
        </div>
        <div class="hidden relative col-span-1 w-full h-full md:flex justify-center items-center">
          <div class="h-full w-1 bg-gray-300"></div>
          <div class="absolute w-6 h-6 rounded-full bg-gray-700 z-10 text-white text-center">
            1
          </div>
        </div>
        <div class="col-span-4 w-full h-full"></div>

        {/* 2 */}
        <div class="col-span-4 w-full h-full"></div>
        <div class="hidden relative col-span-1 w-full h-full md:flex justify-center items-center">
          <div class="h-full w-1 bg-gray-300"></div>
          <div class="absolute w-6 h-6 rounded-full bg-gray-700 z-10 text-white text-center">
            2
          </div>
        </div>

        <div class="col-span-8 md:col-span-4 w-full h-full ">
          <div class="w-full h-full p-2 md:pl-4">
            <h1 class="text-xl font-medium py-2">Verify Your Email</h1>
            <p class="sm:text-sm text-xs">
              Verify your email address by clicking on the verification link
              sent to your inbox.
            </p>
          </div>
        </div>

        {/* diplay only on mobile */}
        <div className="md:hidden col-span-1 rounded-full bg-black flex items-center justify-center w-1 relative">
          <div className="absolute border-2 border-orange-500 w-8 h-8 rounded-full flex items-center justify-center bg-white ">
            2
          </div>
        </div>

        {/* 3 */}
        {/* display only on mobile */}
        <div className="md:hidden col-span-1 rounded-full bg-black flex items-center justify-center w-1 relative">
          <div className="absolute border-2 border-orange-500 w-8 h-8 rounded-full flex items-center justify-center bg-white ">
            3
          </div>
        </div>

        <div class="col-span-8 md:col-span-4 w-full h-full ">
          <div class="w-full h-full p-2 md:pl-4">
            <h1 class=" text-xl font-medium py-2">Explore Features</h1>
            <p class=" sm:text-sm text-xs">
              Discover the convenient features of Metr, including bill payments
              and notifications.
            </p>
          </div>
        </div>
        <div class="hidden relative col-span-1 w-full h-full md:flex justify-center items-center">
          <div class="h-full w-1 bg-gray-300"></div>
          <div class="absolute w-6 h-6 rounded-full bg-gray-700 z-10 text-white text-center">
            3
          </div>
        </div>
        <div class="col-span-4 w-full h-full"></div>

        {/* 4 */}
        <div class="col-span-4 w-full h-full"></div>
        <div class="hidden relative col-span-1 w-full h-full md:flex justify-center items-center">
          <div class="h-full w-1 bg-gray-300"></div>
          <div class="absolute w-6 h-6 rounded-full bg-gray-700 z-10 text-white text-center">
            4
          </div>
        </div>
        <div class="col-span-8 md:col-span-4 w-full h-full ">
          <div class="w-full h-full p-2 md:pl-4">
            <h1 class="text-xl font-medium py-2">Pay Your Bills</h1>
            <p class="sm:text-sm text-xs">
              Easily pay your electricity bills online with our streamlined
              payment process.
            </p>
          </div>
        </div>

        {/* display only on mobile */}
        <div className="md:hidden col-span-1 rounded-full bg-black flex items-center justify-center w-1 relative">
          <div className="absolute border-2 border-orange-500 w-8 h-8 rounded-full flex items-center justify-center bg-white ">
            4
          </div>
        </div>

        {/* 5 */}
        {/* display only on mobile */}
        <div className="md:hidden col-span-1 rounded-full bg-black flex items-center justify-center w-1 relative">
          <div className="absolute border-2 border-orange-500 w-8 h-8 rounded-full flex items-center justify-center bg-white ">
            5
          </div>
        </div>

        <div class="col-span-8 md:col-span-4 w-full h-full ">
          <div class="w-full h-full p-2 md:pl-4">
            <h1 class=" text-xl font-medium py-2">Stay Updated</h1>
            <p class=" sm:text-sm text-xs">
              Receive instant SMS notifications for bill reminders and payment
              confirmations.
            </p>
          </div>
        </div>
        <div class="hidden relative col-span-1 w-full h-full md:flex justify-center items-center">
          <div class="h-full w-1 bg-gray-300"></div>
          <div class="absolute w-6 h-6 rounded-full bg-gray-700 z-10 text-white text-center">
            5
          </div>
        </div>
        <div class="col-span-4 w-full h-full"></div>
      </div>
    </section>
  );
};

export default HowItWorks;
