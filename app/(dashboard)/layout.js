import { Karla } from "next/font/google";
import "../../styles/globals.css";
import DashboardNav from "@/components/nav/DashboardNav";

const karla = Karla({ subsets: ["latin"] });

export default function AppLayout({ children }) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <DashboardNav />
        <main className="max-w-6xl mx-auto pt-24 px-4">{children}</main>
      </body>
    </html>
  );
}
