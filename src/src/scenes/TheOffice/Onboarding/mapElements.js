import { sceneManager } from "../../../components/SceneManager/SceneManager";

export const interactableElements = [
  {
    name: "door", // Nome do elemento
    x: 1691, // Posição x do elemento no mapa
    y: 177, // Posição y do elemento no mapa
    bodySize: {
      width: 700, // Largura do corpo do elemento
      height: 700, // Altura do corpo do elemento
    },
    isVisible: true, // Define se o elemento é visível ou não
    callback: (scene) => {
      // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador
      
      if (scene.player.isTriggered()) {
        scene.scene.launch("CoffeShopOnboarding", { fade: 500 });
        sceneManager.status["gameState"].portaCoffeeShop = true;
      }

      // Desabilita as teclas de ação e movimentação do jogador após 2000 milissegundos
      setTimeout(() => {
        scene.player.setActionKeyEnabled(false);
        scene.player.setMovementsEnabled(true);
      }, 2000);
    },
    sprite: "action-key", // Define o sprite que será usado para o elemento
  },
  {
  name: "NPC5", 
  y: 127, 
  x: 909, 
  bodySize: {
    width: 64, 
    height: 64, 
  },
  isVisible: false,
  callback: (scene) => {
    scene.player.setActionKeyEnabled(true); 

    if(scene.player.isTriggered()) {
      scene.dialogManager.generateDialog("dialog_NPC5");
      console.log("teste1")
      scene.sceneManager.status["dialog_NPC5"] = true;
    }

    setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
  },
  sprite: "peixe" 
  },
  {
    name: "door3", // Nome do elemento
    x: 2173, // Posição x do elemento no mapa
    y: 715, // Posição y do elemento no mapa
    bodySize: {
      width: 700, // Largura do corpo do elemento
      height: 700, // Altura do corpo do elemento
    },
    isVisible: true, // Define se o elemento é visível ou não
    callback: (scene) => {
      // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador

      if (scene.player.isTriggered() && sceneManager.status["gameState"].portaCoffeeShop) {
        
        scene.scene.launch("JardimOnboarding", { fade: 500 });
        sceneManager.status["gameState"].portaJardim   = true;
      }
      else if (scene.player.isTriggered())
      {
        scene.isDialogActive = true
        scene.events.once("postupdate",() => {
          setTimeout(async () => {
            scene.dialogManager.generateDialog("portaLocked")
            scene.sceneManager.status["explanationPorta"] = true;
            scene.isDialogActive = false;
          }, 500);
        },
        this
        );
      }
      // Desabilita as teclas de ação e movimentação do jogador após 2000 milissegundos
      setTimeout(() => {
        scene.player.setActionKeyEnabled(false);
        scene.player.setMovementsEnabled(true);
      }, 2000);
    },
    sprite: "action-key", // Define o sprite que será usado para o elemento
  },
  {
    name: "door2", // Nome do elemento
    x: 1315, // Posição x do elemento no mapa
    y: 1445, // Posição y do elemento no mapa
    bodySize: {
      width: 700, // Largura do corpo do elemento
      height: 700, // Altura do corpo do elemento
    },
    isVisible: true, // Define se o elemento é visível ou não
    callback: (scene) => {
      // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador

      if (scene.player.isTriggered() && sceneManager.status["gameState"].portaCoffeeShop && sceneManager.status["gameState"].portaJardim) {
        scene.sceneManager.status["gameState"].portaMeetingRoom = true;
      }
      else if (scene.player.isTriggered())
      {
        scene.isDialogActive = true
        scene.events.once("postupdate",() => {
          setTimeout(async () => {
            scene.dialogManager.generateDialog("portaLocked")
            scene.sceneManager.status["explanationPorta"] = true;
            scene.isDialogActive = false;
          }, 500);
        },
        this
        );
      }

      // Desabilita as teclas de ação e movimentação do jogador após 2000 milissegundos
      setTimeout(() => {
        scene.player.setActionKeyEnabled(false);
        scene.player.setMovementsEnabled(true);
      }, 2000);
    },
    sprite: "action-key", // Define o sprite que será usado para o elemento
  }
];