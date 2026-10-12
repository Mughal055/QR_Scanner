import { Db } from "./db";

export const addScan = async(content, created_at = new Date().toISOString() )=>{
    await Db.execute(
        'INSERT INTO scanhistory (content,created_at) VALUES(?,?) ',
         [content,created_at]
    ) 
} 

export const getScan = async()=>{
    const res = await Db.execute('SELECT * FROM scanhistory ORDER BY id DESC') 
       return res.rows
} 