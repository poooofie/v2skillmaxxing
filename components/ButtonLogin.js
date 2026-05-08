import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, extraStyle }) => {
    
    if (isLoggedIn) {
        return <Link href="/dashboard" className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}>Time to level up {name}</Link>;
    } else {
        return <button className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}>Level Up!</button>
    }
};

export default ButtonLogin;