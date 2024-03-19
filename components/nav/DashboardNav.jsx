import Link from "next/link";
import CTA from "../button/CTA";
import {
  faBell,
  faBoltLightning,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardNav = () => {
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
              <div className="hidden md:flex">
                <CTA title="Sign Out" icon={false} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNav;
