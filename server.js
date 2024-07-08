const express=require('express')
const app=express()
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const bodyParser = require("body-parser")
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const categoryRoute=require('./routes/categoryRoute')
const vacancyRoute=require('./routes/vacanciesRoute')
const userRoute=require('./routes/userRoute')
const authRoute=require('./routes/authRoute')
const resumeRoute=require('./routes/resumeRoute')
const authCompanyRoute=require('./routes/authCompanyRoute')
const companyRoute=require('./routes/companyRoute')
const swaggerJSDocs = YAML.load("./api.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
dotenv.config()
mongoose.connect(process.env.DB)
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/categories",categoryRoute)
app.use("/api/vacancies",vacancyRoute)
app.use('/api/users',userRoute)
app.use('/api/',authRoute)
app.use('/api/resumes',resumeRoute)
app.use('/api/',authCompanyRoute)
app.use('/api/companies',companyRoute)
app.listen(process.env.PORT||6000,console.log(`app runnng on port ${process.env.PORT}`))

