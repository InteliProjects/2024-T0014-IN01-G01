export const sceneScript = [
  {
    type: "dialog", 
    title: "Inicia o dialógo de explicação da cena da Cafeteria", 
    params: {
      speechId: "falaCafeteria1", 
    },
    validation: (params) => {
      if (params.explanationCafeteria) return false; 
      return true;
    },

  }
];
