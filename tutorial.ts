// 非同步處理機制
// 處理讀取檔案
import fs from "fs";
import { resolve } from "path";

// 1. 使用readFileSync
const d1 = fs.readFileSync("modules/data1.json", "utf8");
console.log("d1 完成");
const d2 = fs.readFileSync("modules/data2.json", "utf8");
console.log("d2 完成");
const d3 = fs.readFileSync("modules/data3.json", "utf8");
console.log("d3 完成");

console.log(JSON.parse(d1));
console.log(JSON.parse(d2));
console.log(JSON.parse(d3));

// 何謂Promise
// 專門處理非同步事件的一種物件
// 有Pending/ Fullfilled/ Rejected 三種狀態
// 成功(Fullfiled) 執行.then(...)區塊
// 失敗(Rejected) 執行.catch(...)區塊(.then亦可以)
// Promise 參數為function，並用reslove/ reject 定義 成功/失敗的狀態
// reslove ->將promise 狀態轉為成功，並將data拋給.then執行
// reject ->講promiese 狀態轉為失敗，並將data拋給.catch執行

// 使用Promise
// 1) 宣告Promise
const readFilePromise = (dataPath: any) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// 2) 使用Promise
const output: any = {};
readFilePromise("./modules/data1.json")
  .then((result) => {
    output["data1"] = result;
    return readFilePromise("./modules/data2.json");
  })
  .then((result) => {
    output["data2"] = result;

    return readFilePromise("./modules/data3.json");
  })
  .then((result) => {
    output["data3"] = result;
    console.log(output);
  })
  .catch((err) => {
    console.log("我是.catch 區");
    console.log(err);
  });

const flipCoin = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("上課");
      } else {
        reject("翹課");
      }
    }, 500);
  });
};

flipCoin()
  .then((result) => {
    console.log("我是.then 區");
    console.log(result);
  })
  .then(() => {
    console.log("我是第二個 區");
  })
  .catch((err) => {
    console.log("我是.catch 區");
    console.log(err);
  });
