import { Dialog } from "../../components/Dialog";

var dialog;
setTimeout(() => {
  dialog = new Dialog("meetingRoom");
}, 5000);

// Lista de ações que serão executadas dentro da cena
export const sceneScript = [
  {
    type: "dialog", // Tipo de ação, neste caso, um diálogo
    title: "Inicia o dialógo de explicação da cena do Meeting Room", // Título da ação, usado para descrição
    params: {
      speechId: "FalaInicial", // Parâmetro específico para o diálogo, identificador do discurso
    },
    validation: (params) => {
      // Função de validação para determinar se a ação deve ser executada
      if (params.explanationMeetingRoom) return false; // Se a explicação do The Office já ocorreu, a ação não é válida
      return true; // Se a explicação do The Office não ocorreu, a ação é válida
    },
  },
];

// contém um dialogo que contém opções
export const feedbackMinigame = [
  {
    type: "dialog",
    title: "Pergunta 1 do feedback",
    params: {
      speechId: "Pergunta1",
      callback: (response) => {
        return new Promise(async (resolve) => {
          await dialog.generateDialog(
            response.index == 0 ? "respostaAcerto1" : (response.index == 1 ? "respostaErro1.1" : "respostaErro1.2")
          );
          if(response.index != 0) {
            await dialog.generateDialog("respostaErro");
          }
          resolve();
        });
      },
    },
  },
  {
    type: "dialog",
    title: "Pergunta 2 do feedback",
    params: {
      speechId: "Pergunta2",
      callback: (response) => {
        return new Promise(async (resolve) => {
          
          await dialog.generateDialog(
            response.index == 1 ? "respostaAcerto2" : (response.index == 0 ? "respostaErro2.1" : "respostaErro2.2")
          );

          if(response.index != 1) {
            await dialog.generateDialog("respostaErro");
          }
          resolve();
        });
      },
    },
  },
  {
    type: "dialog",
    title: "Pergunta 3 do feedback",
    params: {
      speechId: "Pergunta3",
      callback: (response) => {
        return new Promise(async (resolve) => {
          
          await dialog.generateDialog(
            response.index == 0 ? "respostaAcerto3" : (response.index == 1 ? "respostaErro3.1" : "respostaErro3.2") 
          );

          if(response.index != 0) {
            await dialog.generateDialog("respostaErro");
          }
          resolve();
        });
      },
    },
  },
  {
    type: "dialog",
    title: "Pergunta 4 do feedback",
    params: {
      speechId: "Pergunta4",
      callback: (response) => {
        return new Promise(async (resolve) => {
          
          await dialog.generateDialog(
            response.index == 0 ? "respostaAcerto4" : (response.index == 1 ? "respostaErro4.1" : "respostaErro4.2")
          );
          await dialog.generateDialog(
            "dialogFinalização"
          );
          resolve();
        });
      },
    },
  },
];
