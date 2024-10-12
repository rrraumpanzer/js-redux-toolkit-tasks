const path = require("path");
const bodyParser = require("body-parser");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const jsonParser = bodyParser.json();

const getProducts = (devServer) => {
  let tasks = [
    { name: "test1", id: "1" },
    { name: "test2", id: "2" },
  ];

  // GET-запрос '/api/tasks', который возвращает список задач
  devServer.app.get("/api/tasks", (req, res) => {
    res.json({ items: tasks });
  });

  // POST-запрос '/api/tasks', который принимает данные и создает задачу
  devServer.app.post("/api/tasks", jsonParser, (req, res) => {
    const { name } = req.body;
    const id = (tasks.length + 1).toString(); // Пример генерации id
    const newTask = { name, id };
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
