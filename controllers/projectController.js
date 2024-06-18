const projects = require('../models/projectModal')

//add project

exports.addProjectController = async (req,res)=>{
    console.log("inside add project function");
    const {title,languages,github,websites,overview} = req.body
    const userId = req.payload
    const projectImg = req.file.filename
    console.log(title,languages,github,websites,overview,userId,projectImg);

    try{
        const exisitingProject = await projects.findOne({github})
        if(exisitingProject){
            res.status(406).json("Project already in your database .. Add another one!!")
        }else{
            const newProject = new projects({
                title,languages,github,websites,overview,projectImg,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// home project
exports.getHomeProjects = async (req,res)=>{
    console.log("Inside getHomeProjects");
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//All user
exports.allProjectsController = async (req,res)=>{
    console.log("Inside allProjects");
    try{
        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//get user Project
exports.getuserProjectController = async (req,res)=>{
    console.log("Inside getuserProjectProjects");
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}