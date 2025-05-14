-- 插入测试数据到PartTime表
INSERT INTO "PartTime" (
  "id", 
  "date", 
  "timestamp", 
  "hours", 
  "project", 
  "description", 
  "personnel", 
  "createdAt", 
  "updatedAt"
) VALUES (
  'test-id-1', 
  '2025-05-15', 
  1747166400000, 
  8.5, 
  '测试项目', 
  '这是一条测试描述', 
  'test', 
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
); 