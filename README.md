# Booking
<h4>About the App</h4>
<p>Booking is an hotel booking application  where visitors have the ability to view available hotels, prices,  average ratings,locations and contact information
 <h6>How to use the app</h6>
 <ul><li>Visitors can view available hotels and their prices without loging in </li>
 <li>Visitors need to login to their accounts to book / review hotels </li>
 <li>Visitors can review  a particular hotel once and also rate it  </li>
 <li>Visitors can only rate / review  only hotels  they booked  </li>
 <li>Visitors who have admin status can create/edit/delete an hotel from the database </li>
 <li>Admin can view the hotel along with all bookings associated with it and reviews while others only see reviews </li>
</ul>

 <h6>Getting Started</h6>
 <ul><li>Clone the repo to your local machine </li>
 <li>run yarn install to install all dependencies </li>
 <li>run yarn run dev to start the development server </li>

</ul>

 <h6>Data Flow</h6>
 <ul>
    <li>There are four tables linked with one to many associations</li>
   <li>Booking belongs to both User and Hotel models</li>
   <li>Review belongs to both User and Hotel models</li>
</ul>

</P>

# Technologies
<ul> 
 <li>Node </li>
  <li>Express </li>
  <li>Sequelize </li>
  <li>Postgress DB </li>
</ul>

# routes
   <h4> /api/v1/hotels?name=speke&location=kampala&price=200&range=100-300 ,method:GET</h4>   
  
    response:{"status": "success","data": {"count": number,"rows":[{...hotel},{...hotel} ,...]}}
   <h4>/api/v1/hotels ,method:POST</h4>   
   <p>request body: {    
    name:string,price:number,priceDiscount:number,description:string,mainImage:string,services:[string],contacts:[{phone:number},{email:string}],location:[number,number]
    }
  <br />
    response:{
  "status": "success",
  "data": {
    "name": string,
    "slug":string,
    "price": number,
    "priceDiscount": number,
    "decsription":string,
    "mainImage": string,
  services:[string],contacts:[{phone:number},{email:string}],location:[number,number]
  }
} 
  <h4>/api/v1/hotel/:id ,method:GET</h4>   
    response:{
  "status": "success",
  "data": {...hotel}
}

  <h4>/api/v1/hotel/:id ,method:DELETE</h4>   
    response:{
  "status": "success",
  "data": "operation successfull"
}

 <h4>/api/v1/hotel/:id ,method:PATCH</h4>   
    response:{
  "status": "success",
  "data": "operation successfull"
}
 
 <h4>/api/v1/hotels/top-rated ,method:GET</h4>   
   <p> response:{ "status": "success", "data":[{...hotel},{...hotel},...]}</p>
 <h4>/api/v1/booking/:id ,method:PATCH</h4>   
   <p>request body: {    
      checkin_date:string,nights:number,cash_paid:number
    }
  <br />
    response:{
  "status": "success",
  "data": "operation successfull"
}
</p>

 <h4>/api/v1/booking/:id ,method:DELETE</h4>   
    response:{
  "status": "success",
  "data": "operation successfull"
}


 <h4>/api/v1/hotels/:hotelId/booking ,method:POST</h4>   
   <p>request body: {    
     checkin_date:string,nights:number,hotel_id:number,cash_paid:number
    }
  <br />
    response:{
  "status": "success",
  "data": {
    "nights": number,
    "completed": false,
    "id": number,
    "user": "string",
    "hotel_id": number,
    "checkin_date": string,
    "cash_paid":number
  }
}


 <h4>/api/v1/hotels/:hotelId/reviews ,method:POST</h4>   
   <p>request body: {    
     review:string,rating:number,hotel_id:number
    }
  <br />
    response:{ "status": "success",
  "data": {
    "rating": number,
    "id": number,
    "review": string,
    "user":string,
    "hotel_id": 1
  }
}
</p>

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
    response:
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

