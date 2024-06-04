
// Lista de elementos que podem ser interagidos no mapa
export const interactableElements = [
  {
    name: "door_to_coffee_shop", // Nome do elemento
    y: 788, // Posição y do elemento no mapa
    x: 768, // Posição x do elemento no mapa
    bodySize: {
      width: 700, // Largura do corpo do elemento
      height: 700, // Altura do corpo do elemento
    },
    isVisible: false, // Define se o elemento é visível ou não
    callback: (scene) => {
      // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador

      if(scene.player.isTriggered()){ // Se a tecla E estiver pressionada
        iniciaCoffeeShop(scene) // Inicia a cena 'CoffeeShop'
      } 

      // Desabilita a tecla de ação do jogador após 500 milissegundos
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: "action-key", // Define o sprite que será usado para o elemento
  },
  {
    name: "pc_funcional",
    y: 300,
    x: 325,
    bodySize: {
      width: 850,
      height: 700,
    },
    isVisible: false,
    callback: (scene) => {
      scene.player.setActionKeyEnabled(true);

      if(scene.player.isTriggered()){
        scene.sceneManager.status["sourcing"]
          ? scene.dialogManager.generateDialog('blockPC')
          : iniciaSourcing(scene);
        
        scene.sceneManager.status["onboarding"] = true
      } 
        
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: 'action-key',
  },
  {
    name: "door_to_third_room", // Nome do elemento
    y: 78, // Posição y do elemento no mapa
    x: 768, // Posição x do elemento no mapa
    bodySize: {
      width: 700, // Largura do corpo do elemento
      height: 700, // Altura do corpo do elemento
    },
    isVisible: false, // Define se o elemento é visível ou não
    callback: (scene) => {
      // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador

      if (scene.player.isTriggered()) {
        !scene.sceneManager.status["onboarding"]
          ? scene.dialogManager.generateDialog('blockDoor')
          : iniciaHallPrincipal(scene);
      }

      // Desabilita a tecla de ação do jogador após 500 milissegundos
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: "action-key", // Define o sprite que será usado para o elemento
  },
  {
    name: "NPC3", 
    y: 100, 
    x: 556, 
    bodySize: {
      width: 512, 
      height: 512, 
    },
    isVisible: false,
    callback: (scene) => {
      scene.player.setActionKeyEnabled(true); 

      if(scene.player.isTriggered()) {
        scene.dialogManager.generateDialog("dialog_NPC3");
        scene.sceneManager.status["dialog_NPC3"] = true;
      }

      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: "koala" 
  },
  {
    name: "NPC_arara", 
    y: 582, 
    x: 320, 
    bodySize: {
      width: 512, 
      height: 512, 
    },
    isVisible: false,
    callback: (scene) => {
      scene.player.setActionKeyEnabled(true); 

      if(scene.player.isTriggered()) {
        scene.dialogManager.generateDialog("dialog_NPC_arara");
        scene.sceneManager.status["dialog_NPC_arara"] = true;
      }

      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: "arara" 
  },
  {
  name: "NPC_cabra", 
  y: 380, 
  x: 640, 
  bodySize: {
    width: 512, 
    height: 512, 
  },
  isVisible: false,
  callback: (scene) => {
    scene.player.setActionKeyEnabled(true); 

    if(scene.player.isTriggered()) {
      scene.dialogManager.generateDialog("dialog_NPC_cabra");
      scene.sceneManager.status["dialog_NPC_cabra"] = true;
    }

    setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
  } 
},
{
  name: "NPC_coruja", 
  y: 100, 
  x: 465, 
  bodySize: {
    width: 512, 
    height: 700, 
  },
  isVisible: false,
  callback: (scene) => {
    scene.player.setActionKeyEnabled(true); 

    if(scene.player.isTriggered()) {
      scene.dialogManager.generateDialog("dialog_NPC_coruja");
      scene.sceneManager.status["dialog_NPC_coruja"] = true;
    }

    setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
  } 
},
];

function iniciaCoffeeShop(scene) {
  scene.sound.stopByKey("escritorio");
  scene.scene.start("CoffeShop");
  scene.scene.stop("TheOffice");
}

function iniciaSourcing(scene) {
  scene.scene.launch("Sourcing");
}

function iniciaHallPrincipal(scene) {
  scene.sound.stopByKey("escritorio");
  scene.scene.start("HallPrincipal");
  scene.scene.stop("TheOffice");


  // scene.sound.stopByKey("escritorio");
  // scene.scene.start("HallPrincipal");
  // scene.scene.stop("TheOffice");
}