"use client"

import {useEffect , useState } from "react";
import { api } from "../../services/api"

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
         await api.get ("/risk-assessment/me");
    

        setriskAssessment(results.data.data);
     }
      catch(error) {
        console.log(error)
        window.alert(error)
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
        if (
            Number(investmentHorizon) < 1 ||
            Number(investmentHorizon) > 10 && Number(marketReaction) < 1 ||
            Number(marketReaction) > 10 && Number(riskTolerance) < 1 ||
            Number(riskTolerance) > 10
            ) {
            alert(
                "Investment Horizon must be between 1 and 10"
            );
            return;
            }
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
    <div className = "p-4 bg-mist-800" >
        <h1 className = "text-3xl">
            RiskAssessment
        </h1>

        <form
        onSubmit = {handleRiskAssessment}
        className = "border p-2 rounded mb-6 space-y-3"
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
    className="border px-4 py-2"
     > Submit 
     </button>

   
    </form>


    {                                                       ////🫨🤯🤯🤯🤯😮😮🤦‍♀️🤦‍♂️🤦😱
       riskAssessment && 
    <div className = "space-y-4">
       
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
   }
 </div>
)

}




