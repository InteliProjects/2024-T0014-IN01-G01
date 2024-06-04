import { sceneManager } from "../../components/SceneManager/SceneManager";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    const music = this.sound.add('mainmenu_music', {volume: 0.3, loop: true});
    music.play();
    const hudManager = this.scene.get('HudScene');
    hudManager.setHudVisibility(false);

    sceneManager.status = [];
    
    this.bg = this.add.image(0, 0, 'background').setOrigin(0);
    this.bg.setScale(1);
    const element = this.add
      .dom(this.game.config.width - (this.game.config.width / 4), this.game.config.height / 2)
      .createFromCache('start_menu')
      .setOrigin(.5)
      .setScale(1/3);

    element.addListener('click');
    element.on('click', (event) => {
      if(event.srcElement.id == 'btnStartGame') {
        event.srcElement.style.display = 'none';
        const fx = this.cameras.main.fadeOut(1000);
        music.stop();
        setTimeout(() => {
          this.scene.start('CutsceneInicial');
        }, 3000);
      }
    });
  }
}