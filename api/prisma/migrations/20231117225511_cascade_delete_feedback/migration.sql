-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Upvote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "feedbackId" INTEGER NOT NULL,
    CONSTRAINT "Upvote_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Upvote" ("feedbackId", "id", "userId") SELECT "feedbackId", "id", "userId" FROM "Upvote";
DROP TABLE "Upvote";
ALTER TABLE "new_Upvote" RENAME TO "Upvote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
