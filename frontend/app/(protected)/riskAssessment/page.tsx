"use client"

import {useEffect , useState } from "react";
import { api } from "@/services/api"

interface riskAssessment {
    _id: string;
    investmentHorizon: number;
    marketReaction: number;
    riskTolerance: number;
    score: number;
    riskLevel: "low" | "medium" | "high";
}

export default function riskAssessmentPage(){

    const [loading , setloading] = useState(true)

    const [riskAssessment , setriskAssessment] = useState<riskAssessment | null >(null);

    const [investmentHorizon , setinvestmentHorizon] = useState("");

    const [marketReaction , setmarketReaction] = useState("");

    const [riskTolerance , setriskTolerance ] = useState("");

    const fetchResults =  async() =>{
        try{

        
        const results =
         await api.get("/risk-assessment/me");
    

        setriskAssessment(results.data.data);
     }
      catch(error) {
        console.log(error)
       
    }
    finally{
        setloading(false);
    }  
};

 useEffect (() => {
      fetchResults();
    } , []);



    const handleRiskAssessment = async (
        e : React.SyntheticEvent<HTMLFormElement>
    ) => 
    {
        e.preventDefault();
    

    try {
        await api.post("/risk-assessment", {
           investmentHorizon : Number(investmentHorizon),
           marketReaction : Number(marketReaction),
           riskTolerance : Number(riskTolerance),
        });

           setinvestmentHorizon("");
            setmarketReaction("");
            setriskTolerance("");
        await fetchResults();
    }  

    catch(error : any ) {
        console.log(error);
    

    alert(
        JSON.stringify(
        error.response?.data
                )
            );
        }
}



if (loading){
    return(
     <div className="min-h-screen flex items-center justify-center">
      <h1>Loading...</h1>
    </div>
)
}


return(
    <div className = "p-4" >
        <h1 className = "text-3xl">
            RiskAssessment
        </h1>

        <form
        onSubmit = {handleRiskAssessment}
        className = "max-w-md mx-auto bg-mist-300 p-8 rounded-2xl shadow-lg shadow-gray-100/70 space-y-5"
        >

                <select
        value={investmentHorizon}
        onChange={(e) =>
            setinvestmentHorizon(
            e.target.value
            )
        }
        className="border p-2 w-full"
        >
        <option value="">
            Select Investment Horizon
        </option>

        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>

                <select
        value={marketReaction}
        onChange={(e) =>
            setmarketReaction(
            e.target.value
            )
        }
        className="border p-2 w-full"
        >
        <option value="">
            Select Investment Horizon
        </option>

        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>

                <select
        value={riskTolerance}
        onChange={(e) =>
            setriskTolerance(
            e.target.value
            )
        }
        className="border p-2 w-full"
        >
        <option value="">
            Select Investment Horizon
        </option>

        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>
        

    <button type="submit"
    className="w-full bg-blue-600 hover:bg-green-500 text-amber-50  hover:text-gray-950 font-medium py-2 px-4 rounded-md transition duration-150"
     > Submit 
     </button>

   
    </form>


    {!riskAssessment ? (

  <div className="border rounded-lg p-6 text-center mt-6">

    <h2 className="text-xl font-semibold">
      No Risk Assessment Found
    </h2>

    <p className="text-gray-500 mt-2">
      Complete the assessment above to discover your risk profile.
    </p>

  </div>

) : (

  <div className="border p-4 rounded mt-6">
       
        <p>
            investmentHorizon:
            {}
            {
            riskAssessment.investmentHorizon
          }
        </p>

        <p>
           marketReaction:
            {" "}
            {
          riskAssessment.marketReaction
          }
     
        </p>

        <p>
           riskTolerance:
            {" "}
            {
           riskAssessment.riskTolerance
          }
        </p>

         <p>
           score:
            {" "}
            {
           riskAssessment.score
          }
        </p>

         <p>
           riskLevel:
            {" "}
            {
           riskAssessment.riskLevel
          }
        </p>

    
     </div>
   )
   }
   
 </div>
)

}




