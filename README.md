# Booking
# routes
 <h4>/api/v1/users/register , method:POST</h4>
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

 <h4>/api/v1/users/login ,method:POST</h4>   
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

 <h4>/api/v1/users/updateMe ,method:POST</h4>   
   <p>request body: {    
     email:string,firstName:string,lastName:string,photo:string
    }
  <br />
    response:{<br />
status: "success",
data:"operation successfull
}
</p>

 <h4>/users/activate-account/:token , method:GET</h4>  response:{
status: "success",
data: "account activated,login to continue"
}
</p>
 <h4>/api/v1/users/forgotPassword , method:POST</h4>
   <p>request body: {     
     email:string
    }<br />
    response:{
  "status": "success",
  "data": "activation link sent to fbalimuttajjo@gmail.com"
}
</p>
 <h4>/api/v1/users/passwordReset/:token , method:POST</h4>
   <p>request body: {     
     password:string,
  passwordConfirm:string  
    }<br />
    response:{
  "status": "success",
  "data": "operation successful"
}
</p>
 <h4>/api/v1/users/updatePassword , method:POST</h4>
   <p>request body: {  
 emaail:string,
 currentPassword:string,
     newPassword:string,
  passwordConfirm:string  
    }<br />
    response:{
  "status": "success",
  "data": "password updated"
}
</p>

