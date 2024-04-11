# JOB_PORTAL_BACKEND

This is the backend of a job-portal application built with Node.js, Express, and MongoDB. It handles user authentication, post creation, and post interaction.



# LINKS:

- Render link: https://jobs-portal-2d5j.onrender.com
- Postman Docs: https://documenter.getpostman.com/view/29192923/2sA3BhdZwM


# API's:

  ### USER
     http://localhost:5000/api/user/new/user
     http://localhost:5000/api/user/login
     http://localhost:5000/api/user//update/user
     http://localhost:5000/api/user/viewall/job
     http://localhost:5000/api/user/apply/job/:jobid/:userid
     http://localhost:5000/api/user//save/job/:id
     
  ## ADMIN
     http://localhost:5000/api/admin/new/admin
     http://localhost:5000/api/admin/login
     http://localhost:5000/api/admin/new/application/:adminid
     http://localhost:5000/api/admin/update/application/:id
     http://localhost:5000/api/admin/delete/application/6616c1801dbd08cf1f97e62f
     http://localhost:5000/api/admin//view/applicant/:id
     http://localhost:5000/api/admin/jobs/:id/status/change
     http://localhost:5000/api/admin/applicant/:id/:applicantid
    
# env files
- MONGODB_URL
- JWT_SECRET

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install the software and how to install them:

- Node.js
- MongoDB
- npm

### Installing
A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository
2. Install dependencies
3. Create a `.env` file in the root directory and add the following:
4. Start the server
