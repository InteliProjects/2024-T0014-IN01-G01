import DefaultScene from "../../interfaces/Scene";
import { sceneManager } from "../../../components/SceneManager/SceneManager";

export class Confidentiality extends DefaultScene {
  dialogManager;
  hudManager;

  constructor() {
    super({ key: "Confidentiality" });
    this.sceneManager = sceneManager;
  }

  create() {
    this.hudManager = this.scene.get("HudScene");
    this.hudManager.isVisible = false;
    const image1 = this.add.image(0, 0, "confidencialidade1").setOrigin(0, 0);

    this.time.delayedCall(1500, () => {
      image1.destroy();
      const image2 = this.add.image(0, 0, "confidencialidade2").setOrigin(0, 0);
    });

    this.time.delayedCall(3000, () => {

      this.scene.stop("Confidentiality");
      this.scene.launch('Negociation', { data: this.fornecedor, callback: this.selectCallback });
    });
  }
}
