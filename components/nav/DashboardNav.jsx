"use client";

import Link from "next/link";
import CTA from "../button/CTA";
import {
  faBarsStaggered,
  faBell,
  faBoltLightning,
  faGear,
  faSignOut,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { signOut } from "next-auth/react";

const DashboardNav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  // const { data: session } = useSession();
  // console.log(session);

  return (
    <header>
      <nav className="fixed w-full shadow bg-white/60 backdrop-blur-md z-20">
        <div className="max-w-6xl mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Link
                href={"/dashboard"}
                className="font-bold text-xl flex items-center gap-1"
              >
                <FontAwesomeIcon
                  icon={faBoltLightning}
                  className="w-5 text-orange-500"
                />
                Metr:
              </Link>

              <div className="hidden md:flex items-center gap-2">
                <Link
                  href={"/dashboard"}
                  className="text-sm font-medium text-gray-500"
                >
                  Dashboard
                </Link>
                <Link
                  href={"/dashboard/profile"}
                  className="text-sm font-medium text-gray-500"
                >
                  Profile
                </Link>
                <Link
                  href={"/dashboard/transactions"}
                  className="text-sm font-medium text-gray-500"
                >
                  Transactions
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button>
                <FontAwesomeIcon
                  icon={faBell}
                  className="w-5 h-5 text-gray-500"
                />
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faGear}
                  className="w-5 h-5 text-gray-500"
                />
              </button>
              <div className="hidden md:flex" onClick={() => signOut()}>
                <button type="submit" className="button">
                  Logout
                  <FontAwesomeIcon icon={faSignOut} className="w-3" />
                </button>
              </div>

              {/* menu icon */}
              <button
                className="outline-none ml-1 md:hidden"
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                {openMenu ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="w-10 h-6 text-orange-500 font-bold"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBarsStaggered}
                    className="w-10 h-6 text-orange-500 font-bold"
                  />
                )}
              </button>

              {/* mobile menu */}
              {openMenu && (
                <div className="absolute top-14 right-0 max-w-56 min-h-60 py-10 px-5 shadow-md rounded-2xl bg-white backdrop-blur-md z-10">
                  <div className="flex flex-col md:hidden gap-4">
                    <Link
                      href={"/dashboard"}
                      className="text-sm font-medium text-gray-500"
                      onClick={() => setOpenMenu((prev) => !prev)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={"/dashboard/profile"}
                      className="text-sm font-medium text-gray-500"
                      onClick={() => setOpenMenu((prev) => !prev)}
                    >
                      Profile
                    </Link>
                    <Link
                      href={"/dashboard/transactions"}
                      className="text-sm font-medium text-gray-500"
                      onClick={() => setOpenMenu((prev) => !prev)}
                    >
                      Transactions
                    </Link>

                    {/* logout button */}
                    <button
                      type="submit"
                      className="button"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNav;
