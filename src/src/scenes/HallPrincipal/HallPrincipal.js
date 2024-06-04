// import { Scene, Display } from 'phaser';
import DefaultScene from '../interfaces/Scene';
import Player from '../../sprites/player';
import { tiledSettings as theOfficeTiledSettings } from './tiled.settings';
import { interactableElements } from './mapElements';
import { sceneScript } from './sceneScript';
import { Dialog } from '../../components/Dialog';
import  { sceneManager } from '../../components/SceneManager/SceneManager';

/**
 * Classe responsável por criar a cena do escritório
 */

export class HallPrincipal extends DefaultScene
{
  mapInfo;
  player;
  tilesetList;
  // enable and disable movements
  isDialogActive = false;
  speechList = { };
  image;
  teclaE;
  translateContainer;
  dialogManager;
  sceneManager;

  /**
   * Construtor responsável por instanciar uma nova scene
   */
  constructor (key = 'HallPrincipal')
  {
    super({ key });
    this.dialogManager = new Dialog('hallPrincipal');
    this.sceneManager = sceneManager;
  }

  /**
   * Função responsável por criar os atributos básicos da cena e instanciar o jogador
   */
  async create ()
  {   
    const music = this.sound.add('cafeteria', {volume: 0.3, loop: true});
    music.play();
    
    const hudManager = this.scene.get('HudScene');
    // Set tilemap, layers and colision tiles
    this.mapInfo = this.loadMapLayers('hall', theOfficeTiledSettings);

    this.physics.world.setBounds(
      0, 0, 
      this.mapInfo.map.widthInPixels, this.mapInfo.map.heightInPixels);
    
    // Set camera
    this.cameras.main.setBounds(0, 0, this.mapInfo.map.widthInPixels, this.mapInfo.map.heightInPixels);
    this.cameras.main.setDeadzone(200, 100);
    this.cameras.main.setZoom(1);
    
    // Set player
    this.player = new Player(
      this, 
      this.mapInfo.map.widthInPixels - 577, 
      this.mapInfo.map.heightInPixels,
      "bunny");
    this.physics.world.enable([ this.player ]);
    this.player.setMapCollision(this.mapInfo);

    this.cameras.main.startFollow(this.player, true);

    this.player.body.onOverlap = true;
    
        //Diálogo com NPC do Hall
    setTimeout(async() => {
      sceneManager.status["dialog_NPC4"] = true;
      sceneManager.initiateScene(sceneScript, this);  
      this.events.once('postupdate', () => {
          this.generateInterectableElements(interactableElements);
          this.isDialogActive = false;
        }, this)  
    }, 500)

      //Diálogo com NPC_crocodilo
      setTimeout(async() => {
        sceneManager.status["dialog_NPC_crocodilo"] = true;
        sceneManager.initiateScene(sceneScript, this);  
        this.events.once('postupdate', () => {
            this.generateInterectableElements(interactableElements);
            this.isDialogActive = false;
          }, this)  
      }, 500)

      //Diálogo com NPC_ovelha
      setTimeout(async() => {
        sceneManager.status["dialog_NPC_ovelha"] = true;
        sceneManager.initiateScene(sceneScript, this);  
        this.events.once('postupdate', () => {
            this.generateInterectableElements(interactableElements);
            this.isDialogActive = false;
          }, this)  
      }, 500)

    // //Diálogo com Sr.Khali
    // this.events.once('postupdate', () => {
    //   this.generateInterectableElements(interactableElements);
    //   this.sceneManager.initiateScene(sceneScript, this)
    //   sceneManager.status["explanationHall"] = true;
    //   this.isDialogActive = false;
    // }, this)

  }

  /**
   * Função responsável por atualizar o status da cena
   */  
  update ()
  {
    // Capture movement keys
    this.player.update();
  }
}