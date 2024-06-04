import DefaultScene from "../interfaces/Scene";
import { Dialog } from '../../components/Dialog';
import { sceneManager } from "../../components/SceneManager/SceneManager";
import { sceneScript } from "./sceneScript";

export default class CutsceneFinal extends DefaultScene {
  constructor() {
    super({ key: 'CutsceneFinal' });
    this.sceneManager = sceneManager;
  }

  create() {
    this.hudManager = this.scene.get('HudScene');
    this.hudManager.setHudVisibility(false);
    
    const image1 = this.add.image(this.game.config.width / 2, 75, "final1");

    this.tweens.add({ // Adiciona a animação de rolagem na imagem
      targets: image1,
      y: (image1.height / 2 - 35),
      duration: 12000, // Define a duração da animação
      ease: 'cubic.inout',

      onComplete: async () => { 
        this.scene.launch('CutsceneCreditos');
        this.scene.stop()
      }
    });

    this.cameras.main.once('camerafadeincomplete', function (camera) {
      camera.fadeOut(9000);
    });

    this.cameras.main.fadeIn(6000);
  }
}
