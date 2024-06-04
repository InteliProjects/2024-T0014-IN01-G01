import DefaultScene from "../interfaces/Scene";
import { Dialog } from '../../components/Dialog';
import { sceneManager } from "../../components/SceneManager/SceneManager";
import { sceneScript } from "./sceneScript";

export default class CutsceneInicial extends DefaultScene {
  constructor() {
    super({ key: 'CutsceneInicial' });
    this.dialogManager = new Dialog('cutsceneInicial'); // Inicializa o gerenciador de diálogos
    this.sceneManager = sceneManager; 
  }

  create() {
    const imagemcenainicial = this.add.image(this.game.config.width / 2, 0, 'cutsceneinicialcompleta'); //Adiciona a imagem completa da cena inicial 
    imagemcenainicial.setOrigin(0.5, 0);

    // adiciona fadeIn a cena
	  this.cameras.main.fadeIn(1000, 0, 0, 0)

    this.tweens.add({ // Adiciona a animação de rolagem na imagem
      targets: imagemcenainicial,
      y: -(imagemcenainicial.height / 2 + 150),
      duration: 10000, // Define a duração da animação
      ease: 'cubic.inout',

      onComplete: async () => { 
        await sceneManager.initiateScene(sceneScript, this); // Inicia o script da cena 
        sceneManager.status['cutsceneinicial_dialog'] = true;
        this.scene.start('CoffeShop'); // Faz a transição para a próxima cena (CoffeShop)
      }
    });
  }
}
