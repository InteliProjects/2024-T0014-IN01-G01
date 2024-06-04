import DefaultScene from "../interfaces/Scene";
import { tiledSettings } from "./tiled.settings";
import Player from "../../sprites/player";
import { interactableElements } from "./mapElements";
import { Dialog } from "../../components/Dialog";
import { sceneManager } from "../../components/SceneManager/SceneManager";
import { sceneScript } from "./sceneScript";

export class CoffeShop extends DefaultScene {

  dialogManager;
  hudManager;
  music;
  
  constructor ()
  {
    super({ key: 'CoffeShop' });
    this.dialogManager = new Dialog('coffeShop');
    this.sceneManager = sceneManager;
  }

  create() {    
    this.music = this.sound.add('cafeteria', {volume: 0.3, loop: true});
    this.music.play();
    const hudManager = this.scene.get('HudScene');
    hudManager.setHudVisibility(true);
    // Set tilemap, layers and colision tiles
    this.mapInfo = this.loadMapLayers('coffeeshop', tiledSettings);
    
    // Set player
    this.player = new Player(this, 350, 130, "bunny"); // Cria um novo jogador na posição (350, 130)
    this.physics.world.enable([ this.player ]); // Habilita a física para o jogador
    this.player.setMapCollision(this.mapInfo); // Define as colisões do mapa para o jogador

    // Define os limites do mundo físico para serem iguais aos do mapa
    this.physics.world.setBounds(
      0, 0, 
      this.mapInfo.map.widthInPixels, this.mapInfo.map.heightInPixels);
    
    // Set camera
    // Define os limites da câmera para serem iguais aos do mapa
    this.cameras.main.setBounds(0, 0, this.mapInfo.map.widthInPixels, this.mapInfo.map.heightInPixels);
    this.cameras.main.setDeadzone(200, 100); // Define uma zona morta para a câmera
    this.cameras.main.setZoom(1); // Define o zoom da câmera
    this.cameras.main.startFollow(this.player); // Faz a câmera seguir o jogador
    
    setTimeout(async () => {
      // Gera os elementos que serão interagíveis no mapa
      this.generateInterectableElements(interactableElements);
      
      // Inicia o script da cena atual
      await sceneManager.initiateScene(sceneScript, this);
      sceneManager.status['firstDialog'] = true; // Define o status 'firstDialog' como verdadeiro

  }, 1000);

//Adição do diálogo com o NPC1
setTimeout(async() => {
  sceneManager.status["dialog_NPC1"] = true;
  sceneManager.initiateScene(sceneScript, this);
  this.events.once('postupdate', () => {
  this.generateInterectableElements(interactableElements);
  this.isDialogActive = false;
  }, this)  
}, 500)

  //Adição do diálogo com o NPC2
  setTimeout(async() => {
    sceneManager.status["dialog_NPC2"] = true;
    sceneManager.initiateScene(sceneScript, this);
    this.events.once('postupdate', () => {
    this.generateInterectableElements(interactableElements);
    this.isDialogActive = false;
    }, this)  
  }, 500)

  //Adição do diálogo com o NPC_cachorro
  setTimeout(async() => {
    sceneManager.status["dialog_NPC_cachorro"] = true;
    sceneManager.initiateScene(sceneScript, this);
    this.events.once('postupdate', () => {
    this.generateInterectableElements(interactableElements);
    this.isDialogActive = false;
    }, this)  
  }, 500)

  }

  update() {
    this.player.update(sceneScript); // Atualiza o jogador com o script da cena
  }
}