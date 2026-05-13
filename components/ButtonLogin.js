"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyle }) => {
    const dashboardUrl = "/dashboard";
    const buttonClass = `btn border-[#5EF6FF] bg-[#5EF6FF] text-black hover:border-[#5EF6FF] hover:bg-[#5EF6FF]/80 ${extraStyle ? extraStyle : ""}`;
    
    if (session) {
        return (
            <Link 
            href={dashboardUrl} 
            className={buttonClass}
            >
                Time to level up {session.user.name}
            </Link>
        );
    }
    
    return (
        <button 
        className={buttonClass}
        onClick={() => {
            signIn(undefined, { callbackUrl: dashboardUrl });
        }}
        >
            Start learning
        </button>
    );
};
export default ButtonLogin;
