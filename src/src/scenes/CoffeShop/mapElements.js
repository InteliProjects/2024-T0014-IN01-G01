import { Textures } from "phaser";
import { sceneManager } from "../../components/SceneManager/SceneManager";

export const interactableElements = [
  {
    name: "door_to_second_room",
    y: 80, // Define a posição y do elemento no mapa
    x: 445, // Define a posição x do elemento no mapa
    bodySize: { 
      width: 64, // Define a largura do corpo do elemento
      height: 64, // Define a altura do corpo do elemento
    },
    isVisible: false, // Define se o elemento é visível ou não
    callback: (scene) => { // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador
      
      if(scene.player.isTriggered()){ // Se a tecla E estiver pressionada
        !sceneManager.status["hallPrincipal_dialog"]
          ? iniciaTheOffice(scene) // Inicia a cena 'TheOffice'
          : iniciaLabirinto(scene); // Inicia a cena 'Labirinto'
      } 
      
      // Desabilita a tecla de ação do jogador após 500 milissegundos
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);

    },
    sprite: 'action-key', // Define o sprite que será usado para o elemento
  },
  {
    name: "NPC1",
    y: 190,
    x: 450,
    bodySize: {
      width: 64,
      height: 64,
    },
    isVisible: false,
    callback: (scene) => {
      scene.player.setActionKeyEnabled(true);

      if(scene.player.isTriggered()) {
        scene.dialogManager.generateDialog("dialog_NPC1");
        scene.sceneManager.status["dialog_NPC1"] = true;
      }
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: 'capivara'
  },
  {
    name: "NPC2",
    y: 109,
    x: 162,
    bodySize: {
      width: 64,
      height: 64,
    },
    isVisible: false,
    callback: (scene) => {
      scene.player.setActionKeyEnabled(true);

      if(scene.player.isTriggered()) {
        scene.dialogManager.generateDialog("dialog_NPC2");
        scene.sceneManager.status["dialog_NPC2"] = true;
      }
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
    },
    sprite: 'gata'
  },
  {
  name: "NPC_cachorro",
  y: 384,
  x: 330,
  bodySize: {
    width: 64,
    height: 64,
  },
  isVisible: false,
  callback: (scene) => {
    scene.player.setActionKeyEnabled(true);

    if(scene.player.isTriggered()) {
      scene.dialogManager.generateDialog("dialog_NPC_cachorro");
      scene.sceneManager.status["dialog_NPC_cachorro"] = true;
    }
    setTimeout(() => scene.player.setActionKeyEnabled(false), 500);
  },
}
]

function iniciaTheOffice(scene) { // Função para iniciar a cena 'TheOffice'
  scene.sound.stopByKey("cafeteria");
  scene.scene.start('TheOffice'); // Inicia a cena 'TheOffice'
  scene.scene.stop('CoffeShop'); // Para a cena 'CoffeShop'
}

function iniciaLabirinto(scene) {
  scene.sound.stopByKey("cafeteria");
  scene.scene.start('Onboarding');
  scene.scene.stop('CoffeShop');
}