const express=require('express')
const app=express()
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const bodyParser = require("body-parser")
const swaggerUI = require("swagger-ui-express");

const categoryRoute=require('./routes/categoryRoute')
const vacancyRoute=require('./routes/vacanciesRoute')
const userRoute=require('./routes/userRoute')
const authRoute=require('./routes/authRoute')
const resumeRoute=require('./routes/resumeRoute')
const authCompanyRoute=require('./routes/authCompanyRoute')
const companyRoute=require('./routes/companyRoute')
const applicationRoute=require('./routes/applicationRoute')
const favouriteRoute=require('./routes/favouriteRoute')
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Job Search API Version 1.0',
        version: '1.0.0',
        description: 'Job Search API',
      },
      tags:[
        {
          name: 'Users',
          description: 'Operations related to users',
        },
        {
          name: 'Applications',
          description: 'Operations related to applications',
        },
        {
          name: 'CompanyAuth',
          description: 'Operations related to company auth',
        },
        {
          name: 'UserAuth',
          description: 'Operations related to user auth',
        },
        {
          name:"Favourites",
          description: 'Operations related to favourites'
        },
        {
          name:"Vacancies",
          description: 'Operations related to Vacancies'
        }
      ],
      servers: [
        {
          url: 'http://localhost:6013',
          description: 'Development server',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to the API routes
  };
dotenv.config()
mongoose.connect(process.env.DB)
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/uploads',express.static("uploads"))
app.use("/api/categories",categoryRoute)
app.use("/api/vacancies",vacancyRoute)
app.use('/api/users',userRoute)
app.use('/api/',authRoute)
app.use('/api/resumes',resumeRoute)
app.use('/api/',authCompanyRoute)
app.use('/api/companies',companyRoute)
app.use('/api/applications',applicationRoute)
app.use('/api/favourites',favouriteRoute)
app.listen(process.env.PORT||6000,console.log(`app runnng on port ${process.env.PORT}`))

