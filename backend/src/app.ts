import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import portfolioRoutes from "./routes/portfolio.route";
import kycRoutes from './routes/kyc.routes';
import riskAssessmentRoutes from "./routes/riskAssessment.routes";
import investmentProductRoutes from "./routes/investmentProduct.routes";
import notificationRoutes from "./routes/notification.routes";
import blogRoutes from "./routes/blog.routes";
import advisorBookingRoutes from "./routes/advisorBooking.routes";
import chatRoutes from "./routes/chat.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();


app.use(
  cors({
    origin:
      "http://localhost:3000",
    credentials: true,
  })
);


app.use(express.json());

app.get("/" , (req , res) => {
    res.status(200).json({
        success : true,
        message : "finnesese working"
    })
});

app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/portfolios", portfolioRoutes);
app.use("/api/v1/kyc",kycRoutes);



app.use("/api/v1/risk-assessment" , riskAssessmentRoutes );

app.use("/api/v1/investment-products" , investmentProductRoutes);

app.use(
  "/api/v1/notifications",
  notificationRoutes
);

app.use(
  "/api/v1/blogs",
  blogRoutes
);


app.use(
  "/api/v1/advisor-bookings",
  advisorBookingRoutes
);

app.use(
  "/api/v1/chats",
  chatRoutes
);


app.use(
  "/api/v1/dashboard",
  dashboardRoutes
);

export default app;