import DefaultScene from "../../../interfaces/Scene";
import { sceneScript } from "./sceneScript_office";
import { sceneManager } from "../../../../components/SceneManager/SceneManager";
import { Dialog } from "../../../../components/Dialog";

export class TheOfficeOnboarding extends DefaultScene {
  constructor() {
    super({ key: "TheOfficeOnboarding" });
    this.sceneScript = sceneScript
    this.sceneManager = sceneManager
    this.dialogManager = new Dialog ('onboarding')
  }

  create() {
    const image = this.add.image(0, 0, "theOffice").setOrigin(0, 0);
    // Adiciona um retangulo preto de background com o tamanho da cena
    this.add
      .rectangle(
        this.game.config.width / 2,
        this.game.config.height / 2,
        this.game.config.width,
        this.game.config.height,
        0x000000
      )
      .setOrigin(0, 0)
      .setAlpha(0)
      .setOrigin(0.5, 0.5);

    let handled = false;

    const jumpScene = () => {
      if (!handled) {
        this.scene.stop("TheOfficeOnboarding");
        handled = true;
      }
    }

    this.isDialogActive = true
    this.events.once("postupdate",() => {
        setTimeout(async () => {
          await this.sceneManager.initiateScene(sceneScript, this);
          this.input.once("pointerdown", jumpScene);
          this.input.keyboard.once("keydown-SPACE", jumpScene);
          this.input.keyboard.once("keydown-ESC", jumpScene);
          this.input.keyboard.once("keydown-ENTER", jumpScene);
          sceneManager.status["explanationOffice"] = true;
          this.isDialogActive = false;
        }, 500);
      },
      this
    );

  }
}
