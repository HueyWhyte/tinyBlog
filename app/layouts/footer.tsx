import React from "react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { Link } from "@remix-run/react";
import logoWhite from "~/assets/Penrodes_logo_Horizintal-17.png";
import logoBlack from "~/assets/Penrodes_logo_Horizintal-18.png";
import { Theme, useTheme } from "remix-themes";

export default function Footer() {
  const [theme, setTheme] = useTheme();
  console.log(theme);

  return (
    <footer className="flex mt-11 bg-muted ">
      <div className=" mx-auto md:w-[85%] flex flex-col w-[93%]">
        <section className="flex gap-5 py-14 flex-wrap-reverse">
          <Link
            to="/"
            className="font-bold text-purple-700 my-auto dark:text-purple-500 hover:text-black montage-font text-2lg md:text-3xl mx-auto md:mx-0 md:mt-4"
          >
            {theme === "dark" ? (
              <img src={logoWhite} alt="" className="h-16" />
            ) : (
              <img src={logoBlack} alt="" className="h-16" />
            )}
          </Link>

          <div className="ml-auto flex flex-col gap-2">
            <p className="font-semibold">TOP POSTS & PAGES</p>
            <ul>
              <li> - 35 of the Best Book Club Books You'll Read This Year</li>
              <li> - 12 of The Best Independent Bookstores in NYC</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold">CONTACT INFO</p>
            <p className="">contact@blogger.com</p>
          </div>
        </section>

        <section className="flex items-center justify-between md:flex-row flex-col-reverse border-t border-gray-600 py-8 ">
          <p className="montage-fon mt-3 md:mt-0 mx-auto md:mx-0">
            Made with ❤️ by KwaminaWhyte
          </p>
          <div className="flex items-center gap-5">
            <FacebookIcon className="w-6 h-6" />
            <InstagramIcon className="w-6 h-6" />
            <YoutubeIcon className="w-6 h-6" />
          </div>
        </section>
      </div>
    </footer>
  );
}
