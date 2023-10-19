const express= require('express');
const morgan = require ('morgan');
const  mongoose= require('mongoose')

const Blog=require('./models/blog')


// Setting Up an express App:

const app=express();

// Connect to MongoDB
// const dbURI= 'mongodb+srv://alabiabdullahiayodeji:1234@alabiabdullahiayodeji.jc3hexj.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(dbURI)
// .then((result)=>(app.listen(3000),()=>{
//     console.log('port Running on 3000..')
// }))
// .catch((err)=>{
//     console.log(err)
// });
// mongoose.connection.on('connected',()=>{
//     console.log(`connected to database mongodb @27017`)
// })

// Connect Mongoose offline:
const DB='mongodb://127.0.0.1:27017/Blog'

mongoose.connect(DB, {
    useNewURLParser:true
    // useCreateIndex:true,
    // useFindandModify:false
}).then((result)=>{
    console.log('Connected To Database')
}).catch((err)=>{
    console.log(err)
})






// register ejs
app.set('view engine', 'ejs')


// MIDDLEWARE:it is a server code that runs between request and response

// Listening for request:

app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"));
app.use(morgan('dev'))



// Add Blog
// app.get('/add-blog',(req,res)=>{
//     const blog= new Blog({
//         title:'My new Blog2',
//         snippet:' About my New blog',
//         body:'More About My new Blog'
//     });
//     blog.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// });


// // Get all Blogs
// app.get('/all-blog',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })


// // Get a single blog

// app.get('/single-blog',(req,res)=>{
//     Blog.findById("631c737234a9f9f270880f57")
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })


// Blog Route

app.get('/blogs',(req,res)=>{
   Blog.find().sort({createdAt: -1})
   .then((result)=>{
    res.render('index',{title:'All-Blogs', blog:result})
   })

   .catch((err)=>{
    console.log(err)
   })
})


// HOMEPAGE

// app.get('/',(req, res)=>{
//     // response.send('<h1>Home Page</h1>')
//     // response.sendFile('./views/index.html',{root:__dirname })
//     res.status(200).redirect('/blogs')
    // res.render('create',{title:'Create A new Blog'})
    // adding a title and getting through an array
// 
// console.log(__dirname)
// console.log(__filename)


// ABOUT
app.get('/about',(req, res)=>{
res.status(200).render('about',{title: 'About'})
    // response.sendFile('./views/about.html',{root:__dirname })
    // response.send('<p>About</p>')
})



// Post Request:
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create A new Blog'})
})

app.post('/blogs',(req,res)=>{
   const blog=new Blog(req.body)

   blog.save()
   .then((result)=>{
    res.redirect('/blogs')
   })
   .catch((err)=>{
    console.log(err)
   })
})


app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id
   Blog.findById(id)
   .then((result)=>{
    res.render('Details', {blog:result, title:'Blog Details'})
   }) 
   .catch((err)=>{
    console.log(err)
   })
})

app.delete('/deleteblog/:id',(req, res)=>{
    const id=req.params.id
    console.log(id)
    Blog.findByIdAndRemove(id)
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        console.log(err)
    })
    
})


// 
// <!--  -->
/*  */






// // redirect
// app.get('/about-us',(req, res)=>{
//  res.redirect('/about');
// });



// 404 page

app.use((req, res)=>{
// res.status(404).sendFile('./views/404.html',{root:__dirname })
res.status(404).render('404',{title: '404'})
})

app.listen(8080, ()=>{
    console.log('Listening to port 8080')
})
