export const clickableElements = [
    {
      name: "btnVisualizarSuppliers1",
      y: 211,
      x: 255,
      bodySize: { 
        width: 64,
        height: 64,
      },
      isVisible: true,
      isClickable: true,
      callback: (scene) => {
          if(!scene.hudManager.isDialogActive){
            scene.scene.launch('SupplierDetails', { 
              data: scene.listForn[0], 
              callback: scene.scene.stop
            });
            scene.scene.stop();
          }
        },
        sprite: 'card_button',
    },
    {
        name: "btnVisualizarSuppliers2",
        y: 211,
        x: 345,
        bodySize: { 
            width: 64,
            height: 64,
        },
        isVisible: true,
        isClickable: true,
        callback: (scene) => {
          if(!scene.hudManager.isDialogActive){
            scene.scene.launch('SupplierDetails', { 
              data: scene.listForn[1], 
              callback: scene.scene.stop
            });
            scene.scene.stop();
          }
        },
        sprite: 'card_button',
    },
    {
      name: "btnVisualizarSuppliers3",
      y: 211,
      x: 435,
      bodySize: { 
          width: 64,
          height: 64,
      },
      isVisible: true,
      isClickable: true,
      callback: (scene) => {
          if(!scene.hudManager.isDialogActive){
            scene.scene.launch('SupplierDetails', { 
              data: scene.listForn[2], 
              callback: scene.scene.stop
            });
            scene.scene.stop();
          }
        },
      sprite: 'card_button',
    },
    {
      name: "btnVisualizarSuppliers4",
      y: 211,
      x: 524,
      bodySize: { 
        width: 64,
        height: 64,
      },
      isVisible: true,
      isClickable: true,
      callback: (scene) => {        
        if(!scene.hudManager.isDialogActive){
          scene.scene.launch('SupplierDetails', { 
            data: scene.listForn[3], 
            callback: scene.scene.stop
          });
          scene.scene.stop();
        }
      },
      sprite: 'card_button',
    }
  ]