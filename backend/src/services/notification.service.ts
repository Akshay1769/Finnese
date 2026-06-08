import Notification from "../models/notification.model";
import User from "../models/user.model";
import { sendEmail } from "../services/email.services";


interface CreateNotificationData {
    userId : string;
    title : string;
    message : string;
    type : "KYC" | "PORTFOLIO" | "INVESTMENT" | "BLOG" | "SYSTEM";

}



export const createNotification = async (notificationData: CreateNotificationData) => {
    const user = await User.findById(notificationData.userId);
    if (!user) {
                throw new Error("User not found");
      }
    const email = user.email;
    const notification = await Notification.create(notificationData);
    

        try {
            await sendEmail(
                email,
                notification.title,
                notification.message
            );

            notification.emailSent = true;

            await notification.save();
            }
            catch(error){
            console.log(error);
        }


    return {
        success : true,
        message : "Notification created successfully",
        data : notification,
    };
}



export const getMyNotifications = async (userId : string ) => {
    const notifications = await Notification.find({
        userId,
        isActive : true
    }).sort({
        createdAt : -1
    });

    return {
        success : true,
        count : notifications.length,
        data : notifications
    }

};

export const getNotificationById = async (id: string , role : string , currentUserId : string) => {
    const notification = await Notification.findById(id);

    if (!notification) {
        return {
            success: false,
            message: "Notification not found"
        };
    }

    if (role !== "admin" && notification.userId.toString() !== currentUserId) {
            throw new Error("Access denied");
        
    }

    return {
        success: true,
        data: notification
    };
};

export const markNotificationAsRead = async ( id: string,
  currentUserId: string,
  role: string) => {
    const notification = await Notification.findById(id);
    if (!notification) {
        return {
            success: false,
            message: "Notification not found"
        };
    }

    if (role !== "admin" && notification.userId.toString() !== currentUserId) {
        throw new Error("Access denied");
    }


    notification.isRead = true;
    await notification.save();
    return {
        success: true,
        message: "Notification marked as read"
    };
};

export const deleteNotification = async (id: string , currentUserId : string , role : string) => {
    const notification =
    await Notification.findById(id);

    if (!notification) {
    throw new Error("Notification not found");
    }

    if (
        role !== "admin" &&
    notification.userId.toString() !== currentUserId
    ) {
    throw new Error("Access denied");
    }

    await Notification.findByIdAndDelete(id);

    return {
            success: true,
            message: "Notification deleted successfully"
        };
};




export const getAllNotifications = async () => {
    const notifications = await Notification.find().sort({
        createdAt : -1
    });
    return {
        success : true,
        count : notifications.length,
        data : notifications
    }
};
