const express = require("express");
const Url = require("./models/url");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly} = require("./middlewares/auth")

const app = express();
const PORT = 8000;

connectToMongoDB("mongodb:///short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", staticRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", urlRoute);

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
