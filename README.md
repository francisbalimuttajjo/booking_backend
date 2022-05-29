# Booking
# routes
 <h4>/api/v1/users/register , POST</h4>
   <p>request body: {
     firstName:string,
     lastName:string,
     email:string,password:string,passwordconfirm:string
    }<br />
    response:{
  "status": "success",
  "data": "account activation link sent to bafra@gmail.com"
}
</p>

 <h4>/api/v1/users/login ,POST</h4>   
   <p>request body: {    
     email:string,password:string
    }
  <br />
    response:{<br />
status: "success",
  <br />
data: {
user: {
id: string,
firstName: string,
lastName: string,
photo:string,
email:string
},
token: string
}
}
</p>

 <h4>/users/activate-account/:token , GET</h4>  response:{
status: "success",
data: "account activated,login to continue"
}
</p>
 <h4>/api/v1/users/forgotPassword , POST</h4>
   <p>request body: {     
     email:string
    }<br />
    response:{
  "status": "success",
  "data": "activation link sent to fbalimuttajjo@gmail.com"
}
</p>
 <h4>/api/v1/users/passwordReset/:token , POST</h4>
   <p>request body: {     
     password:string,
  passwordConfirm:string  
    }<br />
    response:{
  "status": "success",
  "data": "operation successful"
}
</p>

