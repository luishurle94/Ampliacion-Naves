class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y)

        this.aMover= new Animacion(imagenes.enemigo_movimiento, this.ancho, this.alto, 6 ,3)
        this.animacion= this.aMover;
        this.vy = 0;
        this.vx = 1;
        this.vida=3;
    }

    actualizar (){
        this.animacion.actualizar();

        this.vx = -1;
        this.x = this.x + this.vx;
    }

    dibujar() {
        this.animacion.dibujar(this.x, this.y);
    }

}
