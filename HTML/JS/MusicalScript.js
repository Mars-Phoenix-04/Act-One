//FondoNegroParaFormularios(No es negro)
const fonditonegro = document.querySelector(".fondonegro");
fonditonegro.style.display="none";
const todoelhtml = document.querySelector("html");

//BarraEncabezadoNav
const nav = document.querySelector(".MenuEncabezado");
    
//Datos del musical que seleccionamos en el carrusel
const DatosDelMusical = localStorage.getItem("MusicalQueVamosAWachar");
const MusicalQueLeVamosAHacerPlay = JSON.parse(DatosDelMusical);
//console.log("MusicalQueLeVamosAHacerPlay");
const idMusical = MusicalQueLeVamosAHacerPlay.id;

//Seccion del Musical
const NombreDelMusicalCR = document.querySelector(".NombreMusical");
const AnoMusicalCR = document.querySelector(".FechaMusical");
const CompositorCR = document.querySelector(".AutorMusical");
const IMGPortadaCR = document.querySelector(".ImagenPortadaMusical");
const SinopsisCR = document.querySelector(".SinopsisMusical");

//Seccion de Canciones
const SNoCancion = document.querySelector(".NoCancion");
const SNombreCancion = document.querySelector(".TituloDeLaCancion");
const SDuracionCancion = document.querySelector(".DuracionDeCancion");
const SAlbumCancion = document.querySelector(".AlbumDeCancion");

//Seccion de Compositor
const NombreDelCompositor = document.querySelector(".NombreCompositor");
const BiografiaDelCompositor = document.querySelector(".BiografiaCompositor");
const FotoDelCompositor = document.querySelector(".ImagenDelAutor");

//Reseñas
const ContenedorResenas = document.querySelector(".resenadeusuarioContenedor");
const resena = document.querySelector(".resena");
resena.style.display = "none";

//Reseñas Nuevas Formulario Super Waos
const BTNAgregarNuevaResena = document.querySelector(".AgregarResenaBTN");
const FormularioParaResena = document.querySelector(".formularioparaagregarresena");
const BTNEnviarResena = document.querySelector(".EnviarResena");
FormularioParaResena.style.display = "none";
const BTNCerrarResena = document.querySelector(".BTNCerrarFResena");

//Publicaciones
const ContenedorMuroPublicaciones = document.querySelector(".MuralDeImagenes");
const publicacionmuro = document.querySelector(".ImagenMural");
publicacionmuro.style.display = "none";

//Canciones
const ContenedorDeCanciones = document.querySelector(".TodasToditasListaCanciones");

//Reproductor
const nombre = document.querySelector(".NombreDeLaCancionEnReproduccion");
const album = document.querySelector(".AlbumDeLaCancionEnReproduccion");
const portadaimg = document.querySelector(".PortadaDeLaCancionEnReproduccion");
const duracion = document.querySelector(".DuracionDeTodaLaCanción");
const etiquetaaudio = document.querySelector("audio");
etiquetaaudio.volume = 0.3; //Para no dejar a nadie sordo

//Si o no
let haymusica = false;
const botonplaydelreproductor = document.querySelector(".BotonPlayReproductor");
const botonpausadelreproductor = document.querySelector(".BotonPausaReproductor");
const botonplaydelesacosamusical = document.querySelector(".BotonPlay");
const botonpausadelesacosamusical = document.querySelector(".BotonPausa");
const botondelreproductor = document.querySelector(".BTNReproduccionCancion");
const botonchidoconhojitas = document.querySelector(".BotonReproduccion");

//-----------------------------------------------------------------------El mismo que el index
window.addEventListener("scroll", () => {
    //console.log(window.scrollY);
    if (window.scrollY >= 100) {
        nav.classList.add("vUELVE");
    } else {
        nav.classList.remove("vUELVE");
    }
});

//----------------------------------------------------------------------Recuperar la informacion del musical
fetch("http://localhost:2442/musical_" + idMusical).then(info => info.json()).then(musical => {
    //console.log(musical);
    NombreDelMusicalCR.innerHTML = musical.nombre;
    AnoMusicalCR.innerHTML = musical.anomusical;
    CompositorCR.innerHTML = "Por " + musical.compositor;

    const arregloBytes = new Uint8Array(musical.portada.data);
    const blob = new Blob([arregloBytes]);
    var portadasrc = URL.createObjectURL(blob);
    IMGPortadaCR.src = portadasrc;

    SinopsisCR.innerHTML = musical.sinopsis;

    //----------------------------------------------------------------------Recuperar la informacion del compositor
    fetch("http://localhost:2442/compositor_" + idMusical).then(info => info.json()).then(compositor => {
        //console.log(compositor);
        NombreDelCompositor.innerHTML = compositor.nombre;

        const arregloBytes = new Uint8Array(compositor.foto.data);
        const blob = new Blob([arregloBytes]);
        var fotocomposrc = URL.createObjectURL(blob);
        FotoDelCompositor.src = fotocomposrc;

        BiografiaDelCompositor.innerHTML = compositor.biografia;
    });
});

//----------------------------------------------------------------------Recuperar todas toditas las reseñas
fetch("http://localhost:2442/obtener_resenas").then(info => info.json()).then( todaasresenas => {
    fetch("http://localhost:2442/resenas_" + idMusical).then(info => info.json()).then(resenas => {
        //console.log(resenas);
        //console.log(todasresenas.ids.length);
        //console.log(resenas.length);

        for ( i = 0; i < resenas.length; i++) {
            const clon = resena.cloneNode(true);
            ContenedorResenas.appendChild(clon);

            const tituloresena = clon.querySelector(".TituloDeLaResena");
            const descricpcionresena = clon.querySelector(".DescripcionDeLaResena");
                
            tituloresena.innerHTML = resenas[i].titulo;
            descricpcionresena.innerHTML = resenas[i].descripcion;

            clon.style.display = "flex";
        }
    });

});

