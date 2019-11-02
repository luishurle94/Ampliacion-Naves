class Animacion{
    constructor(imagenSrc, modeloAncho, modeloAlto, velocidadRefresco, framesTotales) {
        this.imagen = new Image();
        this.imagen.src = imagenSrc;

        this.modeloAncho = modeloAncho;
        this.modeloAlto = modeloAlto;

        this.velocidadRefresco= velocidadRefresco;
        this.framesTotales = framesTotales;

        this.frameActual = 0;
        this.frameAncho = this.imagen.width/ this.framesTotales;
        this.frameAlto = this.imagen.height;

        this.rectanguloDibujo = {x:0, y:0, ancho: this.frameAncho, alto : this.frameAlto};
        this.ultimaActualizacion = 0;
    }

    actualizar(){
        this.ultimaActualizacion++;
        if(this.ultimaActualizacion > this.velocidadRefresco){
            this.ultimaActualizacion = 0;
            this.frameActual++;

            if(this.frameActual >= this.framesTotales){
                this.frameActual=0;
            }
        }
        //actualizar el rectangulo (siguiente frame)
        this.rectanguloDibujo.x = this.frameActual * this.frameAncho;
    }

    dibujar (x, y){
        contexto.drawImage(this.imagen, this.rectanguloDibujo.x, this.rectanguloDibujo.y, this.rectanguloDibujo.ancho,
            this.rectanguloDibujo.alto, x - this.modeloAncho/2, y - this.modeloAlto/2,this.modeloAncho, this.modeloAlto);
    }



}