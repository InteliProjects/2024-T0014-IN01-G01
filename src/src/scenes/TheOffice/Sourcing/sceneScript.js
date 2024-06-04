export const explanationScript = [
  {
    type: "dialog",
    title: "Inicia o dialógo de explicação da cena do Sourcing",
    params: {
      speechId: "explanationSourcing",
    },
    validation: (params) => {
      if (params.sourcingExplanation) return false;
      return true;
    }
  },
]