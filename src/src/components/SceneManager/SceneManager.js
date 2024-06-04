class SceneManager {
  scene = null; // A cena atual
  status = {}; // O status atual da cena

  // Método para iniciar a cena
  initiateScene = async (script, scene) => {
    for (const index in script) {
      // Para cada passo no script
      const step = script[index]; // Obtem o passo atual
      if (step.validation && !step.validation(this.status)) continue; // Se a validação falhar, pula para o próximo passo
      await this.scriptTypes[step.type](step.params, scene); // Executa o tipo de script correspondente
    }
  };

  // Método para obter um diálogo
  getDialog = async (params, scene) => {
    const response = await scene.dialogManager.generateDialog(params.speechId); // Gera o diálogo com base no ID do discurso
    params.callback ? await params.callback(response) : false;
  };

  // Método para mover a câmera
  moveCamera = (params, scene) => {
    scene.cameras.main.stopFollow(); // Para de seguir o jogador
    scene.cameras.main.pan(params.x, params.y, params.duration, "Linear", true); // Move a câmera para a posição especificada
    scene.input.enabled = false; // Desabilita a entrada do usuário
    scene.input.keyboard.enabled = false; // Desabilita o teclado
    
    setTimeout(() => {
      scene.input.enabled = true;
      scene.input.keyboard.enabled = true;
    }, params.duration + 2000); // Habilita a entrada do usuário após a duração especificada

    let handled = false;
    scene.input.once("pointerdown", () => {
      // Quando o usuário clica
      if (handled) return;
      handled = true;
      if (scene.player) scene.cameras.main.startFollow(scene.player, true); // Começa a seguir o jogador novamente
    });

    scene.input.keyboard.once("keydown", () => {
      // Quando o usuário pressiona uma tecla
      if (handled) return;
      handled = true;
      if (scene.player) scene.cameras.main.startFollow(scene.player, true); // Começa a seguir o jogador novamente
    });
  };

  // Tipos de script que podem ser executados
  scriptTypes = {
    dialog: this.getDialog,
    initScene: (params) => console.log("initScene", params),
    movement: (params) => console.log("movement", params),
    moveCamera: this.moveCamera,
  };
}

const sceneManager = new SceneManager();
export { sceneManager };
