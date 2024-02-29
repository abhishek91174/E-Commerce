'use strict';
const express = require("express")
const app = express()
const path=require("path");
const bodyParser = require("body-parser");
const secretKey = "secretkey"
const mongoose = require('mongoose');
const messagesend=require("./models/model")
const signin_singup_data=require('./models/model_user')
mongoose.set("strictQuery", false);

// include bcrypt module
const bcrypt = require("bcrypt");
const route =express.Router()

// include jsonwebtoken module
const jwt = require("jsonwebtoken");
const database= mongoose.connect('mongodb://localhost:27017/ecommerce')

database.then(() => console.log('Connected!'))
.catch((err) =>
 console.log(err))

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

const static_path=(path.join(__dirname, 'public'));
const views_path=(path.join(__dirname, 'views'));

app.use(express.static(views_path))
app.use(express.static(static_path))
app.set('view engine', 'ejs')

const accessTokenKey = "accessToken";
app.get("/",(req,res)=>{
res.render("index")
})


app.get("/men",(req,res)=>{

    res.render("men")
    
      })
app.get("/women",(req,res)=>{

        res.render("women")
        
          })
app.get("/kids",(req,res)=>{

            res.render("kids")
            
              })
            
app.get("/products",(req,res)=>{

res.render("products")

  })

app.get("/contact",(req,res)=>{

  res.render("contact")
    
    })

app.post("/contact", async(req,res)=>{
try{

    const datasave= new messagesend({
      name:req.body.name,
        contact:req.body.contact,
        message:req.body.message
    })
    const savedata=await datasave.save()
    res.status(201).render("index");	

}catch(err){
res.status(400).send(err)
}

})





app.route("/login")
	.get(function (request,result) {
		result.render("login");
	})
			.post(async function (request, response) {
				// get values from signup form
			 const profileinfo=new signin_singup_data({
				 name:request.body.name,
				 email:request.body.email,
				 password:request.body.password
			 })	

			 const saveinfo= await profileinfo.save()
			 // check if email already exists
				var user = await signin_singup_data.findOne({email:"email"});
				
				if (user != null) {
					response.json({
						"status": "error",
						"message": "Email already exists."
					});
					return true;
				}
				
				// encrypt the password
				bcrypt.hash(password, 10, async function (error, hash) {
				
					// insert in database
					await signin_singup_data.insertMany({
						"name": name,
						"email": email,
						"password": hash,
						"accessToken": ""
					});

					// send the response back to client
					result.json({
						"status": "success",
						"message": "Signed up successfully. You can login now."
					});
					return
				});
			});



	// route for login requests
	app.route("/signup")
	.get(function (request,result) {

		result.render("signup");
	})

	.post(async function (request, result) {

		const getsign=new signin_singup_data({
			email:request.body.email,
			password:request.body.password
		})	

const signdataget=await getsign.save();

		// check if email exists
		var user = await signdataget.findOne({
			email:"email"
		});

		if (user == null) {
			result.status(401).json({
				"status": "error",
				"message": "Email does not exists."
			});
			return false;
		}

		// check if password is correct
		bcrypt.compare(password, user.password, async function (error, isVerify) {
			if (isVerify) {

				// update JWT of user in database
				await signdataget.findOneAndUpdate({email:"email"},
				 {
					$set: {
						"accessToken":accessTokenKey
					}
				});

				result.json({
					"status": "success",
					"message": "Login successfully.",
					"accessToken": accessTokenKey
				});
				
				return false;
			}

			result.json({
				"status": "error",
				"message": "Password is not correct."
			});
		});


		// generate JWT of user
		
		jwt.sign({
			signdataget
		
		}, secretKey, {
			expiresIn: '400s'
		},
		
		(err, token) => {
			response.json({token}), 
			
			'RESTFULAPIs'
		})
			

jwt.verify(request.token,secretKey,(err,authdata)=>{

if(err){
	result.send({results:'data not found due to token expire'})
}
else{

	result.json({message:"accessed",authdata})
}

})

	});


	// create the function to verify the token as a middleware

function verifytoken(req, resp, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        resp.send({result: "data not found"})
    }
}


app.listen(4000,()=>{
	console.log("server is running on the port no:4000")
})

