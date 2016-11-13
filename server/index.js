const express = require("express");
const path = require("path");
const webpackDevHelper = require("./index.dev.js");

const app = express();

if (process.env.NODE_ENV !== "production") {
  console.log("DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...");
  webpackDevHelper.useWebpackMiddleware(app);
} else {
  console.log("PRODUCTION ENVIRONMENT");
}

app.use(express.static(path.join(__dirname, "public")));

app.listen(4000, () => {
  console.log("App listening on port 4000")
})

