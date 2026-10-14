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

 export const delScan = async (id)=> {
    await Db.execute('DELETE FROM scanhistory WHERE id  = ? ',
        [id]
    )
 }
// 
export const addGenerate = async (value,type,created_at = new Date().toISOString())=> {
   await Db.execute('INSERT INTO generatehis (value,type,created_at) VALUES(?,?,?)',
    [value,type,created_at]
   )
 }

 export const getGenerate = async ()=> {
    const res = await Db.execute('SELECT * FROM generatehis ORDER BY id DESC')
    return res.rows
 }

  export const delGenerate = async (id)=> {
    await Db.execute('DELETE FROM generatehis WHERE id  = ? ',
        [id]
    )
 }