// Lista de ações que serão executadas dentro da cena
export const sceneScript = [
    {
      type: "dialog", // Tipo de ação: diálogo
      title: "Inicia o diálogo da cutscene inicial do jogo", 
      params: {
        speechId: "cutsceneinicial_dialog", // ID do diálogo da cutscene inicial 
      },
      validation: (params) => {  
        if(params.cutsceneinicial) return false;  
        return true; 
      }
    },
  ]