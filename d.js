import { readFileSync, writeFileSync } from "node:fs";

// 读取原始JSON数据
const rawData = JSON.parse(readFileSync("income-data.json", "utf-8"));

function convertTimeToDate(timeStr) {
  const [year, month] = timeStr.split(".").map(Number);
  // 由于月份是从0开始的，所以需要减1
  return new Date(year, month - 1, 1);
}

// 处理数据：添加id和时间戳，并转换key为英文
const processedData = rawData.map((item) => ({
  id: crypto.randomUUID(),
  owner: "default",
  time: convertTimeToDate(item.time),
  baseSalary: item["基本工资"],
  overtimeMeal: item["加班饭补"],
  housingFund: item["提取公积金"],
  leaveDeduction: item["事假"] || 0,
  housingFundDeduction: item["公积金"],
  medicalInsurance: item["医疗保险"],
  pensionInsurance: item["养老保险"],
  unemploymentInsurance: item["失业保险"],
  tax: item["扣税"],
  rent: item["房租"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// 将处理后的数据写入新文件
writeFileSync(
  "processed-income-data.json",
  JSON.stringify(processedData, null, 2),
);
