// Lista de ações que serão executadas dentro da cena
export const sceneScript = [
  {
    type: "dialog", // Tipo de ação, neste caso, um diálogo
    title: "Inicia o dialógo de explicação da cena do CoffeeShop", // Título da ação, usado para descrição
    params: {
      speechId: "first_dialog", // Parâmetro específico para o diálogo, identificador do discurso
    },
    validation: (params) => { // Função de validação para determinar se a ação deve ser executada
      if(params.firstDialog) return false; // Se o primeiro diálogo já ocorreu, a ação não é válida
        return true; // Se o primeiro diálogo não ocorreu, a ação é válida
    }
  },

  {
    type: "dialog", 
    title: "Inicia o dialógo com o NPC1 da cafeteria", 
    params: {
     speechId: "dialog_NPC1", 
    },
    validation: (params) => {
    
    if (params.dialog_NPC1) return false; 
      return true; 
    },
},
{
  type: "dialog", 
  title: "Inicia o dialógo com o NPC2 da cafeteria", 
  params: {
   speechId: "dialog_NPC2", 
  },
  validation: (params) => {
  
  if (params.dialog_NPC2) return false; 
    return true; 
  },
},
{
  type: "dialog", 
  title: "Inicia o dialógo com o NPC_cachorro da cafeteria", 
  params: {
   speechId: "dialog_NPC_cachorro", 
  },
  validation: (params) => {
  
  if (params.dialog_NPC_cachorro) return false; 
    return true; 
  },
},
]