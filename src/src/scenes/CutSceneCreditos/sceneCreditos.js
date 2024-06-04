import DefaultScene from "../interfaces/Scene";
import { Dialog } from '../../components/Dialog';
import { sceneManager } from "../../components/SceneManager/SceneManager";
import { sceneScript } from "./sceneScript";

export default class CutsceneCreditos extends DefaultScene {
  constructor() {
    super({ key: 'CutsceneCreditos' });
    this.sceneManager = sceneManager; 
  }

  create() {
    const image1 = this.add.image(5, 0, "final2").setOrigin(0, 0);

    this.cameras.main.fadeIn(6000);

    this.back = this.add.image(475, 315, 'back_to_main_menu_button').setScale(0.5);
    this.back.setInteractive();
    this.back.on('pointerdown', () => {
      this.scene.stop('CutsceneCreditos');
      this.scene.start('MainMenu');
    });
  }
}
