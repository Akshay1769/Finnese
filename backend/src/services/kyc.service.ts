import Kyc from "../models/kyc.model";

interface CreateKycData {
  userId: string;
  panNumber: string;
  aadhaarNumber: string;
  address: string;
  occupation: string;
}

interface UpdateKycData {
  panNumber?: string;
  aadhaarNumber?: string;
  address?: string;
  occupation?: string;
}


export const createKyc = async ( kycData : CreateKycData ) => {

    const existingKyc = await Kyc.findOne({
        userId : kycData.userId
    });
    if(existingKyc){
        throw new Error ("Kyc Already Exists");
    }

    const kyc = await Kyc.create(kycData);

    return {
        success : true,
        message : "kyc submitted successfull",
        data : kyc,
    }

};


export const getMyKyc = async (
  userId: string
) => {
  const kyc = await Kyc.findOne({
    userId,
  });

  if (!kyc) {
    throw new Error(
      "KYC not found"
    );
  }

  return {
    success: true,
    data: kyc,
  };
};


export const updateMyKyc = async (
  userId: string,
  updateData: UpdateKycData
) => {
  const kyc = await Kyc.findOne({
    userId,
  });

  if (!kyc) {
    throw new Error(
      "KYC not found"
    );
  }

  if (
    kyc.status === "approved"
  ) {
    throw new Error(
      "Approved KYC cannot be modified"
    );
  }

  const updatedKyc =
    await Kyc.findByIdAndUpdate(
      kyc._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

  return {
    success: true,
    message:
      "KYC updated successfully",
    data: updatedKyc,
  };
};


export const getKycStatus = async (
  userId: string
) => {
  const kyc = await Kyc.findOne({
    userId,
  });

  if (!kyc) {
    throw new Error(
      "KYC not found"
    );
  }

  return {
    success: true,
    status: kyc.status,
  };
};


export const getAllKycs =
  async () => {
    const kycs =
      await Kyc.find()
        .populate(
          "userId",
          "firstName email role"
        );

    return {
      success: true,
      count: kycs.length,
      data: kycs,
    };
  };


export const getKycById = async (
  kycId: string
) => {
  const kyc =
    await Kyc.findById(
      kycId
    ).populate(
      "userId",
      "firstName email role"
    );

  if (!kyc) {
    throw new Error(
      "KYC not found"
    );
  }

  return {
    success: true,
    data: kyc,
  };
};


export const updateKycStatus = async (
  kycId: string,
  status:
    | "pending"
    | "approved"
    | "rejected",
  remarks?: string
) => {
  const kyc =
    await Kyc.findById(
      kycId
    );

  if (!kyc) {
    throw new Error(
      "KYC not found"
    );
  }

  const updatedKyc =
    await Kyc.findByIdAndUpdate(
      kycId,
      {
        status,
        remarks,
      },
      {
        new: true,
        runValidators: true,
      }
    );

  return {
    success: true,
    message:
      "KYC status updated successfully",
    data: updatedKyc,
  };
};


