// Lista de ações que serão executadas dentro da cena
export const sceneScript = [
  {
    type: "dialog", // Tipo de ação, neste caso, um diálogo
    title: "Inicia o dialógo de explicação da cena do The Office", // Título da ação, usado para descrição
    params: {
      speechId: "theOfficeExplanationInit", // Parâmetro específico para o diálogo, identificador do discurso
    },
    validation: (params) => { // Função de validação para determinar se a ação deve ser executada
      if(params.explanationTheOffice) return false; // Se a explicação do The Office já ocorreu, a ação não é válida
      return true; // Se a explicação do The Office não ocorreu, a ação é válida
    }
  },
  {
    type: "moveCamera",
    title: "Move a camera até o computador para mostrar o que o jogador deve fazer",
    params: {
      x: 325,
      y: 300,
      duration: 1000,
    },
    validation: (params) => {
      if(params.explanationTheOffice) return false;
      return true;
    }
  },
  {
    type: "dialog",
    title: "Da uma breve explicação sobre o computador e o que o usuário deve fazer",
    params: {
      speechId: "explainingComputer",
    },
    validation: (params) => {
      if(params.explanationTheOffice) return false;
      return true;
    }
  },
  {
    type: "dialog", 
    title: "Inicia o dialógo com o NPC3 do office", 
    params: {
     speechId: "dialog_NPC3", 
    },
    validation: (params) => {
    
    if (params.dialog_NPC3) return false;
      return true; 
    },
  },
  {
    type: "dialog", 
    title: "Inicia o dialógo com o NPC_arara", 
    params: {
     speechId: "dialog_NPC_arara", 
    },
    validation: (params) => {
    
    if (params.dialog_NPC_arara) return false;
      return true; 
    },
  },
{
  type: "dialog", 
  title: "Inicia o dialógo com o NPC_cabra", 
  params: {
   speechId: "dialog_NPC_cabra", 
  },
  validation: (params) => {
  
  if (params.dialog_NPC_cabra) return false;
    return true; 
  },
},
{
  type: "dialog", 
  title: "Inicia o dialógo com o NPC_coruja", 
  params: {
   speechId: "dialog_NPC_coruja", 
  },
  validation: (params) => {
  
  if (params.dialog_NPC_coruja) return false;
    return true; 
  },
},
]
export const finishScript = [
  {
    type: "dialog", // Tipo de ação, neste caso, um diálogo
    title: "Inicia o dialógo de finalização do TheOffice", // Título da ação, usado para descrição
    params: {
      speechId: "finishDialog", // Parâmetro específico para o diálogo, identificador do discurso
    }
  },
  {
    type: "moveCamera",
    title: "Move a camera até a porta para auxilia o jogador a sair da sala",
    params: {
      y: 78,
      x: 768,
      duration: 1000,
    },
  },
]