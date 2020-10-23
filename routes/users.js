const User = require("../models/user.js")
const express = require('express');
const router = express.Router();

//login
router.get('/login',(request,response)=>{
    response.render('login');
})
router.get('/register',(request,response)=>{
    response.render('register')
    })

//Register handle
router.post('/register',(request,response)=>{
  const { login, email, password, password2} = request.body;
  let errors = [];
  console.log(' Login ' + login+ ' Email :' + email+ ' Mot de passe:' + password);

  if(!login || !email || !password || !password2) {
      errors.push({msg : "Veuillez remplir tous les champs"})
  }
  //check if match
  if(password !== password2) {
      errors.push({msg : "Les mots de passe ne correspondent pas"});
  }

  //check if password is more than 8 characters
  if(password.length < 8 ) {
      errors.push({msg : 'Le mot de passe doit faire au moins 8 caractères.'})
  }

  if(errors.length > 0 ) {
  response.render('register', {
      errors : errors,
      login : login,
      email : email,
      password : password,
      password2 : password2})
  }
  else {
      //validation passed
     User.findOne({email : email}).exec((err,user)=>{
      console.log(user);
      if(user) {
          errors.push({msg: 'Cet email est déjà présent dans notre base de données'});
          render(response,errors,login,email,password,password2);

         } else {
          const newUser = new User({
              login : login,
              email : email,
              password : password
          });
          bcrypt.genSalt(10,(err,salt)=>
bcrypt.hash(newUser.password,salt,
    (err,hash)=> {
        if(err) throw err;
            //save pass to hash
            newUser.password = hash;
        //save user
        newUser.save()
        .then((value)=>{
            console.log(value)
        response.redirect('/users/login');
        })
        .catch(value=> console.log(value));

    }));
 } //ELSE statement ends here




});


}

})
router.post('/login',(request,response,next)=>{
  })

//logout
router.get('/logout',(request,response)=>{
 })

module.exports  = router;
