require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/db/db");
const loginAuth = require("./src/routers/loginAuthRouter");
const applicants = require("./src/routers/applicantRecordRouter");
const extractionOfDataFromBinanceFuturesAPI = require("./src/routers/extractionOfDataFromBinanceFuturesAPI");
const roles = require("./src/routers/rolesRouter");

connectDB();

const limiter = rateLimit({});

const app = express();
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("", loginAuth);
app.use("/api", applicants);
app.use("/api/chart", extractionOfDataFromBinanceFuturesAPI);
app.use("", roles);

app.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
});
