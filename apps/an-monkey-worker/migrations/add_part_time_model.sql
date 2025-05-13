-- Create PartTime table
CREATE TABLE IF NOT EXISTS "PartTime" (
  "id" TEXT PRIMARY KEY,
  "date" DATETIME NOT NULL,
  "timestamp" BIGINT NOT NULL,
  "hours" REAL NOT NULL,
  "project" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "personnel" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add index on personnel for faster queries
CREATE INDEX IF NOT EXISTS "PartTime_personnel_idx" ON "PartTime"("personnel");

-- Add index on date for sorting
CREATE INDEX IF NOT EXISTS "PartTime_date_idx" ON "PartTime"("date"); 