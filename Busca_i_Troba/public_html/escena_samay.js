
//Escena inicial. Cada escena s'ha de definir com aquesta.
class Escena_inicial extends Phaser.Scene {

    //Funció que s'encarregarà de precarregar els recursoso que necessita el joc: imatges, sons, fitxers json, etc.
    preload() {
        resize(); //Cridem a la funció per que al redimensionar la finestra, la imatge continui ocupant tota la pantalla
        //window.addEventListener('resize', resize); //Es redimensiona la finestra mitjançant la funció resize quan fem l'acció de redimensionar-la
        this.load.image('escena_inicial', 'imatges_del_joc/Imatge_del_inici.jpg'); //Definim la imatge que volem mostrar per pantalla (nom = fons i ruta on es trova la imatge de l'espai)
        
    }

    //Aquesta funció només s'executa un cop, quan s'inicia el joc. S'encarrega de fer la configuració bàsica i afegir els objectes en pantalla
    create() {
        this.add.sprite(480, 320, 'escena_inicial'); 

        //Definim la zona on l'usuari pot seleccionar l'opció de jugar
        const opcioJugar = this.add.zone(140, 10, 440, 400); //Definim la zona on l'origen (centre) seran les coordenades x=140 i y=10, i que tindrà una amplada de 450px i una alçada de 410px
        opcioJugar.setOrigin(0); //Estableix l'origen de coordenades d'aquesta zona en la seva cantonada superior esquerra i no el seu centre
        opcioJugar.setName('jugar'); //Dona un nom ('nau') a la zona interactiva opcioNau.
        opcioJugar.setInteractive(); //Fem que la zona sigui interactiva per reaccionar quan la seleccioni l'usuari
        opcioJugar.once('pointerdown', () => this.opcioPulsada(opcioJugar)); //Quan seleccionem aquesta zona s'activarà el mètode opcioPulsada passant-li com a paràmetre "opcioNau"
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcioJugar); //Afegim un requadre vermell (0xff0000) de 2 píxels de gruix a la zona de la nau.

        //Definim la zona on l'usuari pot seleccionar l'opció d'abandonar
        const opcioAbandonar = this.add.zone(590, 240, 370, 410);
        opcioAbandonar.setOrigin(0);
        opcioAbandonar.setName('abandonar'); //Dona un nom ('terra') a la zona interactiva opcioNau.
        opcioAbandonar.setInteractive(); //Fem que la zona sigui interactiva per reaccionar quan la seleccioni l'usuari
        opcioAbandonar.once('pointerdown', () => this.opcioPulsada(opcioAbandonar)); //Quan seleccionem aquesta zona s'activarà el mètode opcioPulsada passant-li com a paràmetre "opcioMon"
        this.add.graphics().lineStyle(2, 0x00ff00).strokeRectShape(opcioAbandonar); ////Afegim un requadre verd (0x00ff00) de 2 píxels de gruix a la zona de la terra.
    
        
    
    }

    //Mètode que retorna diferents escenes segons l'àrea pulsa per l'usuari. 
    opcioPulsada(opcio) {
        if (opcio.name === 'jugar') { 
            this.scene.start('Nivell_1_Scene'); 
        } else if(opcio.name === 'abandonar'){ 
            this.scene.start(''); 
        }
    }
}

class EscenaNivell_1 extends Phaser.Scene {

    constructor() {
        super({key: 'Nivell_1_Scene'}); 
    }

    preload() {
        this.load.image('Nivell_1', 'imatges_del_joc/Nivell_1.jpg'); 
    }

    create() {
        this.add.sprite(480, 320, 'Nivell_1'); 
    }
}

class EscenaNivell_2 extends Phaser.Scene {

    constructor() {
        super({key: 'Nivell_2_Scene'});
    }

    preload() {
        this.load.image('Nivell_2', 'imatges_del_joc/Nivell_2.jpg');
    }

    create() {
        this.add.sprite(480, 320, 'Nivell_2');

    }
}


class EscenaNivell_3 extends Phaser.Scene {

    constructor() {
        super({key: 'Nivell_3_Scene'});
    }

    preload() {
        this.load.image('Nivell_3', 'imatges_del_joc/Nivell_3.jpg');
    }

    create() {
        this.add.sprite(480, 320, 'Nivell_3');

    }
}


class Escena_Continuar_o_Abandonar extends Phaser.Scene {

    constructor() {
        super({key: 'Continuar_o_Abandonar_Scene'}); 
    }

    preload() {
        this.load.image('Nivell_Completat', 'imatges_del_joc/Imatge_de_continuar_o_abandonar.jpg'); 
        this.load.audio('musica', 'musica_del_joc/cyberpunk.mp3');
    }

    create() {
        this.add.sprite(480, 320, 'Nivell_Completat'); 
        
        const opcioContinuar = this.add.zone(150, 170, 250, 370);
        opcioContinuar.setOrigin(0);
        opcioContinuar.setName('continuar');
        opcioContinuar.setInteractive();
        opcioContinuar.once('pointerdown', () => this.opcioPulsada(opcioContinuar));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcioContinuar);

        const opcioAbandonar = this.add.zone(530, 170, 250, 370);
        opcioAbandonar.setOrigin(0);
        opcioAbandonar.setName('abandonar');
        opcioAbandonar.setInteractive();
        opcioAbandonar.once('pointerdown', () => this.opcioPulsada(opcioAbandonar));
        this.add.graphics().lineStyle(2, 0x00ff00).strokeRectShape(opcioAbandonar);
    }

    opcioPulsada(opcio) {
        if (opcio.name === 'continuar') {  
            this.scene.start(''); 
            
        //Definim la música
        const musica = this.sound.add('musica');
        musica.play({
            volume: 1
        });
            
            
        } else { 
            this.scene.start('');
        }
    }
}













//Funció que fa que la imatge ocupi el 100% de la pantalla quan redimensionem la pantalla
function resize() {
    const canvas = document.querySelector("canvas"); //Selecciona l'element canvas del document HTML
    const windowWidth = window.innerWidth; //Obté l'amplada actual de la finestra del navegador i la guarda a la variable windowWidth
    const windowHeight = window.innerHeight; //Obté l'altura actual de la finestra del navegador i la guarda a la variable windowHeight

    canvas.style.width = windowWidth + 'px'; //Estableix l'amplada de l'element <canvas> igual a l'amplada de la finestra del navegador. Afegeix 'px' al final per indicar que es tracta de píxels.
    canvas.style.height = windowHeight + 'px'; //Estableix l'altura de l'element <canvas> igual a l'altura de la finestra del navegador. També afegeix 'px' al final.
}

//Configuració del joc
const config = {
//Renderitzat del joc. Els seus valors poden ser CANVAS, WEBGL, HEADLESS i AUTO. Auto seleciona la millor opció.
    type: Phaser.AUTO,
    //Midas del CANVAS per defecte - Rectangle on es desenvolupa el joc. Després es podrà modificar mantenint la proporció.
    width: 960,
    height: 640,
    //Escenes del joc Si hi ha més d'una, es defineixen amb un array, on la primera escena del l'array, és l'escena inicial del joc
    scene: [Escena_inicial, EscenaNivell_1, EscenaNivell_2, EscenaNivell_3, Escena_Continuar_o_Abandonar]
};

new Phaser.Game(config); //Inicialització del joc amb la configuració config