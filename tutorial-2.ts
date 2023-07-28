import mongoose from "mongoose";

// 1. 建立連線(connection)
// 連線的設定值 "mongodb//{host}:{port}/{db_name}"
const connConfig = "mongodb://127.0.0.1:27017/nodejs-tutorial";
const conn = mongoose.createConnection(connConfig);

// 一旦連線成功,觸發後面的 callback function
conn.on("connected", () => {
  console.log("MongoDB is connected");
});

// 2. 建立Schema & Models
// 建立Schema

const dramaShema = new mongoose.Schema(
  {
    dramaId: String,
    category: String,
    name: String,
    score: Number,
  },
  {
    collection: "dramas-table", // 要操作 collectoin 的 table 名稱
  }
);
// {
//   "_id" : ObjectId("64c36aec26f33f78938803fe"),
//   "dramaId" : "1001",
//   "category" : "犯罪",
//   "name" : "絕命毒師",
//   "score" : NumberInt(10)
// }

// 建立 Model 物件
const dramaModel = conn.model("Dramas", dramaShema);

// 3. 透過 Model物件 進行 CRUD 操作
// 非同步的動作 --> 使用Promise 操作
dramaModel
  .find()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