//----------------------------------------------------------------------Obtener las publicaciones de muro
fetch("http://localhost:2442/recuperar_publicaciones_del_pinterest_digo_muro").then(info => info.json()).then( todaslaspublis => {
    //console.log(todaslaspublis);

    fetch("http://localhost:2442/publicaciones_muro_" + idMusical).then(info => info.json()).then(publicaciones => {
        //console.log(publicaciones);
        for ( i = 0; i < publicaciones.length; i++) {

            const clonpubli = publicacionmuro.cloneNode(true);
            ContenedorMuroPublicaciones.appendChild(clonpubli);

            const titulodelapublicacion = clonpubli.querySelector(".titulodelapublicacion");
            const descripciondelapublicacion = clonpubli.querySelector(".descripciondelapublicacion");
            const autordelapublicacion = clonpubli.querySelector(".autordelapublicacion");
            const likesdelapublicacion = clonpubli.querySelector(".ContadorLikesPublicacion");
            const ImagenPubli = clonpubli.querySelector(".imagendelapublicacion");

            titulodelapublicacion.innerHTML = publicaciones[i].titulo_publi;
            descripciondelapublicacion.innerHTML = publicaciones[i].descripcion_publi;
            autordelapublicacion.innerHTML = "Por " + publicaciones[i].autor_publi;
            likesdelapublicacion.innerHTML = publicaciones[i].likes;

            const arregloBytes = new Uint8Array(publicaciones[i].img_publi.data);
            const blob = new Blob([arregloBytes]);
            var imagenpublicacion = URL.createObjectURL(blob);
            ImagenPubli.src = imagenpublicacion;

            clonpubli.style.display = "block";
        }
    });

});

//----------------------------------------------------------------------Obtener Canciones WAOS
fetch("http://localhost:2442/recuperar_canciones").then(info => info.json()).then( canciones => {
    //console.log(canciones);

    fetch("http://localhost:2442/canciones_"  + idMusical).then(info => info.json()).then(listacanciones => {
        //console.log(listacanciones);
        for ( i = 0; i < listacanciones.length; i++) {
            const cancion_clon = document.createElement("div");
            cancion_clon.className = "Cancion";

            cancion_clon.innerHTML = `
                <div class="NoCancion">${listacanciones[i].no_cancion}</div>
                <div class="TituloDeLaCancion">${listacanciones[i].titulo}</div>
                <div class="DuracionDeCancion">${listacanciones[i].duracion}</div>
                <div class="AlbumDeCancion">${listacanciones[i].album}</div>
            `;

            const cancionmusicaetc = listacanciones[i];

            cancion_clon.addEventListener("click", () => {
                reproducirCancion(cancionmusicaetc);
            });

            ContenedorDeCanciones.appendChild(cancion_clon);
        }
    });

});
//----------------------------------------------------------------------Reproducir la cancion selecionnada de la lista
function reproducirCancion(cancion) {

    console.log(cancion.duracion);
    nombre.innerHTML = cancion.titulo;
    album.innerHTML = cancion.album;
    duracion.innerHTML = cancion.duracion;

    const arregloBytes = new Uint8Array(cancion.portada_album.data);
    const blob = new Blob([arregloBytes]);
    var imagencancion = URL.createObjectURL(blob);
    portadaimg.src = imagencancion;

    etiquetaaudio.src = cancion.audio; 
    etiquetaaudio.play();
}

//---------------------------------------------------------------------- Intentando que los botones de play puedan pausar y continuar o play
function pausarycontinuaresperofuncionepadre() { //Solo cambia estilos
    if(haymusica){
        botonplaydelreproductor.style.display = "none";
        botonplaydelesacosamusical.style.display = "none";
        botonpausadelesacosamusical.style.display = "block";
        botonpausadelreproductor.style.display = "block";
        
    }else{
        botonplaydelreproductor.style.display = "block";
        botonplaydelesacosamusical.style.display = "block";
        botonpausadelesacosamusical.style.display = "none";
        botonpausadelreproductor.style.display = "none";
    }
}
function pausaYplayPORFAVORFUNCIONA (){ //la verdadera magia
    if (etiquetaaudio.paused) {
        etiquetaaudio.play();
    } else {
        etiquetaaudio.pause();
    }
}
botondelreproductor.addEventListener("click", pausaYplayPORFAVORFUNCIONA);
botonchidoconhojitas.addEventListener("click", pausaYplayPORFAVORFUNCIONA);

etiquetaaudio.addEventListener("play", function () { //si esta en play significa que la rola sigue
    haymusica = true;
    pausarycontinuaresperofuncionepadre();
});

etiquetaaudio.addEventListener("pause", function () { //si esta en pausa significa que...pues no hay rola
    haymusica = false;
    pausarycontinuaresperofuncionepadre();
});

//----------------------------------------------------------------------Boton para volver al inicio
function Regresar() {
    window.location.href = "index.html"
};

//-----------------------------------------------------------------------------------------------Funciones de las Nuevas Resenas

BTNAgregarNuevaResena.addEventListener("click", function () {
    FormularioParaResena.style.display = "block";
    fonditonegro.style.display="block";
    todoelhtml.style.overflowY = "hidden";
});

BTNCerrarResena.addEventListener("click", function(){
    FormularioParaResena.style.display = "none";
    fonditonegro.style.display = "none";

    todoelhtml.style.overflowY = "visible";
});
