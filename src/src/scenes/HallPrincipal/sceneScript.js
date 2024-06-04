// Lista de ações que serão executadas dentro da cena
export const sceneScript = [
    {
        type: "dialog", // Tipo de ação, neste caso, um diálogo
        title: "Inicia o dialógo de explicação da cena do Hall", // Título da ação, usado para descrição
        params: {
         speechId: "initial_dialog", // Parâmetro específico para o diálogo, identificador do discurso
        },
        validation: (params) => {
        // Função de validação para determinar se a ação deve ser executada
        if (params.explanationHall) return false; // Se a explicação do The Office já ocorreu, a ação não é válida
            return true; // Se a explicação do The Office não ocorreu, a ação é válida
        },
  },
  {
    type: "dialog", 
    title: "Inicia o dialógo com o NPC do Hall", 
    params: {
     speechId: "dialog_NPC4", 
    },
    validation: (params) => {
        if (params.dialog_NPC4) return false;
        return true;
    },
},
{
    type: "dialog", 
    title: "Inicia o dialógo com o NPC_crocodilo", 
    params: {
     speechId: "dialog_NPC_crocodilo", 
    },
    validation: (params) => {
        if (params.dialog_NPC_crocodilo) return false;
        return true;
    },
},
{
    type: "dialog", 
    title: "Inicia o dialógo com o NPC_ovelha", 
    params: {
     speechId: "dialog_NPC_ovelha", 
    },
    validation: (params) => {
        if (params.dialog_NPC_ovelha) return false;
        return true;
    },
},
]