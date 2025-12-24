import React from "react";
import Link from "next/link";

const Logo = () => (
  <div className="logo-container transform hover:scale-105 transition-transform duration-300">
    <Link href="/">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-[180px] h-[50px] sm:w-[180px] sm:h-[50px]"
      />
    </Link>
  </div>
);

export default Logo;
