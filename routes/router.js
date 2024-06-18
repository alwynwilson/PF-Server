const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const getHomeProjects = require('../controllers/projectController')
const allProjectsController = require('../controllers/projectController')
const getuserProjectController = require('../controllers/projectController')

const router = new express.Router()

//register

router.post('/register',userController.registerController)

//login - http://localhost/login
router.post('/login',userController.loginController)

// add project
router.post('/project/add',jwtMiddleware,multerMiddleware.single('projectImg') ,projectController.addProjectController)

//home project
router.get('/get-home-projects',projectController.getHomeProjects)

//All projects
router.get('/all-Projects',jwtMiddleware,projectController.allProjectsController)

//user project
router.get('/user-projects',jwtMiddleware,projectController.getuserProjectController)

module.exports = router 