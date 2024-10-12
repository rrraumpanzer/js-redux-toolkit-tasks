const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const getProducts = (devServer) => {
  devServer.app.get("/api/data", function (req, res) {
    const users = [
      { id: "user1", username: "user1", name: "User 1" },
      { id: "user2", username: "user2", name: "User 2" },
      { id: "user3", username: "user3", name: "User 3" },
    ];
    const posts = [
      {
        id: "post1",
        author: "user1",
        body: "Первый пост",
        comments: ["comment1", "comment2"],
      },
      {
        id: "post2",
        author: "user2",
        body: "Второй пост",
        comments: ["comment3"],
      },
    ];
    const comments = [
      {
        id: "comment1",
        author: "user2",
        text: "Первый комментарий",
      },
      {
        id: "comment2",
        author: "user3",
        text: "Второй комментарий",
      },
      {
        id: "comment3",
        author: "user3",
        text: "Первый комментарий",
      },
    ];
    const blogPosts = {
      users,
      posts,
      comments,
    };

    res.json(blogPosts);
  });
};

const config = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    onBeforeSetupMiddleware: getProducts,
  },
  // devServer: {
  //   static: "./dist",
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
