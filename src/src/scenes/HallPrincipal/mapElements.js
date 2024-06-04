// Lista de elementos que podem ser interagidos no mapa
export const interactableElements = [
  {
    name: "door_to_third_room", // Nome do elemento
    x: 600, // Posição x do elemento no mapa
    y: 78, // Posição y do elemento no mapa
    bodySize: {
      width: 100, // Largura do corpo do elemento
      height: 100, // Altura do corpo do elemento
    },
    isVisible: false, // Define se o elemento é visível ou não
    callback: (scene) => {
      // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador

      if (scene.player.isTriggered()) {
        
        !scene.sceneManager.status["hallPrincipal_dialog"]
          ? scene.dialogManager.generateDialog("waitingMrKhali")
          : iniciaOnboarding(scene);
      }

      // Desabilita a tecla de ação do jogador após 500 milissegundos
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: "action-key", // Define o sprite que será usado para o elemento
  },
  {
    name: "elefante", // Nome do elemento
    x: 200, // Posição x do elemento no mapa
    y: 170, // Posição y do elemento no mapa
    bodySize: {
      width: 100, // Largura do corpo do elemento
      height: 100, // Altura do corpo do elemento
    },
    isVisible: false, // Define se o elemento é visível ou não
    callback: (scene) => {
      // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador

      if (scene.player.isTriggered()) {
        
        !scene.sceneManager.status["hallPrincipal_dialog"]
          ? scene.dialogManager.generateDialog("hallPrincipal_dialog")
          : scene.dialogManager.generateDialog("blockHallPrincipal")
        scene.sceneManager.status["hallPrincipal_dialog"] = true;
      }

      // Desabilita a tecla de ação do jogador após 500 milissegundos
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: "elefante", // Define o sprite que será usado para o elemento
  },
  {
    name: "NPC4",
    y: 100,
    x: 490,
    bodySize: {
      width: 32,
      height: 128,
    },
    isVisible: false,
    callback: (scene) => {
      scene.player.setActionKeyEnabled(true);

      if(scene.player.isTriggered()) {
        scene.dialogManager.generateDialog("dialog_NPC4");
        scene.sceneManager.status["dialog_NPC4"] = true;
      }
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: 'pinguim'
  },
  {
    name: "NPC_crocodilo",
    y: 305,
    x: 575,
    bodySize: {
      width: 64,
      height: 64,
    },
    isVisible: false,
    callback: (scene) => {
      scene.player.setActionKeyEnabled(true);

      if(scene.player.isTriggered()) {
        scene.dialogManager.generateDialog("dialog_NPC_crocodilo");
        scene.sceneManager.status["dialog_NPC_crocodilo"] = true;
      }
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
  },
  {
    name: "NPC_ovelha",
    y: 125,
    x: 306,
    bodySize: {
      width: 64,
      height: 85,
    },
    isVisible: false,
    callback: (scene) => {
      scene.player.setActionKeyEnabled(true);

      if(scene.player.isTriggered()) {
        scene.dialogManager.generateDialog("dialog_NPC_ovelha");
        scene.sceneManager.status["dialog_NPC_ovelha"] = true;
      }
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
  },
];

function iniciaOnboarding(scene) {
  scene.sound.stopByKey("cafeteria");
  scene.scene.start("Onboarding");
  scene.scene.stop("HallPrincipal");
}

