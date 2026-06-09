import RiskAssessment from "../models/RiskAssessment.model";
import Kyc from "../models/kyc.model";


interface RiskAssessmentData {
  userId: string;
  investmentHorizon: number;
  marketReaction: number;
  riskTolerance: number;
}

const calculateRiskLevel = (score: number) => {
  if (score <= 4) {
    return "low";
  }

  if (score <= 7) {
    return "medium";
  }

  return "high";
};

export const createRiskAssessment = async (assessmentData: RiskAssessmentData) => {
  const existingAssessment = await RiskAssessment.findOne({
    userId: assessmentData.userId,
  });

  if (existingAssessment) {
    throw new Error(
      "Risk assessment already exists"
    );
  }

  const kyc = await Kyc.findOne({
  userId: assessmentData.userId,
    });

    if (!kyc || kyc.status !== "approved") {
      throw new Error(
        "Approved KYC required"
      );
    }

  
    const score = 
      Number(assessmentData.investmentHorizon) +
      Number(assessmentData.marketReaction) +
      Number(assessmentData.riskTolerance);
    

  const riskLevel =
    calculateRiskLevel(score);

  const assessment =
    await RiskAssessment.create({
      ...assessmentData,
      score,
      riskLevel,
    });

  return {
    success: true,
    message:
      "Risk assessment completed",
    data: assessment,
  };
};

export const getMyRiskAssessment = async (userId: string) => {
  const assessment =
    await RiskAssessment.findOne({
      userId,
    });

  if (!assessment) {
    throw new Error(
      "Risk assessment not found"
    );
  }

  return {
    success: true,
    data: assessment,
  };
};

export const updateRiskAssessment = async (userId: string, assessmentData: Omit<RiskAssessmentData, "userId">) => {
  const assessment =
    await RiskAssessment.findOne({
      userId,
    });

  if (!assessment) {
    throw new Error(
      "Risk assessment not found"
    );
  }

  const score =
    Number(assessmentData.investmentHorizon) +
    Number(assessmentData.marketReaction) +
    Number(assessmentData.riskTolerance);

  const riskLevel =
    calculateRiskLevel(score);

  const updatedAssessment =
    await RiskAssessment.findByIdAndUpdate(
      assessment._id,
      {
        ...assessmentData,
        score,
        riskLevel,
      },
      {
        new: true,
        runValidators: true,
      }
    );

  return {
    success: true,
    message:
      "Risk assessment updated",
    data: updatedAssessment,
  };
};

export const getAllRiskAssessments = async () => {
  const assessments =
    await RiskAssessment.find()
      .populate(
        "userId",
        "firstName email"
      );

  return {
    success: true,
    count: assessments.length,
    data: assessments,
  };
};

export const getRiskAssessmentById = async (assessmentId: string) => {
  const assessment =
    await RiskAssessment.findById(
      assessmentId
    ).populate(
      "userId",
      "firstName email"
    );

  if (!assessment) {
    throw new Error(
      "Risk assessment not found"
    );
  }

  return {
    success: true,
    data: assessment,
  };
};