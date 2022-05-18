const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res)=>{     
    conexion.query('SELECT * FROM usuariosexamen',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('index.ejs', {results:results});            
        }   
    })
})

router.get('/create', (req,res)=>{
    res.render('create');
})

router.get('/edit/:id', (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM usuariosexamen WHERE id_u=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit.ejs', {user:results[0]});            
        }        
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM usuariosexamen WHERE id_u = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    })
});

const crud = require('./controllers/crud');

router.post('/save', crud.save);
router.post('/update', crud.update);

// --------------------------------------------------------------------------------------------------------------------
// TIENDA
// --------------------------------------------------------------------------------------------------------------------


router.get('/tienda', (req, res)=>{     
    conexion.query('SELECT * FROM tiendasexamen',(error, resultst)=>{
        if(error){
            throw error;
        } else {                       
            res.render('listadotienda.ejs', {resultst:resultst});     
                  
        }   
    })
})


router.get('/createtienda', (req,res)=>{
    res.render('createtienda');
})

router.get('/edittienda/:id', (req,res)=>{    
    const id_t = req.params.id;
    conexion.query('SELECT * FROM tiendasexamen WHERE id_t=?',[id_t] , (error, resultst) => {
        if (error) {
            throw error;
        }else{            
            res.render('edittienda.ejs', {tienda:resultst[0]});            
        }        
    });
});


router.get('/deletetienda/:id', (req, res) => {
    const id_t = req.params.id;
    console.log("DELETE FROM tiendasexamen WHERE id_t=?",id_t ); 
    conexion.query('DELETE FROM tiendasexamen WHERE id_t=?',[id_t], (error, resultst)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/tienda');         
        }
    })
});

router.post('/savetienda', crud.savetienda);
router.post('/updatetienda', crud.updatetienda);


// --------------------------------------------------------------------------------------------------------------------
// Producto
// --------------------------------------------------------------------------------------------------------------------

router.get('/producto', (req, res)=>{    
 
    conexion.query('SELECT * FROM productosexamen',(error, resultsp)=>{
        if(error){
            throw error;
        } else {  
            // console.log(resultsp);     esta funcionando la variable resultsp                 
            res.render('listadoproducto.ejs', {resultsp:resultsp});            
        }   
    })

})

router.get('/createproducto', (req,res)=>{
    conexion.query('SELECT * FROM tiendasexamen',(error, resultst)=>{
        res.render('createproducto', {tiendas:resultst}); 
    })
})

router.get('/editproducto/:id', (req,res)=>{    
    const id_p = req.params.id;
    conexion.query('SELECT * FROM productosexamen WHERE id_p=?',[id_p] , (error, resultsp) => {
        if (error) {
            throw error;
        }else{    
            // console.log(resultsp[0]);    Aca tengo un problema porque no me esta agarrando el objeto con los elementos de la bd     
            res.render('editproducto.ejs', {producto:resultsp[0]});            
        }        
    });
});

router.get('/deleteproducto/:id', (req, res) => {
    const id_p = req.params.id;
    console.log("DELETE FROM productosexamen WHERE id_p=?",id_p ); 
    conexion.query('DELETE FROM productosexamen WHERE id_p=?',[id_p], (error, resultsp)=>{
        if(error){
            
            console.log(error);
        }else{   
            console.log(resultsp);
            // console.log("no se porque no se borra");        
            res.redirect('/producto');         
        }
    })
});

router.post('/saveproducto', crud.saveproducto);
router.post('/updateproducto', crud.updateproducto);

// --------------------------------------------------------------------------------------------------------------------
// COMPRAS
// --------------------------------------------------------------------------------------------------------------------


router.get('/compra', (req, res)=>{     
    conexion.query('SELECT * FROM comprasexamen',(error, resultsc)=>{
        if(error){
            throw error;
        } else {  
            // console.log(resultsp);     esta funcionando la variable resultsp                 
            res.render('listadocompra.ejs', {resultsc:resultsc});            
        }   
    })
})

router.get('/createcompra', (req,res)=>{
    res.render('createcompra');
})

router.get('/editcompra/:id', (req,res)=>{    
    const id_c = req.params.id;
    conexion.query('SELECT * FROM comprasexamen WHERE id_c=?',[id_c] , (error, resultsc) => {
        if (error) {
            throw error;
        }else{    
            // console.log(resultsp[0]);    Aca tengo un problema porque no me esta agarrando el objeto con los elementos de la bd     
            res.render('editcompra.ejs', {compra:resultsc[0]});            
        }        
    });
});

router.get('/deletecompra/:id', (req, res) => {
    const id_c = req.params.id;
    conexion.query('DELETE FROM comprasexamen WHERE id_c=?',[id_c], (error, resultsc)=>{
        if(error){
            
            console.log(error);
        }else{   
            console.log(resultsc);
            // console.log("no se porque no se borra");        
            res.redirect('/compra');         
        }
    })
});

router.post('/savecompra', crud.savecompra);
router.post('/updatecompra', crud.updatecompra);


// --------------------------------------------------------------------------------------------------------------------
// Login
// --------------------------------------------------------------------------------------------------------------------

router.get('/login', (req,res)=>{
    res.render('login');
})

router.post('/login', crud.login);
router.post('/isAuthenticated', crud.isAuthenticated);
router.post('/logout', crud.logout);



module.exports = router;