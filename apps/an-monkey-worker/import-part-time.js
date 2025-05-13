// 导入模块
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");
const { v4: uuidv4 } = require("uuid");

// 获取工作目录
const workDir = __dirname;
const rootDir = path.resolve(workDir, "../../");
const dataFilePath = path.join(rootDir, "work-data.json");

// 检查文件是否存在
if (!fs.existsSync(dataFilePath)) {
  console.error("Error: work-data.json file not found!");
  process.exit(1);
}

// 读取数据
console.log("Reading data from work-data.json...");
const rawData = fs.readFileSync(dataFilePath, "utf8");
const workData = JSON.parse(rawData);

// 创建SQL语句
console.log("Creating SQL statements...");
const sqlStatements = [];

// 为每条记录创建INSERT语句
workData.forEach((item) => {
  // 处理日期格式，确保是标准格式 YYYY-MM-DD
  const dateParts = item.date.split("-");
  const year = dateParts[0];
  const month = dateParts[1].padStart(2, "0");
  const day = dateParts[2] ? dateParts[2].padStart(2, "0") : "01";
  const formattedDate = `${year}-${month}-${day}`;

  // 生成UUID
  const id = uuidv4();

  // 处理personnel字段
  const personnel = item.personnel || "default";

  // 创建INSERT语句
  const sql = `INSERT INTO "PartTime" ("id", "date", "timestamp", "hours", "project", "description", "personnel", "createdAt", "updatedAt") 
    VALUES ('${id}', '${formattedDate}', ${item.timestamp}, ${item.hours}, '${item.project.replace(/'/g, "''")}', '${item.description.replace(/'/g, "''")}', '${personnel}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

  sqlStatements.push(sql);
});

// 创建临时SQL文件
const sqlFilePath = path.join(workDir, "part-time-import.sql");
fs.writeFileSync(sqlFilePath, sqlStatements.join("\n"));

// 执行导入
console.log("Importing data to D1 database...");
try {
  execSync(
    `npx wrangler d1 execute an-monkey-db --file="${sqlFilePath}" --remote`,
    { stdio: "inherit" },
  );
  console.log("Data import completed successfully!");
} catch (error) {
  console.error("Error importing data:", error.message);
} finally {
  // 清理临时文件
  fs.unlinkSync(sqlFilePath);
}
