import DefaultScene from "../../interfaces/Scene";
import { sceneManager } from "../../../components/SceneManager/SceneManager";

export default class CutsceneCalendario extends DefaultScene {
  hudManager;
  
  constructor() {
    super({ key: 'CutsceneCalendario' });
    this.sceneManager = sceneManager; 
  }

  create() {
    this.hudManager = this.scene.get('HudScene');
    this.hudManager.setHudVisibility(false);
    this.calendario = this.add.sprite(this.game.config.width/2, this.game.config.height/2, "calendario")
    
    this.anims.create({
      key: "passaTempo",
      frameRate: 2,
      frames: this.anims.generateFrameNumbers("calendario", { start: 0, end: 6 }),
      repeat: 0
    });

    this.time.delayedCall(2500, () => {
      const sound = this.sound.add("pasta_effect", { volume: 1, loop: true });
      sound.play();
      this.calendario.anims.play('passaTempo');
    });
    

    this.time.delayedCall(6000, () => {
      this.sound.stopByKey("pasta_effect");
    });
    
    
    this.time.delayedCall(12000, () => {
      this.scene.start("MeetingRoom");
      this.scene.stop("CutsceneCalendario");
    });

    

    this.cameras.main.once('camerafadeincomplete', function (camera) {
      camera.fadeOut(6000);
    });

    this.cameras.main.fadeIn(6000);
  }
}
