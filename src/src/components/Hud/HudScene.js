import { Scene } from "phaser";
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";
import { dropDownSelect } from "../DropdownMenu/DropdownMenu";
import { defaultLanguage } from "../../scenes/Boot";

export class HudScene extends Scene {
  joystick;
  actionTrigger;
  isPressed = false;
  isDialogActive = false;
  isVisible = true;
  isMovementKeysVisible = true;
  controllsIsOpen = false;
  movementKeys;
  dropdownMenu;
  backgroundFilter;
  mapIcon;

  constructor() {
    super({ key: "HudScene" });
  }

  preload() {
    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
    this.translation.initI18Next(this, {
      lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      ns: "dialogs",
      debug: true,
      backend: {
        loadPath: "./assets/locales/{{lng}}/{{ns}}.json",
      },
    });
  }

  create() {
    this.scene.bringToTop();

    this.backgroundFilter = this.add
      .image(0, 0, "black_background")
      .setOrigin(0.5, 0.5)
      .setScale(5)
      .setAlpha(0.3)
      .setVisible(this.isDialogActive);

    // Define joystick
    this.joystick = new VirtualJoyStick(this.scene, {
      x: 100,
      y: this.game.config.height - 100,
      radius: 50,
      base: this.add.image(0, 0, "base_joystick"),
      thumb: this.add.image(0, 0, "top_joystick"),
    }).setVisible(false);
    this.joystick.setScrollFactor(0);

    this.actionTrigger = this.add
      .image(
        this.game.config.width - 100,
        this.game.config.height - 100,
        "action_trigger"
      )
      .setVisible(false)
      .setScrollFactor(0)
      .setInteractive();

    this.explainButton = this.add
      .image(this.game.config.width - 5, 5, "explain_button")
      .setVisible(false)
      .setOrigin(1, 0);

    this.controllsButton = this.add
      .image(this.game.config.width - 45, 5, "controlls_button")
      .setVisible(false)
      .setOrigin(1, 0);

    this.explainButton
      .on(
        "pointerdown",
        () => {
          window.open(
            "https://docs.google.com/document/d/1RaYHzP5_WBasG6plzwZV9oIY2__D4DbxSzbWEGIkuEQ/edit?usp=sharing",
            "_blank"
          );
        },
        this
      )
      .setScrollFactor(0)
      .setInteractive();

    this.controllsButton
      .on(
        "pointerdown",
        () => {
          this.controllsIsOpen = !this.controllsIsOpen;
          this.isDialogActive = this.controllsIsOpen;
          this.controllsButton.setTexture(
            this.controllsIsOpen ? "close_button" : "controlls_button"
          );
        },
        this
      )
      .setScrollFactor(0)
      .setInteractive();

    this.controllsTutorial = this.add
      .image(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "controlls_tutorial"
      )
      .setVisible(false)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0);

    this.actionTrigger.on("pointerdown", () => (this.isPressed = true), this);
    this.actionTrigger.on("pointerup", () => (this.isPressed = false), this);

    // Define movement keys
    this.movementKeys = this.input.keyboard.addKeys({
      W: "W",
      A: "A",
      S: "S",
      D: "D",
      E: "E",
      UP: "UP",
      LEFT: "LEFT",
      DOWN: "DOWN",
      RIGHT: "RIGHT",
    });

    const keyboardPlugin = this.input.keyboard.on("keydown", (event) => {
      this.setMovementKeysVisibility(false);
    });

    this.dropdownMenu = dropDownSelect(
      20,
      18,
      34,
      33,
      this,
      12,
      defaultLanguage,
      "",
      [
        { text: "Português Brasil", value: "pt_br" },
        { text: "English", value: "en" },
      ],
      "",
      (dropDownList, translation, previousValue) =>
        this.setTranslation(dropDownList, translation, previousValue),
      "language_button"
    );

    this.mapIcon = this.add
      .image(
        this.game.config.width - 20,
        this.game.config.height / 2,
        "mapIcon"
      )
      .setOrigin(1, 0.5)
      .setDepth(1001)
      .setScale(1.3)
      .setVisible(false);
    
    this.mapIcon.setInteractive();
    let mapStatus = 0;
    let mapImage = null;
    this.mapIcon.on('pointerdown', () => {
      if(mapStatus === 0) {
        mapImage = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'mapLabirinto')
        .setOrigin(.5, .5)
        .setDepth(1000)
        .setScale(.75);
        mapStatus = 1;
      } 
      else {
        mapImage.destroy(true);
        mapStatus = 0;
      }
    });
  }

  update() {
    this.actionTrigger.setVisible(this.isMovementKeysVisible && this.isVisible);
    this.joystick.setVisible(this.isMovementKeysVisible && this.isVisible);
    this.explainButton.setVisible(this.isVisible);
    this.controllsButton.setVisible(this.isVisible);
    this.dropdownMenu.visible = this.isVisible;
    this.backgroundFilter.setVisible(this.isDialogActive);

    this.isPressed =
      this.isPressed && this.isMovementKeysVisible && this.isVisible;
    this.controllsTutorial.setVisible(this.controllsIsOpen);
    this.dropdownMenu.visible = this.isVisible;
  }

  setEnable(enabled) {
    this.isEnabled = enabled;
  }

  getMovement() {
    if (this.isDialogActive)
      return {
        up: false,
        down: false,
        left: false,
        right: false,
        force: 0,
      };

    return {
      UP:
        this.movementKeys.W.isDown ||
        this.movementKeys.UP.isDown ||
        (this.joystick.angle <= -45 &&
          this.joystick.angle >= -135 &&
          this.joystick.force != 0),
      DOWN:
        this.movementKeys.S.isDown ||
        this.movementKeys.DOWN.isDown ||
        (this.joystick.angle >= 45 &&
          this.joystick.angle <= 135 &&
          this.joystick.force != 0),
      LEFT:
        this.movementKeys.A.isDown ||
        this.movementKeys.LEFT.isDown ||
        ((this.joystick.angle >= 135 || this.joystick.angle <= -135) &&
          this.joystick.force != 0),
      RIGHT:
        this.movementKeys.D.isDown ||
        this.movementKeys.RIGHT.isDown ||
        (this.joystick.angle >= -45 &&
          this.joystick.angle <= 45 &&
          this.joystick.force != 0),
      force: this.joystick.force,
      STOP:
        !this.movementKeys.W.isDown &&
        !this.movementKeys.A.isDown &&
        !this.movementKeys.S.isDown &&
        !this.movementKeys.D.isDown &&
        !this.movementKeys.UP.isDown &&
        !this.movementKeys.DOWN.isDown &&
        !this.movementKeys.LEFT.isDown &&
        !this.movementKeys.RIGHT.isDown &&
        this.joystick.force == 0,
    };
  }

  setTranslation(dropDownList, translation, previousValue) {
    if (!translation) return false;
    localStorage.setItem("gameLanguage", translation);
    this.translation.changeLanguage(translation);
  }

  validateMovementKey(move) {
    return move && !this.isDialogActive;
  }

  setMovementKeysVisibility(visibility) {
    this.isMovementKeysVisible = visibility;
  }

  setHudVisibility(visibility) {
    this.isVisible = visibility;
  }

  captureTrigger() {
    if (this.isDialogActive) return false;
    return this.isPressed || this.movementKeys.E.isDown;
  }

  /**
   * Função responsável por setar as teclas de movimentação do jogador
   */
  setMovementKeys(movementKeys) {
    this.movementKeys = movementKeys;
  }
}
