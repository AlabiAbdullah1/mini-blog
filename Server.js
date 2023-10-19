// we are first to render An HTTP module

const http = require('http');
const fs= require('fs')
const _ = require('lodash')
const express =require('express');

const app=express()

app.get('/about',(req, res)=>{
    res.render('about')
})



const server= http.createServer(function req (req, res){
// Lodash

const num=_.random(0, 20)
console.log(num)

// where we want the function to run once

const greet=_.once(()=>{
    console.log('hello')
})

greet()
greet()


// console.log(req.url, req.method);





// set header content type
res.setHeader('content-Type','text/html');

let path='./views/'

// switch(req.url){
//     case '/':
//     path+='index.html'
//     break;

//     case '/about':
//     path+='about.html'
//     break

//     default:
//     path+='404.html'
//     break;
// }

if(req.url== '/'){
    path+='index.html'
    res.statusCode=200;
}

else if(req.url=='/about'){
    path+='about.html'
    res.statusCode=200;
}

else if(req.url=='/about-blog'){
    res.statusCode=301;//WHich is 'Resource Moved Status Code.
    res.setHeader('Location','/about')
    res.end()
}

else{
    path+='404.html'
    res.statusCode=404;
}
// send an html file

fs.readFile(path,(err,data)=>{
    if(err){
        console.log(err)
        res.end()
    }else{
        // res.write(data);
        res.end(data)
    }
})



// res.write('<head><link rel="stylesheet" href="#"</link></head>')
// res.write('<p>Hello World</p>')
// res.write('<p>Hello World, Again</p>')
// res.end();

})

server.listen(3000, 'localhost', ()=>{
    console.log('Listening for request on port 3000')
})

// response is the response we get from a request