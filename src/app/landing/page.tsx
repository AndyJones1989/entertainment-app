'use client'
import { AuthContext } from "@/app/context/auth-provider";
import { useContext } from "react";

const LandingPage = ()=> {
    const authStatus = useContext(AuthContext);
    console.log(authStatus);
    return <div>Landing page</div>
}

export default LandingPage;