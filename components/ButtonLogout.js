"use client";

import { signOut } from "next-auth/react";

const ButtonLogout = () => {
    return (
        <button
            className="btn border-[#5EF6FF]/30 bg-transparent text-white/70 hover:border-[#5EF6FF]/60 hover:bg-[#5EF6FF]/10 hover:text-white"
            onClick={() => signOut()}
        >
            Logout
        </button>
    );
};

export default ButtonLogout;
