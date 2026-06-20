"use client"

import {useState} from "react";
import { api } from "../../services/api";
import {useRouter} from "next/navigation";
import Loader from "@/components/pageloader"

export default function registerPage(){
     const [Loading,setLoading] = useState(false);

    const [firstName,setfirstName] = useState("");
    const [lastName , setlastName] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] =useState("");
    const [phoneNumber ,setphoneNumber] = useState("");
    const router = useRouter();

    const handleSubmit = async(
        e: React.SyntheticEvent<HTMLFormElement>
    ) =>{
        e.preventDefault();
        try{
            setLoading(true);

            await api.post("/auth/register",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    phoneNumber
                }
            );
            alert(
                "Successfully Registered please Login to continue"
              );
                router.push(
                  "/login"
        )
    }
             

        catch(error: any){

    console.log(
        error.response?.data
    );

    alert(
        JSON.stringify(
            error.response?.data
        )
    );
}

        finally{
                setLoading(false);
           }
}

if(Loading){
    return <Loader/>
}
    
    return(
      <div className="min-h-screen flex items-center justify-center">

       
        <div>
            <form onSubmit={handleSubmit}
            className="w-100 border p-6 rounded-lg space-y-4">
            
             <h1 className="text-4xl ml-0">
            Register
             </h1>

                <input type="string"
                value={firstName}
                placeholder="Enter first name"
                className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
                onChange ={(e) =>{
                    setfirstName(e.target.value);
                    }
                }
                 />

                 <input type="string"
                 value={lastName}
                 placeholder="Enter your lastname"
                 className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
                 onChange={(e) =>{
                        setlastName(e.target.value);
                 }
                } 
                 />
                 
                <input type="number"
                 value={phoneNumber}
                 placeholder="Enter your Phone Number"
                 className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
                 onChange={(e=>{
                    setphoneNumber(e.target.value);
                 }
                   )
                 } />

                <input type="email"
                 value={email}
                 placeholder="Enter your e-mail"
                 className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
                 onChange={(e=>{
                    setemail(e.target.value);
                 }
                   )
                 } />

                  <input type="password"
                   value={password}
                 placeholder="Enter a strong Password"
                 className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
                 onChange={(e=>{
                    setpassword(e.target.value);
                 }
                   )
                 } />

                 <button type="submit" className = "w-full bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300">
                    Register
                 </button>



            </form>
        </div>

      </div>
    );


}
