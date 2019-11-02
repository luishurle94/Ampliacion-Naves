class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5)
        this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480 * 0.85, 320 * 0.05);
        this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);

        this.fondoVidas = new Fondo(imagenes.icono_vidas, 480 * 0.05, 320 * 0.05);
        this.vidas = new Texto(3, 480 * 0.12, 320 * 0.07);

        this.fondoDisparos = new Fondo(imagenes.icono_municion, 480 * 0.50, 320 * 0.05);
        this.disparos = new Texto(5, 480 * 0.55, 320 * 0.07);

        this.disparosJugador = []

        this.enemigos = [];
        this.enemigos.push(new Enemigo(300, 50));
        this.enemigos.push(new Enemigo(350, 200));

        this.powerup = [];
        this.monedas = [];
        this.bombas = [];
    }

    actualizar() {
        this.fondo.vx = -1;
        this.fondo.actualizar();
        console.log("disparosJugador: " + this.disparosJugador.length);
        //Eliminar disparos fuera de pantalla
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null && !this.disparosJugador[i].estaEnPantalla()) {
                this.disparosJugador.splice(i, 1)
            }
        }
        // Generar Enemigos
        if (this.iteracionesCrearEnemigos == null) {
            this.iteracionesCrearEnemigos = 0;
        }

        // Generar monedas y powerUp
        if (this.itMonedasPower == null) {
            this.itMonedasPower = 500;
        }

        // Generar bombas
        if (this.itbombas == null) {
            this.itbombas = 300;
        }
        this.itbombas--;



        // iteracionesCrearEnemigos tiene que ser un número
        this.iteracionesCrearEnemigos--;

        this.itMonedasPower--;


        if (this.iteracionesCrearEnemigos < 0) {
            var rX = this.generarAleatorio(true);
            var rY = this.generarAleatorio(false);
            this.enemigos.push(new Enemigo(rX, rY));
            this.iteracionesCrearEnemigos = 100;
            //a medida que bajo el número, apareceran 2 enemigos cada x iteración
        }

        if (this.itMonedasPower < 0) {
            var rX = this.generarAleatorio(true);
            var rY = this.generarAleatorio(false);

            this.monedas.push(new Moneda(rX, rY));

            rX = this.generarAleatorio(true);
            rY = this.generarAleatorio(false);

            this.powerup.push(new Powerup(rX, rY));

            this.itMonedasPower = 5000;
        }

        if (this.itbombas < 0) {
            var x = this.generarAleatorio(true);
            var y = this.generarAleatorio(false);

            this.bombas.push(new Bomba(x, y));
            this.itbombas = 200;
        }

        this.jugador.actualizar();
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }

        for (var i = 0; i < this.monedas.length; i++) {
            this.monedas[i].actualizar();
        }

        for (var i = 0; i < this.powerup.length; i++) {
            this.powerup[i].actualizar();
        }

        for (var i = 0; i < this.bombas.length; i++) {
            this.bombas[i].actualizar();
        }

        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }


        // colisiones
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.jugador.colisiona(this.enemigos[i])) {
                if (this.vidas.valor > 1) {
                    this.vidas.valor--;
                    this.enemigos.splice(i, 1);
                } else {
                    this.iniciar();
                }
            }

        }

        // colisiones , disparoJugador - Enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.disparosJugador.splice(i, 1);
                    i = i - 1;
                    if (this.enemigos[j].vida > 1) {
                        this.enemigos[j].vida--;
                    } else {
                        this.enemigos.splice(j, 1);
                        j = j - 1;
                        this.disparos.valor++;
                    }

                    this.puntos.valor++;

                }
            }
        }

        // colisiones jugador moneda
        for (var i = 0; i < this.monedas.length; i++) {
            if (this.jugador.colisiona(this.monedas[i])) {
                this.puntos.valor++;
                this.monedas.splice(i, 1);
            }

        }

        // colisiones jugador power up
        for (var i = 0; i < this.powerup.length; i++) {
            if (this.jugador.colisiona(this.powerup[i])) {
                this.disparos.valor = this.disparos.valor + 10;
                this.powerup.splice(i, 1);
            }

        }

        // colisiones jugador bomba
        for (var i = 0; i < this.bombas.length; i++) {
            if (this.jugador.colisiona(this.bombas[i])) {
                for (var j = 0; j < this.enemigos.length; j++) {
                    if (this.enemigos[j].estaEnPantalla()) {
                        this.enemigos.splice(j, 1);
                        j = j - 1;
                    }
                }
                this.bombas.splice(i, 1);
            }

        }
    }

    dibujar() {
        this.fondo.dibujar();
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }

        this.jugador.dibujar();
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar();
        }

        for (var i = 0; i < this.monedas.length; i++) {
            this.monedas[i].dibujar();
        }

        for (var i = 0; i < this.powerup.length; i++) {
            this.powerup[i].dibujar();
        }

        for (var i = 0; i < this.bombas.length; i++) {
            this.bombas[i].dibujar();
        }
        this.fondoPuntos.dibujar();
        this.puntos.dibujar();


        this.fondoVidas.dibujar();
        this.vidas.dibujar();

        this.fondoDisparos.dibujar();
        this.disparos.dibujar();
    }

    procesarControles() {
        // disparar
        if (controles.disparo) {
            var nuevoDisparo = this.jugador.disparar();
            if (nuevoDisparo != null) {
                if (this.disparos.valor > 0) {
                    this.disparosJugador.push(nuevoDisparo);
                    this.disparos.valor--;
                }
            }

        }

        // Eje X
        if (controles.moverX > 0) {
            this.jugador.moverX(1);

        } else if (controles.moverX < 0) {
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if (controles.moverY > 0) {
            this.jugador.moverY(-1);

        } else if (controles.moverY < 0) {
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }

    generarAleatorio(XoY) {
        if (XoY == true) {
            return Math.random() * (600 - 500) + 500;
        } else {
            return Math.random() * (300 - 60) + 60;
        }
    }


}
