import User from "../models/user.model";
import Portfolio from "../models/Portfolio.model";
import Kyc from "../models/kyc.model";
import Notification from "../models/notification.model";
import AdvisorBooking from "../models/advisorBooking.model";
// import user from "../models/user.model"

export const getDashboardStats =
  async (
    userId: string
  ) => {

    const user = await User.findById(userId);
    
    const name = user?.firstName;

    const portfolios =
      await Portfolio.countDocuments({
        userId,
      });

    const notifications =
      await Notification.countDocuments({
        userId,
      });

    const bookings =
      await AdvisorBooking.countDocuments({
        userId,
      });

    const kyc =
      await Kyc.findOne({
        userId,
      });

    return {
      success: true,

      data: {
        name,
        portfolios,
        notifications,
        bookings,

        kycStatus:
          kyc?.status ||
          "not_submitted",
      },
    };
  };