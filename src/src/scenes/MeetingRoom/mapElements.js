import { feedbackMinigame } from "./sceneScript";

// Lista de elementos que podem ser interagidos no mapa
export const interactableElements = [
  {
    name: "elefante", // Nome do elemento
    y: 160, // Posição y do elemento no mapa
    x: 160, // Posição x do elemento no mapa
    bodySize: { 
      width: 75, // Largura do corpo do elemento
      height: 75, // Altura do corpo do elemento
    },
    isVisible: false, // Define se o elemento é visível ou não
    callback: async (scene) => { // Função de callback que será chamada quando o elemento for interagido
      scene.player.setActionKeyEnabled(true); // Habilita a tecla de ação do jogador

      if(scene.player.isTriggered()){ // Se a tecla E estiver pressionada
        await scene.sceneManager.initiateScene(feedbackMinigame, scene);

        await scene.dialogManager.generateDialog("respostaFinal");

        scene.sound.stopByKey("labirinto");
        scene.folderIcon.destroy();
        scene.setaIcon.destroy();
        scene.cameras.main.zoomTo(1.5, 3000);
        scene.hudManager.setHudVisibility(false);
        scene.hudManager.isDialogActive = true;
        scene.hudManager.setHudVisibility(true);
        scene.cameras.main.pan(160, 160, 3000);
        scene.player.setPosition(120, 160);
        scene.player.play('idleDown');
        scene.cameras.main.fadeOut(3000);

        scene.time.delayedCall(6000, () => {
          scene.scene.launch('CutsceneFinal');
          scene.scene.stop()
        });
      } 

      // Desabilita a tecla de ação do jogador após 500 milissegundos
      setTimeout(() => scene.player.setActionKeyEnabled(false), 500);

    },
    sprite: 'elefante', // Define o sprite que será usado para o elemento
  }
]