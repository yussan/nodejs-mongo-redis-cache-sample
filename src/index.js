const Express = require("express");
const DummyData = require("./DummyData");
const Redis = require("./modules/redis");
const PORT = 2020;

const App = Express();

App.get("/fetch", async (req, res) => {
  console.log("Success fetch from database");

  const redis_key = "fetch_1";

  const { reply } = await Redis.get(redis_key);

  if (reply) {
    // cache available
    res.status(200).send(reply);
  } else {
    // get data form db
    const dataFromDb = {
      success: true,
      message: "success fetch data",
      data: DummyData,
    };

    // set redis cache
    Redis.set(redis_key, JSON.stringify(dataFromDb));

    res.status(200).send(dataFromDb);
  }
});

App.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
