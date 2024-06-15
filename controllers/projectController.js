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