'use client'

import {api} from "@/services/api"
import {useState, useEffect} from "react"
import Loader from "@/components/pageloader"
import {useRouter} from "next/navigation"

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;

  loginProvider: "local" | "google" | "facebook";

  profileImage?: string;

  isEmailVerified: boolean;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export default function userPage() {
    const [userDetails , setuserDetails] = useState<User>();
    const [loading , setloading] = useState(true)
    const router = useRouter();

    const fetchDeatils = async() => {

        try {
        const details = await api.get("/users/me/")

        setuserDetails(details.data.data);

        }
        catch(error){
            alert(error);
        }
        finally{
            setloading(false);
        }

        
    }

useEffect(() => {
  fetchDeatils();
}, [])

if(loading){
    return <Loader/>
}
const  handleLogout = () => {

  localStorage.removeItem("token");

  router.push("/login");
};



return(
    <div className = "p-10">
        <div className="mb-2 rounded-2xl me-auto">
        
        <div className = "ml-32">
            {userDetails?.profileImage}
        </div>
            
        <p>
            First Name : {userDetails?.firstName}   
        </p>

        <p>
            Last Name : {userDetails?.lastName}   
        </p>
        <p>
            E-mail : {userDetails?.email} 
            <span className={
                userDetails?.isEmailVerified
                ? "text-green-500"
                : "text-red-500"
              }
                >
                {userDetails?.isEmailVerified
                ? "(Verified)"
                : "(Not Verified)"
                }
            </span>
        </p>
        <p>
            Phone Number: {userDetails?.phoneNumber}   
        </p>
        <p>
            Login Provider : {userDetails?.loginProvider}   
        </p>
        <p className="mb-4">
            Time : 
            <Date>
                 {userDetails?.createdAt} 
            </Date>
            </p>
        
             <button
                onClick={handleLogout}
                className="text-left p-2 mt-1 border rounded hover:text-mauve-100 hover:bg-red-400 "
                >
                Logout
                </button>

        </div>

    </div>

)
}