import React from "react";
import Link from "next/link";
import Searchbar from "./logined/searchbar";

export default function UnLoginedNavbar() {
  return (
    <div className=" sm:ml-6 sm:flex sm:items-center flex gap-2">
      <Searchbar />
      <div className="flex gap-2 ">

      <Link href={"/auth/signup"}>
       <button className="px-5 py-1 rounded-md bg-primary-foreground text-secondary-foreground text-sm font-semibold 
       hover:opacity-95 transition-colors border">
      Sign up 
       </button>
      </Link>
      <Link href={"/auth/signin"}>
      <button className="px-5 py-1 rounded-md bg-secondary-foreground text-white text-sm font- 
       hover:-translate-y-0.5   transition-transform border">
      Login 
       </button>
      </Link>
      </div>
    </div>
  );
}
