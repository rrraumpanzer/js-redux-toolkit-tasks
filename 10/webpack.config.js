const path = require("path");
const bodyParser = require("body-parser");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const jsonParser = bodyParser.json();

const getProducts = (devServer) => {
  let tasks = [
    { text: "test1", id: "1" },
    { text: "test2", id: "2" },
  ];

  let currentId = tasks.length;

  // GET-запрос '/api/tasks', который возвращает список задач
  devServer.app.get("/api/tasks", (req, res) => {
    res.json(tasks);
  });

  devServer.app.post("/api/tasks", jsonParser, (req, res) => {
    const { text } = req.body;
    const id = (++currentId).toString(); // Инкрементируем currentId и используем его в качестве нового ID
    const newTask = { text, id };
    tasks.push(newTask);
    res.json(newTask);
  });

  // DELETE-запрос '/api/tasks/:id', который удаляет задачу с таким id
  devServer.app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((task) => task.id !== id);
    res.json({ message: `Task with id ${id} deleted` });
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
