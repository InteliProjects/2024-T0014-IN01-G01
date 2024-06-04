export const explanationStatus = [
  {
    type: "dialog",
    title: "Inicia o dialógo de explicação dos status de fornecedores",
    params: {
      speechId: "dialog_supplier_details",
    },
    validation: (params) => {
      if (params.supplierDetailsExplanation) return false;
      return true;
    }
  },
]