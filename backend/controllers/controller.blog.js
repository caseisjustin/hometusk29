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

export const createBlog = async (req, res) => {
    let blogs = await fileRead("blogs.json")
    if(!blogs)
        res.status(200).send("ok")
    else{
        blogs = await JSON.parse(blogs)
        const {email} = req.body
        let check = false
        blogs.forEach(blogs => {
            if(blogs.email == email){
                check = true
            }
        });
        if(check)
            res.status(400).send(`this blogs with email ${email} already exists`)
        else{
            blogs.push({id: blogs[blogs.length - 1].id + 1, ...req.body})
            blogs = fileWrite("blogs.json", JSON.stringify(blogs))
            if(!blogs)
                res.send("Couldn't write data to file")
            else
                res.status(201).send("Registered successfuly")
        }
    }
}

export const getBlog = async (req, res) => {
    try {
        let blogs = await fileRead("blogs.json")
        blogs = await JSON.parse(blogs)
        blogs.forEach(blog => {
        res.send(`id: ${blog.id}\ntitle: ${blog.title}\nslug: ${blog.slug},\ncontent: ${blog.content},\ntags: ${blog.tags},\ncomments: ${blog.comments}\n\n`)
            
        });
    } catch (err) {
        res.send("An error occured")
    }
}

export const updateBlog = async (req, res) => {
    try {
        let blogs = await fileRead("blogs.json")
        blogs = await JSON.parse(blogs)
        console.log(req.params)
        let checker = false
        if (req.params.id) {
            for (const i in blogs) {
                if (blogs[i].id == req.params.id) {
                    checker = true
                    blogs[i].email = email || blogs[i].email
                    blogs[i].username = username || blogs[i].username
                    blogs[i].fullname = fullname || blogs[i].fullname
                    blogs[i].age = age || blogs[i].age
                    blogs[i].gender = gender || blogs[i].gender
                }
            }
        }
        blogs = JSON.stringify(blogs)
        if (checker) {
            let ch = await fileWrite("blogs.json", blogs)
            if (!ch) 
                res.send("Error writing blog")
            else
                res.send("UPDATED")
        } else
            res.status(400).send("No such blogs")
    } catch (err) {
        res.send("An error occured")
    }
}

export const deleteBlog = async (req, res) => {
    try {
        let blogs = await fileRead("blogs.json")
        blogs = await JSON.parse(blogs)
        const { email, username } = req.body
        let checker = false
        if (email) {
            for (const i in blogs) {
                if (blogs[i].email == email) {
                    checker = true
                    blogs.splice(i, 1)
                }
            }
        }
        else if (username) {
            for (const i in blogs) {
                if (blogs[i].username == username) {
                    checker = true
                    blogs.splice(i, 1)
                }
            }
        }
        if (checker) {
            blogs = JSON.stringify(blogs)
            let ch = await fileWrite("blogs.json", blogs)
            if (!ch) {
                res.send("Error writing dataprofile")
            }
            else
                res.send("DELETED")
        } else
            res.status(400).send("No such blogs")

    }
    catch (err) {
        res.send("Unexpected error occured")
    }
}