import DefaultScene from "../../interfaces/Scene";
import { clickableElements } from "./mapElements";
import { Dialog } from "../../../components/Dialog";
import  { sceneManager } from "../../../components/SceneManager/SceneManager";
import { explanationScript } from "./sceneScript";

export class Sourcing extends DefaultScene {
  player;
  tilesetList;
  speechList = { };
  image;
  teclaE;
  translateContainer;
  dialogManager;
  listForn = [
    new Fornecedor("stargate", "assets/tiled/logo_1.png", "assets/ui/titulo_cafetech.png", "assets/tiled/stargate.png", false),
    new Fornecedor("nexus", "assets/tiled/logo_2.png", "assets/ui/titulo_heritage.png", "assets/tiled/nexus.png", true),
    new Fornecedor("intercom", "assets/tiled/logo_3.png", "assets/ui/titulo_green_bean.png", "assets/tiled/intercom.png", false),
    new Fornecedor("quantumleap", "assets/tiled/logo_4.png", "assets/ui/titulo_expresso_repair.png", "assets/tiled/quantum.png", false)
  ];
  sceneManager;
  hudManager;

  constructor() {
    super({ key: 'Sourcing' });
    if(this.pagina != 'supplier'){
      this.dialogManager = new Dialog('sourcing');
    }

    this.sceneManager = sceneManager;
  }

  init(data) {
    this.pagina = data
  }

  create() {
    this.hudManager = this.scene.get('HudScene');
    this.hudManager.setHudVisibility(false);
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'black_background');
    const background = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'sourcing_background').setDepth(1);

    setTimeout(async () => {
      await this.sceneManager.initiateScene(explanationScript, this);
      this.sceneManager.status['sourcingExplanation'] = true;
      this.generateClickableElements(clickableElements);
    }, 500);

    this.events.once('shutdown', () => {
      this.hudManager.setHudVisibility(true);
    })
  }
}

class Fornecedor{
  constructor(id, logo, nome, descricao, aprovado){
      this.id = id
      this.logo = logo;
      this.nome = nome;
      this.descricao = descricao;
      this.aprovado = aprovado;
  }
}