import InvestmentProduct from "../models/InvestmentProduct.model";
import RiskAssessment from "../models/RiskAssessment.model";
interface CreateInvestmentProductData {
  name: string;

  category:
    | "mutual_fund"
    | "stock"
    | "sip"
    | "insurance";

  riskLevel:
    | "low"
    | "medium"
    | "high";

  expectedReturnMin: number;

  expectedReturnMax: number;

  minimumInvestment: number;

  provider: string;

  description: string;
}


export const createInvestmentProduct = async (
  productData: CreateInvestmentProductData
) => {
  const product =
    await InvestmentProduct.create(
      productData
    );

  return {
    success: true,
    message:
      "Investment product created successfully",
    data: product,
  };
};


export const getInvestmentProducts = async () => {
  const products =
    await InvestmentProduct.find({
      isActive: true,
    });

  return {
    success: true,
    count: products.length,
    data: products,
  };
};


export const getInvestmentProductById = async (
  productId: string
) => {
  const product =
    await InvestmentProduct.findById(
      productId
    );

  if (!product) {
    throw new Error(
      "Investment product not found"
    );
  }

  return {
    success: true,
    data: product,
  };
};


export const getRecommendedProducts = async (
  userId: string
) => {
  const assessment =
    await RiskAssessment.findOne({
      userId,
    });

  if (!assessment) {
    throw new Error(
      "Risk assessment not found"
    );
  }

  const products =
    await InvestmentProduct.find({
      riskLevel:
        assessment.riskLevel,
      isActive: true,
    });

  return {
    success: true,
    riskLevel:
      assessment.riskLevel,
    count: products.length,
    data: products,
  };
};

interface UpdateInvestmentProductData {
    name?: string;
    category?:
      | "mutual_fund"
      | "stock" 
        | "sip"
        | "insurance";
    riskLevel?:
      | "low"
      | "medium"
      | "high";
    expectedReturnMin?: number;
    expectedReturnMax?: number;
    minimumInvestment?: number;
    provider?: string;
    description?: string;
  
}


export const updateInvestmentProduct = async (
    ProductId: string,
    updateData : UpdateInvestmentProductData,
) => {

    const product = await InvestmentProduct.findById(ProductId);

    if (!product) {
        throw new Error("Investment product not found");
    }

    const updatedProduct = await InvestmentProduct.findByIdAndUpdate(
        ProductId,
        updateData, 
        {
            new: true,
            runValidators: true,
        }
    );  

    return {
        success: true,
        message: "Investment product updated successfully",
        data: updatedProduct,
    };
};


export const changeProductStatus = async (
    productId: string,
    isActive: boolean,
) => {
    const product = await InvestmentProduct.findById(productId);

    if (!product) {
        throw new Error("Investment product not found");
    }

    const updatedProduct = await InvestmentProduct.findByIdAndUpdate(
        productId,
        { isActive },
        {
            new: true,
            runValidators: true,
        }
    );

    return {
        success: true,
        message: "Investment product status updated successfully",
        data: updatedProduct,
    };
};



export const deleteInvestmentProduct = async (
  productId: string
) => {
  const product =
    await InvestmentProduct.findByIdAndDelete(
      productId
    );

  if (!product) {
    throw new Error(
      "Investment product not found"
    );
  }

  return {
    success: true,
    message:
      "Investment product deleted successfully",
  };
};