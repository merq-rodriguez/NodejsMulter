const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const router = Router();

router.get('/', (req, res, next) => {
    res.render('index')
})


router.post('/upload', (req, res, next) => {
    console.log(req.file);
    res.send('Subido')
})

module.exports = router;