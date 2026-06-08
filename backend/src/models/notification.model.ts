import mongoose , {Schema , Document } from "mongoose";

export interface INotification extends Document {
    userId : mongoose.Types.ObjectId;

    title : string;

    message : string;

    type :  "KYC" |
            "PORTFOLIO"|
            "INVESTMENT"|
            "BLOG"|
            "SYSTEM";
    
    isRead : boolean;

    emailSent : boolean;

    isActive : boolean;
}

export const notificationSchema = new Schema<INotification>({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    message : {
        type : String,
        required : true,
        trim : true
    },
    type : {
        type : String,  
        enum : ["KYC" , "PORTFOLIO" , "INVESTMENT" , "BLOG" , "SYSTEM"],
        required : true
    },
    isRead : {
        type : Boolean,
        default : false
    },
    emailSent : {
        type : Boolean,
        default : false
    },
    isActive : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
});

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

