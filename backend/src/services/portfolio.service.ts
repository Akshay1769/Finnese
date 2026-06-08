import Portfolio from "../models/Portfolio.model";

interface CreatePortfolioData {
  name: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
  targetAmount: number;
  userId: string;
}

export const createPortfolio = async (
  portfolioData: CreatePortfolioData
) => {
  const portfolio = await Portfolio.create({
    ...portfolioData,
       currentAmount: 0,
  });

  return {
    success: true,
    message: "Portfolio created successfully",
    data: portfolio,
  };
};



export const getMyPortfolios = async (
  userId: string
) => {
  const portfolios =
    await Portfolio.find({
      userId,
    });

  return {
    success: true,
    count: portfolios.length,
    data: portfolios,
  };
};



export const getPortfolioById = async (portfolioId: string,currentUserId: string,role: string) => {
  
  const portfolio =
    await Portfolio.findById(
      portfolioId
    ).populate(
      "userId",
      "firstName email role"
    );

  if (!portfolio) {
    throw new Error(
      "Portfolio not found"
    );
  }

    if (
    role !== "admin" &&
    portfolio.userId._id.toString() !==
      currentUserId
  ) {
    throw new Error(
      "Access denied"
    );
  }

  return {
    success: true,
    data: portfolio,
  };
};


interface UpdatePortfolioData {
  name?: string;
  description?: string;
  riskLevel?: "low" | "medium" | "high";
  targetAmount?: number;
}

export const updatePortfolio = async (
  portfolioId: string,
  updateData: UpdatePortfolioData,
  currentUserId: string,
  role: string
) => {
  const portfolio =
    await Portfolio.findById(
      portfolioId
    );

  if (!portfolio) {
    throw new Error(
      "Portfolio not found"
    );
  }

  if (
    role !== "admin" &&
    portfolio.userId.toString() !==
      currentUserId
  ) {
    throw new Error(
      "Access denied"
    );
  }

  const updatedPortfolio =
    await Portfolio.findByIdAndUpdate(
      portfolioId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

  return {
    success: true,
    message:
      "Portfolio updated successfully",
    data: updatedPortfolio,
  };
};


export const updatePortfolioStatus = async (portfolioId: string, isActive: boolean, currentUserId: string, role: string) => {
  const portfolio = await Portfolio.findById(portfolioId);

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  if (
    role !== "admin" &&
    portfolio.userId.toString() !== currentUserId
  ) {
    throw new Error("Access denied");
  }

  const updatedPortfolio = await Portfolio.findByIdAndUpdate(
    portfolioId,
    { isActive },
    {
      new: true,
      runValidators: true,
    }
  );

  return {
    success: true,
    message: `Portfolio ${isActive ? "activated" : "deactivated"} successfully`,
    data: updatedPortfolio,
  };
};