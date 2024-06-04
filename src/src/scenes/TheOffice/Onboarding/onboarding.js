import DefaultScene from "../../interfaces/Scene";
import PlayerLabirinto from "../../../sprites/player";
import { tiledSettings as OnboardingTiledSettings } from "./tiled.settings";
import { interactableElements } from "./mapElements";
import { sceneManager } from "../../../components/SceneManager/SceneManager";
import { Dialog } from "../../../components/Dialog";
import { sceneScript, deliveringService } from "./sceneScript";

export class Onboarding extends DefaultScene {
  mapInfo;
  mapIcon;
  player;
  image;
  dialogManager;
  hudManager;

  constructor() {
    super({ key: "Onboarding" });
    this.sceneManager = sceneManager;
    this.dialogManager = new Dialog("onboarding");
  }

  create() {
    const music = this.sound.add("labirinto", { volume: 0.5, loop: true });
    music.play();
    this.hudManager = this.scene.get('HudScene');
    this.hudManager.setHudVisibility(true);

    // Configura o estado inicial do jogo
    this.sceneManager.status["gameState"] = {
      portaCoffeeShop: false,
      portaJardim: false,
      portaMeetingRoom: false,
    };

    // Carrega as camadas do mapa
    this.mapInfo = this.loadMapLayers("labirinto", OnboardingTiledSettings);
    this.physics.world.setBounds(
      0,
      0,
      this.mapInfo.map.widthInPixels,
      this.mapInfo.map.heightInPixels
    );

    // Cria o jogador
    this.player = new PlayerLabirinto(this, 100, 900, "bunnyKhali");
    this.physics.world.enable([this.player]);
    this.player.setMapCollision(this.mapInfo);
    this.cameras.main.setBounds(
      0,
      0,
      this.mapInfo.map.widthInPixels,
      this.mapInfo.map.heightInPixels
    );
    this.cameras.main.setDeadzone(200, 100);
    this.cameras.main.setZoom(1);

    // Configura a câmera para seguir o jogador
    this.cameras.main.startFollow(this.player, true);

    this.player.body.onOverlap = true;
    this.generateInterectableElements(interactableElements);
    this.add.container(200, 100);

    this.hudManager.mapIcon.setVisible(true);

    this.isDialogActive = true;
    this.events.once(
      "postupdate",
      () => {
        setTimeout(async () => {
          this.sceneManager.status["explanationPorta"] = true;
          await this.sceneManager.initiateScene(sceneScript, this);
          sceneManager.status["explanationOnBoarding"] = true;
          this.sceneManager.status["explanationPorta"] = false;          
          this.isDialogActive = false;
        }, 500);
      },
      this
    );
    
    //Diálogo com NPC do Labirinto
    setTimeout(async() => {
      sceneManager.status["dialog_NPC5"] = true;
      sceneManager.initiateScene(sceneScript, this);
      this.events.once('postupdate', () => {
        this.generateInterectableElements(interactableElements);
        this.isDialogActive = false;
      }, this)  
    }, 500)
  }
  
  update() {
    // Atualiza o jogador
    this.player.update();

    // Verifica se todas as portas foram abertas para finalizar o minigame de onboarding
    if (
      this.sceneManager.status["gameState"].portaCoffeeShop &&
      this.sceneManager.status["gameState"].portaJardim &&
      this.sceneManager.status["gameState"].portaMeetingRoom
    )
    {
      this.finalizaMinigame();
    }
  }

  async finalizaMinigame() {
    this.hudManager.mapIcon.visible = false;
    this.hudManager.mapIcon.destroy();
    await this.sceneManager.initiateScene(deliveringService, this);
    this.scene.stop("Onboarding");
    this.scene.start("CutsceneCalendario", { fade: 500 }); //Inicia a cena ''MeetingRoom''
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

      sprite.setScale(0.1);
      this.physics.add.overlap(sprite, this.player, () =>
        element.callback(this, sprite)
      );
    });
  }
}
