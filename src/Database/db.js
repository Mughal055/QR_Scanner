import { open } from "@op-engineering/op-sqlite";

export const Db = open({name: 'ScanHistory.db'})

Db.execute(`
   CREATE TABLE IF NOT EXISTS scanhistory(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   content TEXT NOT NULL,
   created_at TEXT DEFAULT CURRENT_TIMESTAMP
   ) 
    `)

Db.execute(`
   CREATE TABLE IF NOT EXISTS generatehis(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   value TEXT NOT NULL,
   type TEXT NOT NULL,
   created_at TEXT DEFAULT CURRENT_TIMESTAMP
   )
   `)