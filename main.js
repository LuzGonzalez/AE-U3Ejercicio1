const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');

//conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/u3',{useNewUrlParser:true});

//Definir el esquema a manejar
const productSchema = new mongoose.Schema({
    code: {
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    }
});

//Schema de usuario
const userSchema = new mongoose.Schema({
    name:{
        firstName:{
            type:String,
            required:true         
        },
        lastName:{
            type:String,
            require:true
        }
    },

    email:{
        type: String,
        required:true
    },

    password:{
        type:String
    }
});

//Declarar modelo
const Product = mongoose.model('Product',productSchema,'products');

//Modelo usuario
const User = mongoose.model('User',userSchema,'users');

//Defininir endPoints
const productRouter = express.Router();

//Enpoint usuarios
const userRouter = express.Router();


//Insertar
productRouter.post("/",(req,res)=> {
 const product =req.body; // recibe un json el cual tendra la estructura del schema
 Product.create(product)
 .then(data=>{
     console.log(data);
     res.status(200);
     res.json({code:200,
            msg:"Saved!",
        detail:data
    });
  })
 .catch(error=>{
     console.log(error);
     res.status(400);
     res.json({
         code:400,
         msg:"No se pudo insertar",
         detail:error
     });
 });
});


//Consultar
productRouter.get("/",(req,res)=>{
    Product.find({})
    .then(products=>{
        res.status(200);
        res.json({
            code:200,
            msg:"Consulta exitosa",
            detail:products
        });
    })
    .catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:"Error",
            detail:error
        });
    });
});

//Consultar producto por ID

productRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    Product.find({_id:id})
    .then(product=>{
        res.status(200),
        res.json({
            code:200,
            msg:"Exito",
            detail: product
        });
    })
    .catch(error=>{
        res.status(400),
        res.json({
            code:400,
            msg:"Fallo",
            detail: product
        });
    });
});

//Eliminar
productRouter.delete("/:id",(req,res)=>{
    const{id} = req.params;
    Product.remove({_id:id})
    .then(data=>{
        req.status(200);
        res.json({
            code:200,
            msg:"Se elimino",
            detail:data
        });
    })
    .catch(error=>{
        req.status(400);
        res.json({
            code:400,
            msg:"Error",
            detail:data
        });
    });
});


//Actualizar solo por un campo

productRouter.put("/:id",(req,res)=>{
    const objProducto = req.body;
    const {id} = req.params;
   Product.update({_id:id},req.body)
    .then(data=>{
        req.status(200);
        res.json({
            code:200,
            msg:"Se modifico",
            detail:data
        });
    })
    .catch(error=>{
        req.status(400);
        res.json({
            code:400,
            msg:"Error",
            detail:data
        });
    });
});

//---------------------AQUI EMPIEZA EL CRUD DE USUARIOS-----------------------------------------

//Insertar
userRouter.post("/",(req,res)=> {
    const user =req.body; // recibe un json el cual tendra la estructura del schema
    User.create(user)
    .then(data=>{
        console.log(data);
        res.status(200);
        res.json({code:200,
               msg:"Saved!",
           detail:data
       });
          })
    .catch(error=>{
        console.log(error);
        res.status(400);
        res.json({
            code:400,
            msg:"No se pudo insertar",
            detail:error
        });
    });
   });
   
   
   //Consultar
   userRouter.get("/",(req,res)=>{
       User.find({})
       .then(users=>{
           res.status(200);
           res.json({
               code:200,
               msg:"Consulta exitosa",
               detail:users
           });
       })
       .catch(error=>{
           res.status(400);
           res.json({
               code:400,
               msg:"Error",
               detail:error
           });
       });
   });
   
   //Consultar producto por ID
   
   userRouter.get("/:id",(req,res)=>{
       const id = req.params.id;
       User.find({_id:id})
       .then(user=>{
           res.status(200),
           res.json({
               code:200,
               msg:"Exito",
               detail: user
           });
       })
       .catch(error=>{
           res.status(400),
           res.json({
               code:400,
               msg:"Fallo",
               detail: error
           });
       });
   });


   //Actualizar
   userRouter.put("/:id",(req,res)=>{
    const {id} = req.params;
   User.update({_id:id},req.body)
    .then(data=>{
        req.status(200);
        res.json({
            code:200,
            msg:"Se modifico",
            detail:data
        });
    })
    .catch(error=>{
        req.status(400);
        res.json({
            code:400,
            msg:"Error",
            detail:data
        });
    });
});
   
   //Eliminar
   userRouter.delete("/:id",(req,res)=>{
       const{id} = req.params;
       User.remove({_id:id})
       .then(data=>{
           req.status(200);
           res.json({
               code:200,
               msg:"Se elimino",
               detail:data
           });
       })
       .catch(error=>{
           req.status(400);
           res.json({
               code:400,
               msg:"Error",
               detail:error
           });
       });
   });


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:false}));

app.use("/products",productRouter);
app.use("/users",userRouter);
//Configurando el servidor HTTP
const server = require('http').Server(app);
const port = 3002;

//Ejecutando el servidor
server.listen(port);
console.log(`Running on port ${port}`);







// instalar nodemon
//npm i -g nodemon