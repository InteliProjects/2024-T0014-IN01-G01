// import { Scene, Display } from 'phaser';
import DefaultScene from '../interfaces/Scene';
import Player from '../../sprites/player';
import { tiledSettings as theOfficeTiledSettings } from './tiled.settings';
import { interactableElements } from './mapElements';
import { sceneScript, finishScript } from './sceneScript';
import { Dialog } from '../../components/Dialog';
import  { sceneManager } from '../../components/SceneManager/SceneManager';

/**
 * Classe responsável por criar a cena do escritório
 */

export class TheOffice extends DefaultScene
{
  mapInfo;
  player;
  tilesetList;
  speechList = { };
  image;
  teclaE;
  hudManager;
  translateContainer;
  dialogManager;
  sceneManager;

  /**
   * Construtor responsável por instanciar uma nova scene
   */
  constructor (key = 'TheOffice')
  {
    super({ key });
    this.dialogManager = new Dialog('theOffice');
    this.sceneManager = sceneManager;
  }

  /**
   * Função responsável por criar os atributos básicos da cena e instanciar o jogador
   */
  create ()
  {   
    const music = this.sound.add('escritorio', {volume: 0.3, loop: true});
    music.play();
    const hudManager = this.scene.get('HudScene');
    hudManager.setHudVisibility(true);
    // Set tilemap, layers and colision tiles
    this.mapInfo = this.loadMapLayers('office', theOfficeTiledSettings);

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
      this.mapInfo.map.widthInPixels - 100, 
      this.mapInfo.map.heightInPixels,
      "bunny");
    this.physics.world.enable([ this.player ]);
    this.player.setMapCollision(this.mapInfo);

    this.cameras.main.startFollow(this.player, true);

    this.player.body.onOverlap = true;
    this.add.container(0, 0)

    this.add.image(294, 240, 'computador_ativo').setOrigin(0);
    
    this.events.once('postupdate', () => {
      setTimeout(async () => {
        this.generateInterectableElements(interactableElements);
        await this.sceneManager.initiateScene(sceneScript, this)
        sceneManager.status['explanationTheOffice'] = true;
      }, 500);
    }, this)
  
    //Adição do diálogo com o NPC
  setTimeout(async() => {
    sceneManager.status["dialog_NPC3"] = true;
    sceneManager.initiateScene(sceneScript, this);
    this.events.once('postupdate', () => {
    this.generateInterectableElements(interactableElements);
    this.isDialogActive = false;
    }, this)  
  }, 500)

    //Adição do diálogo com o NPC-arara
    setTimeout(async() => {
      sceneManager.status["dialog_NPC_arara"] = true;
      sceneManager.initiateScene(sceneScript, this);
      this.events.once('postupdate', () => {
      this.generateInterectableElements(interactableElements);
      this.isDialogActive = false;
      }, this)  
    }, 500)

    //Adição do diálogo com o NPC-cabra
    setTimeout(async() => {
      sceneManager.status["dialog_NPC_cabra"] = true;
      sceneManager.initiateScene(sceneScript, this);
      this.events.once('postupdate', () => {
      this.generateInterectableElements(interactableElements);
      this.isDialogActive = false;
      }, this)  
    }, 500)

    //Adição do diálogo com o NPC-cabra
    setTimeout(async() => {
      sceneManager.status["dialog_NPC_coruja"] = true;
      sceneManager.initiateScene(sceneScript, this);
      this.events.once('postupdate', () => {
      this.generateInterectableElements(interactableElements);
      this.isDialogActive = false;
      }, this)  
    }, 500)

  }

  /**
   * Função responsável por atualizar o status da cena
   */  
  update ()
  {
    this.player.update();
    if(this.sceneManager.status['negotiation'] && !this.sceneManager.status['finish_theOffice']) {
      this.sceneManager.status['finish_theOffice'] = true;
      this.finishScriptScene();
    }
  }

  async finishScriptScene() {
    await this.sceneManager.initiateScene(finishScript, this);
  }

  generateInterectableElements(interactableElements) {
    interactableElements.forEach(element => {
      const sprite = this.physics.add.sprite(element.x, element.y, element.sprite);

      (
        element.bodySize.width != undefined && 
        element.bodySize.height != undefined
      )
        ? sprite.body.setSize(element.bodySize.width, element.bodySize.height)
        : false;

      element.isVisible != undefined 
        ? sprite.setVisible(element.isVisible)
        : false;

        sprite.setScale(.1)
      this.physics.add.overlap(sprite, this.player, () => element.callback(this, sprite));
    })
  }
}