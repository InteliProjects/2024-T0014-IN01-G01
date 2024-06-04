// Lista de ações que serão executadas dentro da cena
export const sceneScript = [
  {
    type: "dialog", // Tipo de ação, neste caso, um diálogo
    title: "Inicia o dialógo de explicação da cena do Meeting Room", // Título da ação, usado para descrição
    params: {
      speechId: "falaInicial", // Parâmetro específico para o diálogo, identificador do discurso
    },
    validation: (params) => {
      // Função de validação para determinar se a ação deve ser executada
      if (params.explanationOnBoarding) return false; // Se a explicação do The Office já ocorreu, a ação não é válida
      return true; // Se a explicação do The Office não ocorreu, a ação é válida
    }
  
  },

  {
    type: "dialog",
    title: "Inicia o dialógo de explicação da cena da porta trancada", 
    params: {
      speechId: "portaLocked", 
    },
    validation: (params) => {
      
      if (params.explanationPorta) return false; 
      return true; 
    },
    
  },
  {
    type: "dialog",
    title: "Inicia o dialógo com o NPC do labirinto", 
    params: {
      speechId: "dialog_NPC5", 
    },
    validation: (params) => {
      
      if (params.dialog_NPC5) return false; 
      return true; 
    },
    
  }
];

export const deliveringService = [
  {
    type: "dialog",
    title: "Inicia o dialógo de explicação da cena da entrega de serviço", 
    params: {
      speechId: "deliveringService_dialog", 
    }
  }
];