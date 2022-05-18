//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO
exports.save = (req, res)=>{
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const password = req.body.password;
    const email = req.body.email;
    const staff = req.body.staff;
    
    conexion.query('INSERT INTO usuariosexamen SET ?',{nombre:nombre, usuario:usuario, password:password, email:email, staff:staff}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/');         
        }
});
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const id = req.body.id_u;
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const password = req.body.password;
    const email = req.body.email;
    const staff = req.body.staff;
    conexion.query('UPDATE usuariosexamen SET ? WHERE id_u = ?',[{nombre:nombre, usuario:usuario, password:password, email:email, staff:staff}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
});
};

// --------------------------------------------------------------------------------------------------------------------
// TIENDA
// --------------------------------------------------------------------------------------------------------------------

//GUARDAR un TIENDA
exports.savetienda = (req, res)=>{
    const nombret = req.body.nombret;
    const sucursal = req.body.sucursal;
    const direccion = req.body.direccion;
    const ciudad = req.body.ciudad;
    const region = req.body.region;
    
    conexion.query('INSERT INTO tiendasexamen SET ?',{nombret:nombret, sucursal:sucursal, direccion:direccion, ciudad:ciudad, region:region}, (error, resultst)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/tienda');         
        }
});
};
//ACTUALIZAR una TIENDA
exports.updatetienda = (req, res)=>{
    const id_t = req.body.id_t;
    const nombret = req.body.nombret;
    const sucursal = req.body.sucursal;
    const direccion = req.body.direccion;
    const ciudad = req.body.ciudad;
    const region = req.body.region;
    conexion.query('UPDATE  tiendasexamen SET ? WHERE id_t = ?',[{nombret:nombret, sucursal:sucursal, direccion:direccion, ciudad:ciudad, region:region}, id_t], (error, resultst)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/tienda');         
        }
});
};



// --------------------------------------------------------------------------------------------------------------------
// PRODUCTOS
// --------------------------------------------------------------------------------------------------------------------

//GUARDAR un Producto
exports.saveproducto = (req, res)=>{
    const nombrep = req.body.nombrep;
    const presupuesto = req.body.presupuesto;
    const costoreal = req.body.costoreal;
    const nota = req.body.nota;
    const tienda = req.body.tienda;
    
    conexion.query('INSERT INTO productosexamen SET ?',{nombrep:nombrep, presupuesto:presupuesto, costoreal:costoreal, nota:nota, tienda:tienda}, (error, resultsp)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/producto');         
        }
});
};
//ACTUALIZAR un PRODUCTO
exports.updateproducto = (req, res)=>{
    const id_p = req.body.id_p;
    const nombrep = req.body.nombrep;
    const presupuesto = req.body.presupuesto;
    const costoreal = req.body.costoreal;
    const nota = req.body.nota;
    const tienda = req.body.tienda;
    conexion.query('UPDATE productosexamen SET ? WHERE id_p = ?',[{nombrep:nombrep, presupuesto:presupuesto, costoreal:costoreal, nota:nota, tienda:tienda}, id_p], (error, resultsp)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/producto');         
        }
});
};
// --------------------------------------------------------------------------------------------------------------------
// COMPRA
// --------------------------------------------------------------------------------------------------------------------

//GUARDAR una COMPRA
exports.savecompra = (req, res)=>{
    const nombrec = req.body.nombrec;
    const fecha = req.body.fecha;
    const cantprod = req.body.cantprod;
  
    
    conexion.query('INSERT INTO comprasexamen SET ?',{nombrec:nombrec, fecha:fecha, cantprod:cantprod}, (error, resultsc)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/compra');         
        }
});
};
//ACTUALIZAR UNA COMPRA 
exports.updatecompra = (req, res)=>{
    const id_c = req.body.id_c;
    const nombrec = req.body.nombrec;
    const fecha = req.body.fecha;
    const cantprod = req.body.cantprod;
    conexion.query('UPDATE comprasexamen SET ? WHERE id_c = ?',[{nombrec:nombrec, fecha:fecha, cantprod:cantprod}, id_c], (error, resultsc)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/compra');         
        }
});
};



// --------------------------------------------------------------------------------------------------------------------
// login
// --------------------------------------------------------------------------------------------------------------------

exports.login = async (req, res)=>{
    try {
        const usuario = req.body.user
        const password = req.body.pass 
        if(!usuario || !password ){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM usuariosexamen WHERE usuario = ?', [usuario], (error, results)=>{
                if( results.length == 0 ) {
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión OK
                    console.log('llega hasta aqui') 
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+user)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuariosexamen WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}
//Profe me falló a ultima hora el JWT, T-T  Y ME FUNCIONO EL FIN DE SEMANA EL  sweet alert 2, PERO AHORA QUE HICE LAS PRUEBAS Y ME ESTABA DEDICANDO A lo del diseño responsive me falló, asi que tuve que sacrlo de la vista login