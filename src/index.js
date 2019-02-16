const express = require('express');
const ejs = require('ejs');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');


//Init
const app = express();

//Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'), //Establecemos donde se va a guardar la imagen
    filename: (req, file, cb) => {
        cb(null, uuid()+ path.extname(file.originalname)); //Guardamos la imagen con un indentificador unico agregandole la extension
    }
});

app.use(multer({
    storage,
    limits: {fileSize: 2000000}, //Limite del tamaño de la imagen
    dest: path.join(__dirname, 'public/uploads'),
    fileFilter: (req, file, callback) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype); //Valido que la extencion de la imagen se encuentre entre las validas
        const extname = filetypes.test(path.extname(file.originalname)); //extname() -> Devuelve la extencion 
        if(mimetype && extname){
            return callback(null, true);
        }
        callback("Error el archivo no es valido.")
    }
}).single('image'));

//Routes
app.use(require('./routes/index'))




//Start server
app.listen(app.get('port'), () => {
    console.log('====================================');
    console.log(`Runing server in localhost:${app.get('port')}`);
    console.log('====================================');
})