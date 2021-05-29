import express from "express";

(async () => {
  const app = express();
  app.get("/", (_req, res) => {
    return res.send("Hello!");
  });
  app.listen(5000, () => console.log("App Started"));
})();
