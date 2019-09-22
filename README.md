### Mini goodeed backend

The configuration of the cloud infrastructure is done using Terraform and Serverless framework.

We are using AWS as cloud platform using the following services
- API Gateway
- S3
- Lambda
- CloudWatch

Outside of AWS we also use Mongo atlas service to host the database and Netlify to host the Web application. 

In the back folder you will find the API configuration and lambda functions.



### Env file tfvars
You will need to create your tfvar file locally to initialize your environment variables