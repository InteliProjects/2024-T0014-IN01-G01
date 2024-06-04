import { defaultLanguage } from "../scenes/Boot";
import { game } from "../main";
import { sceneManager } from "./SceneManager/SceneManager";

export class Dialog {
  hudManager;
  speechList;
  dialogKey;
  optionButtons = [];

  constructor(dialogKey) {
    this.dialogKey = dialogKey;
    setTimeout(() => {
      this.hudManager = game.scene.getScene("HudScene");
      const dialogs = this.hudManager.cache.json.get("dialogs");
      this.speechList = dialogs[this.dialogKey];
    }, 1000);
  }

  async generateDialog(speechId) {
    return new Promise((resolve) => {
      const speech = this.speechList[speechId];
      let dialogBox = null;
      this.hudManager.isDialogActive = true;

      if (!speech) {
        setTimeout(() => {
          this.hudManager.isDialogActive = false;
        }, 250);
        resolve();
        return;
      }

      if (speech.options) {
        dialogBox = this.showDialogWithOptions(
          speech.text,
          speech.options,
          speechId,
          (index) => {
            sceneManager.status[speechId] = index;
            this.dialogContainer.destroy(true);
            resolve({ index });
          }
        );
      } else {
        dialogBox = this.showNormalDialog(speechId, speech);
        let dialogHandled = false;
        setTimeout(() => {
          const jumpDialog = async () => {
            if (dialogHandled) return;
            dialogHandled = true;
            dialogBox.destroy(true);
            await this.generateDialog(speech.next);
            resolve();
          }

          this.hudManager.input.once("pointerdown", jumpDialog);

          this.hudManager.input.keyboard.once("keydown-SPACE", jumpDialog);

          this.hudManager.input.keyboard.once("keydown-ESC", jumpDialog);

          this.hudManager.input.keyboard.once("keydown-E", jumpDialog);

          this.hudManager.input.keyboard.once("keydown-ENTER", jumpDialog);
        }, 500);
      }
    });
  }

  showNormalDialog(speechId, speech) {
    const dialogBox = this.hudManager.add.container(
      this.hudManager.cameras.main.width / 2,
      this.hudManager.cameras.main.height / 2
    );

    const bodyDialogBox = this.hudManager.add
      .image(0, 100, "background_dialog")
      .setOrigin(0.5, 0.5);
    dialogBox.add(bodyDialogBox);

    const speechText = this.hudManager.add
      .bitmapText(0, bodyDialogBox.height, "determination", "", speech.fontSize)
      .setOrigin(0.75, 0.5);
    speechText.translation = this.hudManager.translation.add(speechText, {
      translationKey: `${this.dialogKey}.${speechId}.text`,
    });

    const npcImage = this.hudManager.add
      .image(0, 0, speech.cardImage)
      .setOrigin(0.5, 1);

    const speakerName = this.hudManager.add.bitmapText(
      0,
      0,
      "determination",
      "",
      speech.fontSize
    );
    speakerName.setOrigin(0.5, 0);
    speakerName.translation = this.hudManager.translation.add(speakerName, {
      translationKey: `${this.dialogKey}.${speechId}.speaker`,
    });
    dialogBox.add(speakerName);

    const cardContainer = this.hudManager.add.container(
      this.hudManager.cameras.main.worldView.width / 2 - 150,
      bodyDialogBox.height
    );
    cardContainer.add(npcImage);
    cardContainer.add(speakerName);

    dialogBox.add(cardContainer);
    dialogBox.add(speechText);
    dialogBox.setScrollFactor(0);
    dialogBox.setDepth(10000);
    return dialogBox;
  }

  showDialogWithOptions(title, options, speechId, callback) {
    // Limpa o diálogo anterior, se houver
    if (this.dialogContainer) {
      this.dialogContainer.destroy(true);
      this.optionButtons.forEach((button) => button.destroy());
    }

    // Cria um novo contêiner para o diálogo
    this.dialogContainer = this.hudManager.add.container(
      0,
      this.hudManager.cameras.main.height / 2
    );
    
    const bodyDialogBox = this.hudManager.add
      .image(this.hudManager.cameras.main.width / 2, 0, "background_dialog")
      .setOrigin(0.5, 0.5);
    this.dialogContainer.add(bodyDialogBox);

    // Cria o texto do título do diálogo
    const titleText = this.hudManager.add
      .bitmapText(
        this.hudManager.cameras.main.width / 2,
        0,
        "determination",
        title,
        16
      )
      .setOrigin(0.5, 0.5)
      .setDepth(10000);

    this.dialogContainer.add(titleText);

    // Cria botões para cada opção
    options.forEach((option, index) => {
      const button = this.hudManager.add
        .image(10, 70 + index * 30 + index * 5, "background_options_dialog")
        .setOrigin(0, 0.5);
      const buttonText = this.hudManager.add
        .bitmapText(
          15,
          70 + index * 30 + index * 5,
          "determination",
          option.text,
          16
        )
        .setOrigin(0, 0.5)
        .setInteractive()
        .setDepth(10000);

      setTimeout(() => {
        // Adiciona um evento de clique ao botão
        buttonText.on("pointerdown", () => {
          // Chama a função de retorno de chamada com o índice da opção selecionada
          callback(index);
        });

        // Adiciona um evento de clique ao botão
        button.on("pointerdown", () => {
          // Chama a função de retorno de chamada com o índice da opção selecionada
          callback(index);
        });
      }, 1000);

      // Adiciona o botão ao contêiner do diálogo e à lista de botões
      this.dialogContainer.add(button);
      this.dialogContainer.add(buttonText);
    });

    return this.dialogContainer;
  }
}
