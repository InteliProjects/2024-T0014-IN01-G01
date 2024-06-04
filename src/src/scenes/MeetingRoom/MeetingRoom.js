import DefaultScene from "../interfaces/Scene";
import Player from "../../sprites/player";
import { tiledSettings as meetingRoomTiledSettings } from "./tiled.settings";
import { interactableElements } from "./mapElements";
import { sceneScript } from "./sceneScript";
import { Dialog } from "../../components/Dialog";
import { sceneManager } from "../../components/SceneManager/SceneManager";

/*
 * Classe responsável por criar a cena do escritório
 */

export class MeetingRoom extends DefaultScene {
  mapInfo;
  player;
  tilesetList;
  speechList = {};
  image;
  teclaE;
  translateContainer;
  dialogManager;
  sceneManager;
  secao = 0;
  hudManager;
  setaIcon;
  /**
   * Construtor responsável por instanciar uma nova scene
   */
  constructor(key = "MeetingRoom") {
    super({ key });
    this.dialogManager = new Dialog("meetingRoom");
    this.sceneManager = sceneManager;
  }

  /**
   * Função responsável por criar os atributos básicos da cena e instanciar o jogador
   */
  async create() {
    
    this.hudManager = this.scene.get('HudScene');
    this.hudManager.setHudVisibility(true);
    
    // Set tilemap, layers and colision tiles
    this.mapInfo = this.loadMapLayers("meetingroom", meetingRoomTiledSettings);

    this.physics.world.setBounds(
      0,
      0,
      this.mapInfo.map.widthInPixels,
      this.mapInfo.map.heightInPixels
    );

    // Set camera
    this.cameras.main.setBounds(
      0,
      0,
      this.mapInfo.map.widthInPixels,
      this.mapInfo.map.heightInPixels
    );
    this.cameras.main.setDeadzone(200, 100);
    this.cameras.main.setZoom(1);

    // Set player
    this.player = new Player(
      this,
      this.mapInfo.map.widthInPixels - 100,
      this.mapInfo.map.heightInPixels,
      "bunny"
    );
    this.physics.world.enable([this.player]);
    this.player.setMapCollision(this.mapInfo);

    this.cameras.main.startFollow(this.player, true);

    this.player.body.onOverlap = true;
    this.generateInterectableElements(interactableElements);
    
    this.generateFolderMinigame();

    this.events.once(
      "postupdate",
      () => {
        setTimeout(async () => {
          await this.sceneManager.initiateScene(sceneScript, this);
          sceneManager.status["explanationTheOffice"] = true;
        }, 500);
      },
      this
    );

    this.anims.create({
      key: "pisca",
      frameRate: 3,
      frames: this.anims.generateFrameNumbers("seta", { start: 0, end: 1 }),
      repeat: -1
    });    
    this.setaIcon = this.hudManager.add.sprite(this.hudManager.game.config.width - 40, this.hudManager.game.config.height - 425 / 2, "seta")
    this.setaIcon.anims.play('pisca');
  }

  generateFolderMinigame() {
    this.anims.create({
      key: "closeFolder",
      frameRate: 4,
      frames: this.anims.generateFrameNumbers("folderIcon", { start: 1, end: 0 }),
      repeat: 0
    });

    this.anims.create({
      key: "openFolder",
      frameRate: 4,
      frames: this.anims.generateFrameNumbers("folderIcon", { start: 0, end: 1 }),
      repeat: 0
    });
    
    this.folderIcon = this.hudManager.add.sprite(this.hudManager.game.config.width - 20, this.hudManager.game.config.height / 2, "folderIcon")
      .setOrigin(1, .5)
      .setDepth(1001)
      .setScale(1.3);
    this.folderIcon.setInteractive();

    let folderStatus = 0;
    let folderImage = null;
    this.folderIcon.on('pointerdown', () => {
      const folderSound = this.sound.add("pasta_effect", { volume: 1, loop: false });
      folderSound.play();
      if(folderStatus === 0) {
        this.folderIcon.play('openFolder');
        folderImage = this.hudManager.add.image(this.hudManager.game.config.width / 2, this.hudManager.game.config.height / 2, 'folderExplain')
        .setOrigin(.5, .5)
        .setDepth(1000)
        folderStatus = 1;
      } else if(folderStatus === 1) {
        this.folderIcon.play('openFolder');
        folderImage.setTexture("folderFeedback");
        folderStatus = 2;
      } else {
        this.folderIcon.play('closeFolder');
        folderImage.destroy(true)
        folderStatus = 0;
      }
    });
  }


  /*
   * Função responsável por atualizar o status da cena
   */
  update() {
    this.player.update();
  }

  generateInterectableElements(interactableElements) {
    interactableElements.forEach((element) => {
      const sprite = this.physics.add.sprite(
        element.x,
        element.y,
        element.sprite
      );

      element.bodySize.width != undefined &&
      element.bodySize.height != undefined
        ? sprite.body.setSize(element.bodySize.width, element.bodySize.height)
        : false;

      element.isVisible != undefined
        ? sprite.setVisible(element.isVisible)
        : false;

      this.physics.add.overlap(sprite, this.player, () =>
        element.callback(this, sprite)
      );
    });
  }
}
