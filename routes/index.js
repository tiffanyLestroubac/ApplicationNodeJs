const express = require('express');
const router  = express.Router();
//login page
router.get('/', (request,response)=>{
    response.render('homepage');
})
//register page
router.get('/register', (request,response)=>{
    response.render('register');
})

module.exports = router;
