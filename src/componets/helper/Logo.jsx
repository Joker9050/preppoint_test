// src/components/Logo.jsx
import React from "react";
import Link from "next/link";
import logo from "../../assets/images/logo.png";

const Logo = () => (
  <div className="logo-container transform hover:scale-105 transition-transform duration-300">
    <Link href="/">
      <img
        src={logo}
        alt="Logo"
        className="w-[180px] h-[50px] sm:w-[180px] sm:h-[50px]"
      />
    </Link>
  </div>
);

export default Logo;
