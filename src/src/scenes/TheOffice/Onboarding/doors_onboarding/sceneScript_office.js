export const sceneScript = [
    {
      type: "dialog", 
      title: "Inicia o dialógo de explicação da cena do Office", 
      params: {
        speechId: "falaEscritorio1", 
      },
      validation: (params) => {
        if (params.explanationOffice) return false; 
        return true;
      },
  
    }
  ];
  