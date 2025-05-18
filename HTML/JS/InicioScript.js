//Para que el fondo del Nav se vuelva visible o invisible dependiendo del Scroll
const barradenavencabezado = document.querySelector(".MenuEncabezado");

//Carrusel Musical Wiu Wiuuuuu
const ContenedorDelCarruselMusical = document.querySelector(".ContenedorCarrusel");
const FlechitaSVGAnteriorRola = document.querySelector(".ControladoresDelCarruselAnterior");
const FlechitaSVGSiguienteRola = document.querySelector(".ControladoresDelCarruselSiguiente");
let discosHTML = [];

//--------------------------------------------------------------Cambio del fondo de la barra de navegacion
window.addEventListener("scroll", () => {
    //console.log(window.scrollY);
    if (window.scrollY >= 100) {
        barradenavencabezado.classList.add("SeSalioDelBanner");
    } else {
        barradenavencabezado.classList.remove("SeSalioDelBanner");
    }
});

//--------------------------------------------------------------- Carrusel de Musicales
fetch("http://localhost:2442/recuperar_musicales").then(infomusicales => infomusicales.json()).then(musicaleswaos => {
        
        //console.log(musicaleswaos);

        for ( i = 0; i < 6; i++) {

            //const musical = musicaleswaos.ids[i];
            const musical = musicaleswaos.ids[i % musicaleswaos.ids.length]; //El reciclaje es importante:D
            //console.log(musical)

            const arregloBytes = new Uint8Array(musical.img_portada.data);
            const blob = new Blob([arregloBytes]);
            var portadasrc = URL.createObjectURL(blob);
            
            const clondisco = document.createElement("div");
            clondisco.className = "ItemDelCarrusel ItemDelCarrusel_" + (i + 1);

            //Comillas invertidas son chidas
            clondisco.innerHTML = `
                <img class="ImagenGaleria" src="${portadasrc}">
                <div class="NombreMusical">${musical.nombre}</div>
                <div class="AutorMusical">Por ${musical.autor}</div>
            `;
            //Esto no jala
            //clondisco.innerHTML = '<img class="PortadaMusical" src="' + portadasrc + '">' +'<div class="NombreMusical">' + musical.nombre + '</div>' +'<div class="AutorMusical">Por ' + musical.autor + '</div>';

            //console.log(clondisco.toString());

            //Nota del profe(Agrega el href desde la creacion del elemento y cambialo)
            clondisco.onclick = function mandamealmusicaldeseado() {
                const elpowerosomusicalenmediograciasprofe = discosHTML[2];
                if (clondisco == elpowerosomusicalenmediograciasprofe) {
                    
                    localStorage.setItem("MusicalQueVamosAWachar", JSON.stringify(musical));

                    window.location.href = "Musical.html";
                }
            }

            ContenedorDelCarruselMusical.appendChild(clondisco);

            discosHTML.push(clondisco);
        }

        actualizarCarrusel();
});
function actualizarCarrusel() {
    //Recorre todos los musicales en el carrole carrole y los recorre por 1
    discosHTML.forEach((cuadritomusical, i) => {
        //console.log(cuadritomusical)
        cuadritomusical.className = "ItemDelCarrusel ItemDelCarrusel_" + (i + 1);
    });
    //console.log(discosHTML);
}
//--------------------------------------------------------------- FlechitasSVG
function AnteriorMusical() {
    discosHTML.unshift(discosHTML.pop()); //Elimina el ultimo y lo devuelve al inicio como un Ouroboros yum yum
    
    actualizarCarrusel();
};

function SiguienteMusical() {
    discosHTML.push(discosHTML.shift()); //Elimina el primero y lo agrega al final, misma cosa pero al reves
    
    actualizarCarrusel();
};

//--------------------------------------------------------------- Boton de Musical Al Azar FALTA