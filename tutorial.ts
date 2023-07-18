// 非同步處理機制
// 處理讀取檔案
import fs from "fs";

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
