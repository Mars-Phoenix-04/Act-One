const http = require("node:http");
const basededatos= require("mysql");
const puerto = 2442;

const server = http.createServer((request, response) => {
    //------------------------------------------------------------------------Encabezados
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //------------------------------------------------------------------------ConexionALaPowerosaDB
    const conexion_con_la_base = basededatos.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        //Siempre checa que el nombre este bien porque ya valio queso 3 veces
        database:"act_one_repertorio"
    });
    
    switch(request.method){
        //------------------------------------------------------------------------GET
        case "GET":
            switch (request.url) {
                //-------------------------------------------------------------------------Agarramos los ids de los musicales
                case "/recuperar_musicales":
                        conexion_con_la_base.query("SELECT * FROM `musicales`", (erorr, respuestadb) =>{
                            if (erorr) {
                                console.log(erorr);
                            }else{
                                //console.log(respuestadb);
                                const ids_musicales ={
                                    "ids": respuestadb
                                }

                                response.statusCode = 200;
                                response.setHeader('Content-Type', 'application/json');
                                response.end(JSON.stringify(ids_musicales));
                                conexion_con_la_base.end();
                            }
                        });
                break;

                //-------------------------------------------------------------------------Agarramos los ids de los musicales
                case "/obtener_resenas":
                        conexion_con_la_base.query("SELECT * FROM `resenas`", (error, respuestadb) =>{
                            if (error) {
                                console.log(error);
                            }else{

                                const ids_canciones ={
                                    "ids": respuestadb
                                }

                                response.statusCode = 200;
                                response.setHeader('Content-Type', 'application/json');
                                response.end(JSON.stringify(ids_canciones));
                                conexion_con_la_base.end();
                            }
                        });
                break;

                //-------------------------------------------------------------------------Obtener todas las publicaciones de los muros
                case "/recuperar_publicaciones_del_pinterest_digo_muro":
                        conexion_con_la_base.query("SELECT * FROM `mural_publicaciones`", (errro, respuestadb) =>{
                            if (errro) {
                                console.log(errro);
                            }else{
                                //console.log(respuestadb);
                                const ids_muros ={
                                    "ids": respuestadb
                                }
                                response.statusCode = 200;
                                response.setHeader('Content-Type', 'application/json');
                                response.end(JSON.stringify(ids_muros));
                                conexion_con_la_base.end();
                            }
                        });
                break;

                //-------------------------------------------------------------------------Recuperar todas las canciones que tengo mi poderosisima base de datos
                case "/recuperar_canciones":
                        conexion_con_la_base.query("SELECT * FROM `canciones`", (errorr, respuestadb) =>{
                            if (errorr) {
                                console.log(errorr);
                            }else{
                                console.log(respuestadb);
                                const ids_canciones ={
                                    "ids": respuestadb
                                }
                                response.statusCode = 200;
                                response.setHeader('Content-Type', 'application/json');
                                response.end(JSON.stringify(ids_canciones));
                                conexion_con_la_base.end();
                            }
                        });
                break;
            
                default:
                    //-------------------------------------------------------------------------Aqui lo dificl, obtener la info del musical por medio del id
                        if(request.url.includes("/musical_")){
                            var id_musical = request.url.replace( "/musical_" , "");
                            //console.log(id_musical);

                            conexion_con_la_base.query("SELECT * FROM `musicales` WHERE id ="+ id_musical, (error, musical) => {
                                if (error) {

                                    console.log(error);

                                    var objeto_error = {'mensaje': 'Lo sentimos, pero no hay existe ningun contenido con ese ID'};

                                    response.statusCode = 404;
                                    response.setHeader('Content-Type', 'application/json');
                                    response.end(JSON.stringify(objeto_error));
                                    conexion_con_la_base.end();

                                }else{

                                    if(musical.length < 0 ){
                                        var objeto_error = {'mensaje': 'Sin Resultados, intente de nuevo'};

                                        response.statusCode = 404;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(objeto_error));
                                        conexion_con_la_base.end();
                                    }else{

                                        var infomusical = {
                                            "id": musical[0].id,
                                            "nombre": musical[0].nombre,
                                            "anomusical": musical[0].ano_de_estreno,
                                            "compositor": musical[0].autor,
                                            "sinopsis": musical[0].sinopsis,
                                            "portada":musical[0].img_portada
                                        }
                                        //console.log(infomusical);

                                        response.statusCode = 200;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(infomusical));
                                        conexion_con_la_base.end();
                                    }

                                }
                            });
                        //-------------------------------------------------------------------------Luego obtener la informacion del compositor con el mismo
                        }else if(request.url.includes("/compositor_")){
                            var id_musical_compositor = request.url.replace( "/compositor_" , "");

                            //console.log(id_musical_compositor);

                            conexion_con_la_base.query("SELECT * FROM `autor_compositor` WHERE id_musical ="+ id_musical_compositor, (error, compositor) => {
                                if (error) {

                                    console.log(error);

                                    var objeto_error = {'mensaje': 'Lo sentimos, pero no hay existe ningun contenido con ese ID'};

                                    response.statusCode = 404;
                                    response.setHeader('Content-Type', 'application/json');
                                    response.end(JSON.stringify(objeto_error));
                                    conexion_con_la_base.end();

                                }else{

                                    if(compositor.length < 0 ){
                                        var objeto_error = {'mensaje': 'Sin Resultados, intente de nuevo'};

                                        response.statusCode = 404;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(objeto_error));
                                        conexion_con_la_base.end();
                                    }else{

                                        var infocompositor = {
                                            "id": compositor[0].id,
                                            "nombre": compositor[0].nombre,
                                            "biografia": compositor[0].biografia,
                                            "foto": compositor[0].foto_perfil,
                                        }
                                        //console.log(infocompositor);

                                        response.statusCode = 200;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(infocompositor));
                                        conexion_con_la_base.end();
                                    }

                                }
                            });
                        //-------------------------------------------------------------------------Obtenemos las resenas de ese musical en especifico
                        }else if(request.url.includes("/resenas_")){
                            var id_resenas_por_musicaly = request.url.replace( "/resenas_" , "");
                            //console.log(id_resenas_por_musicaly);
                            conexion_con_la_base.query("SELECT * FROM `resenas` WHERE id_musical ="+ id_resenas_por_musicaly,  (error, resenas) => {
                                if (error) {

                                    console.log(error);

                                    var objeto_error = {'mensaje': 'No existe esa resena, ya valiste'};

                                    response.statusCode = 404;
                                    response.setHeader('Content-Type', 'application/json');
                                    response.end(JSON.stringify(objeto_error));
                                    conexion_con_la_base.end();

                                }else{

                                    if(resenas.length < 0 ){
                                        var objeto_error = {'mensaje': 'Sin Resultados, intente de nuevo'};

                                        response.statusCode = 404;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(objeto_error));
                                        conexion_con_la_base.end();
                                    }else{
                                        //console.log(resenas);

                                        response.statusCode = 200;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(resenas));
                                        conexion_con_la_base.end();
                                    }

                                }
                            }) ;
                        //-------------------------------------------------------------------------Recuperamos todas las publi del muro pinteriano
                        } else if(request.url.includes("/publicaciones_muro_")){
                            var id_publi = request.url.replace( "/publicaciones_muro_" , "");
                            conexion_con_la_base.query("SELECT * FROM `mural_publicaciones` WHERE id_musical ="+ id_publi,  (error, publi) => {
                                if (error) {

                                    console.log(error);

                                    var objeto_error = {'mensaje': 'No existe ninguna publicacion ahi amigo mio'};

                                    response.statusCode = 404;
                                    response.setHeader('Content-Type', 'application/json');
                                    response.end(JSON.stringify(objeto_error));
                                    conexion_con_la_base.end();

                                }else{

                                    if(publi.length < 0 ){
                                        var objeto_error = {'mensaje': 'Sin Resultados, intente de nuevo'};

                                        response.statusCode = 404;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(objeto_error));
                                        conexion_con_la_base.end();
                                    }else{
                                        

                                        response.statusCode = 200;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(publi));
                                        conexion_con_la_base.end();
                                    }

                                }
                            }) ;
                        //-------------------------------------------------------------------------Ahora si nos vamos cancion por cancion
                        } else if(request.url.includes("/canciones_")){
                            var id_cancion = request.url.replace( "/canciones_" , "");
                            conexion_con_la_base.query("SELECT * FROM `canciones` WHERE id_musical ="+ id_cancion,  (error, cancion) => {
                                if (error) {

                                    console.log(error);

                                    var objeto_error = {'mensaje': 'No existe ninguna publicacion ahi amigo mio'};

                                    response.statusCode = 404;
                                    response.setHeader('Content-Type', 'application/json');
                                    response.end(JSON.stringify(objeto_error));
                                    conexion_con_la_base.end();

                                }else{

                                    if(cancion.length < 0 ){
                                        var objeto_error = {'mensaje': 'Sin Resultados, intente de nuevo'};

                                        response.statusCode = 404;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(objeto_error));
                                        conexion_con_la_base.end();
                                    }else{
                                        

                                        response.statusCode = 200;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify(cancion));
                                        conexion_con_la_base.end();
                                    }

                                }
                            }) ;
                        }
                break;
            }
        break;

        //------------------------------------------------------------------------POST
        case "POST":
            
        break;

        //------------------------------------------------------------------------PUT
        case "PUT":
            
        break;

        //------------------------------------------------------------------------DELETE
        case "DELETE":
            
        break;

        case "OPTIONS":
            response.writeHead(204);
            response.end();
        break;

        //------------------------------------------------------------------------DEFAULT
        default:
        
        break;
    }

    /*
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({}));
    */
});

server.listen(puerto, () =>{
    console.log("El servidor está al pendiente y cien por ciento atento en http://localhost:" + puerto);
});