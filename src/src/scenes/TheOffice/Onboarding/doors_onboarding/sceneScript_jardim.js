export const sceneScript = [
    {
      type: "dialog",
      title: "Inicia o dialógo de explicação da cena do Jardim", 
      params: {
        speechId: "falaJardim1", 
      },
      validation: (params) => {
        if (params.explanationJardim) return false; 
        return true; 
      },
      
    }];