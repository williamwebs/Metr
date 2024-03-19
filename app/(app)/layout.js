import { Inter, Karla } from "next/font/google";
import "../../styles/globals.css";
import Nav from "@/components/nav/Nav";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });

export const metadata = {
  title: "Metr",
  description:
    "Metr - your all-in-one solution for hassle-free electricity bill payments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <Nav />
        <main className="max-w-6xl mx-auto px-4">{children}</main>
        <footer className="bg-black/90 text-gray-200 py-10 mt-20">
          <div className="max-w-6xl mx-auto px-4">
            {/* logo */}
            <Link href={"/"} className="font-bold text-xl">
              Metr:
            </Link>
            {/* links */}
            {/* subscription form */}
            {/* copyright */}
            <hr className="bg-gray-500 h-[1px] border-none mt-10" />
            <div className="text-sm text-gray-500 mt-5 text-center">
              Developed by: <span className="text-gray-400">th_ejouRney</span>{" "}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
