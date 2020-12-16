const express = require("express");
const fs = require("fs");
const historyApiFallback = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../config/config");
const webpackConfig = require("../webpack.config");
require("dotenv").config();
const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8083;
const db = process.env.MONGODB_URI;

// Configuration
// ================================================================================================
console.log(db);
// Set up Mongoose
mongoose
  .connect(
    db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// API routes
require("./routes")(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false,
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, "../client/public"),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, "../dist")));
} else if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.get("*", jsonParser, function (req, res) {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    res.end();
  });
}

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  }

  console.info(">>> 🌎 Open http://0.0.0.0:%s/ in your browser.", port);
});

module.exports = app;