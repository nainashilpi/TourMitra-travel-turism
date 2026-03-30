require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const PORT = process.env.PORT || 8080;

// handling cors policy issue
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRoute);

app.use(errorMiddleware);
connectDb().then(() =>
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  }),
);
