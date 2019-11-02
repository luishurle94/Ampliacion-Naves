// Lista re recursos a precargar
var imagenes = {
    //clave : valor,
    jugador : "res/jugador.png",
    fondo : "res/fondo.png",
    enemigo : "res/enemigo.png",
    enemigo_movimiento : "res/enemigo_movimiento.png",
    disparo_jugador : "res/disparo_jugador.png",
    disparo_enemigo : "res/disparo_enemigo.png",

    icono_puntos : "res/icono_puntos.png",
    icono_vidas: "res/corazon.png",

    icono_municion:"res/ammo.png",
    powerup: "res/icono_recolectable.png",
    moneda:"res/moneda.png",
    bomba:"res/bomb.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
