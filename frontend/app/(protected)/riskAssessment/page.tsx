"use client"

import {useEffect , useState } from "react";
import { api } from "@/services/api"
import Loading from "@/components/pageloader"

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
      <Loading/>
    </div>
)
}

return (
  <div
    className="
      min-h-screen
      max-w-6xl
      mx-auto
      px-6
      py-8
      relative
    "
  >

    {/* Header */}

    <div className="mb-10">

      <h1
        className="
          text-4xl
          font-black
          text-white
        "
      >
        Risk Assessment
      </h1>

      <p
        className="
          text-white/50
          mt-2
        "
      >
        Discover your investment risk profile and financial behavior.
      </p>

    </div>

    {/* Assessment Form */}

    <form
      onSubmit={handleRiskAssessment}
      className="
        bg-gray-900/80

        border
        border-white/10

        rounded-3xl

        p-8

        max-w-2xl

        mx-auto

        space-y-5

        shadow-xl

        mb-10
      "
    >

      <div>

        <label
          className="
            block
            text-white/70
            mb-2
          "
        >
          Investment Horizon
        </label>

        <select
          value={investmentHorizon}
          onChange={(e) =>
            setinvestmentHorizon(
              e.target.value
            )
          }
          className="
            w-full

            p-3

            bg-black

            border
            border-white/10

            rounded-xl

            text-white

            focus:outline-none
            focus:border-amber-400
          "
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

      </div>

      <div>

        <label
          className="
            block
            text-white/70
            mb-2
          "
        >
          Market Reaction
        </label>

        <select
          value={marketReaction}
          onChange={(e) =>
            setmarketReaction(
              e.target.value
            )
          }
          className="
            w-full

            p-3

            bg-black

            border
            border-white/10

            rounded-xl

            text-white

            focus:outline-none
            focus:border-amber-400
          "
        >
          <option value="">
            Select Market Reaction
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

      </div>

      <div>

        <label
          className="
            block
            text-white/70
            mb-2
          "
        >
          Risk Tolerance
        </label>

        <select
          value={riskTolerance}
          onChange={(e) =>
            setriskTolerance(
              e.target.value
            )
          }
          className="
            w-full

            p-3

            bg-black

            border
            border-white/10

            rounded-xl

            text-white

            focus:outline-none
            focus:border-amber-400
          "
        >
          <option value="">
            Select Risk Tolerance
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

      </div>

      <button
        type="submit"
        className="
          w-full

          bg-amber-400

          text-black

          font-bold

          py-3

          rounded-xl

          hover:bg-amber-300

          hover:scale-[1.02]

          transition-all
          duration-300
        "
      >
        Submit Assessment
      </button>

    </form>

    {!riskAssessment ? (

      <div
        className="
          bg-gray-900/80

          border
          border-white/10

          rounded-3xl

          p-12

          text-center
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          No Risk Assessment Found
        </h2>

        <p
          className="
            text-white/50
            mt-3
          "
        >
          Complete the assessment above to discover your risk profile.
        </p>

      </div>

    ) : (

      <div
        className="
          bg-gray-900/80

          border
          border-white/10

          rounded-3xl

          p-8

          max-w-3xl

          mx-auto
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-white

            mb-6
          "
        >
          Assessment Results
        </h2>

        <div
          className="
            grid
            md:grid-cols-2
            gap-6
          "
        >

          <div
            className="
              bg-black

              border
              border-white/10

              rounded-2xl

              p-4
            "
          >
            <p className="text-white/50 text-sm">
              Investment Horizon
            </p>

            <p className="text-2xl font-bold text-white">
              {riskAssessment.investmentHorizon}
            </p>
          </div>

          <div
            className="
              bg-black

              border
              border-white/10

              rounded-2xl

              p-4
            "
          >
            <p className="text-white/50 text-sm">
              Market Reaction
            </p>

            <p className="text-2xl font-bold text-white">
              {riskAssessment.marketReaction}
            </p>
          </div>

          <div
            className="
              bg-black

              border
              border-white/10

              rounded-2xl

              p-4
            "
          >
            <p className="text-white/50 text-sm">
              Risk Tolerance
            </p>

            <p className="text-2xl font-bold text-white">
              {riskAssessment.riskTolerance}
            </p>
          </div>

          <div
            className="
              bg-black

              border
              border-white/10

              rounded-2xl

              p-4
            "
          >
            <p className="text-white/50 text-sm">
              Score
            </p>

            <p className="text-2xl font-bold text-amber-400">
              {riskAssessment.score}
            </p>
          </div>

        </div>

        <div className="mt-8">

          <span
            className={`
              inline-flex

              px-4
              py-2

              rounded-full

              text-sm
              font-medium

              ${
                riskAssessment.riskLevel === "high"
                  ? "bg-red-500/10 text-red-400"
                  : riskAssessment.riskLevel === "medium"
                  ? "bg-amber-500/10 text-amber-400"
                  : "bg-emerald-500/10 text-emerald-400"
              }
            `}
          >
            Risk Level: {riskAssessment.riskLevel}
          </span>

        </div>

      </div>

    )}

  </div>
);

}




