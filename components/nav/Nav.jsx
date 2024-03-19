import Link from "next/link";
import CTA from "../button/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <header>
      <nav className="fixed w-full shadow bg-white/60 backdrop-blur-md z-20">
        <div className="max-w-6xl mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            <Link
              href={"/"}
              className="font-bold text-xl flex items-center gap-1"
            >
              <FontAwesomeIcon
                icon={faBoltLightning}
                className="w-5 text-orange-500"
              />
              Metr:
            </Link>

            <CTA title="Sign In" icon={false} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
