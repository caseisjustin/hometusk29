import fs from "fs"
import path from "path"


async function fileRead(filePath){
    filePath = path.join(process.cwd(), "database", filePath)
    try{
        return await fs.readFileSync(filePath, "utf8")
    }catch(err){
        return null
    }
}

function fileWrite(filePath, data){
    filePath = path.join(process.cwd(), "database", filePath)
    try{
        fs.writeFileSync(filePath, data)
        return true
    }catch(err){
        return false
    }
}


export const getUserProfile = async (req, res)=>{
    let userProf = await fileRead("users.json")
    console.log(userProf)
    res.send("OK")
}