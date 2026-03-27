require('dotenv').config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router")
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json());


app.use("/api/auth", authRouter);

app.use("/api/contact",contactRoute)

app.use(errorMiddleware);
connectDb().then(()=>
    app.listen(8080,()=>
        {
            console.log(`server is running at port 8080`);
        }
    )
)