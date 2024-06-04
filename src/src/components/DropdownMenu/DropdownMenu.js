// Função para criar um texto bitmap na cena
function createText(scene, text, fontSize, color) {
    return scene.add.bitmapText(0, 0, 'upheav', text, fontSize).setCharacterTint(color);
  }
  
// Função para criar um menu suspenso
export function dropDownSelect(x, y, width, height, scene, fontSize, defaultValue, buttonText, options, icon, changeCallback, texture) {
const stringOption = false;
var dropDownList = scene.rexUI.add.dropDownList({
      x, y,
      background: scene.add.image(0, 0, texture),
      icon: '',
      text: createText(scene, buttonText, fontSize),
      space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          icon: 10
      },
      width,
      height,
      options: options,
      list: {
          width: 100,
          height: 100,
          createBackgroundCallback: function (scene) {
              return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, 0x000000).setVisible(false);
          },
          createButtonCallback: function (scene, option, index, options) {
              var text = (stringOption) ? option : option.text;
              var button = scene.rexUI.add.label({
                  background: scene.add.image(0, 0, 'language_option_button'),
                  text: createText(scene, text, fontSize, 0x000000),
                  space: {
                      left: 10,
                      right: 10,
                      top: 10,
                      bottom: 10,
                      icon: 10
                  }
              });
              button.value = (stringOption) ? undefined : option.value;

              return button;
          },
          onButtonClick: function (button, index, pointer, event) {
              this.value = button.value;
              print.text += `Select ${button.text}, value=${button.value}\n`;
          },
      },
      setValueCallback: function (dropDownList, value, previousValue) {
        changeCallback(dropDownList, value, previousValue);
      },
      value: defaultValue
  }).layout();

  return dropDownList;
}