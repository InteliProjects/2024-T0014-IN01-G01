import { Scene } from 'phaser';

export default class DefaultScene extends Scene {

  clickableEnabled = true;

  /**
   * Construtor responsável por instanciar uma nova scene
   */
  constructor (params)
  {
    super({ key: params.key });
  }

  /**
   * 
   * @param {[
   *  {
   *    name: string, // Nome do elemento
   *    x: number, // Posição x
   *    y: number, // Posição y
   *    callback: function {} // Função de callback
   *    sprite: string, // Sprite do elemento
   *  }
   * ]} interactableElements 
   */
  generateInterectableElements(interactableElements) {
    interactableElements.forEach(element => {
      const sprite = this.physics.add.sprite(element.x, element.y, element.sprite);

      (element.bodySize.width != undefined && 
      element.bodySize.height != undefined)
        ? sprite.body.setSize(element.bodySize.width, element.bodySize.height)
        : false;

      element.isVisible != undefined 
        ? sprite.setVisible(element.isVisible)
        : false;

      this.physics.add.overlap(sprite, this.player, () => element.callback(this, sprite));
    })
  }

  generateClickableElements(interactableElements) {
    interactableElements.forEach(element => {
      const sprite = this.add.sprite(element.x, element.y, element.sprite)
        .setInteractive()
        .setOrigin(0);

      (element.bodySize.width != undefined && 
      element.bodySize.height != undefined)
        ? sprite.setSize(element.bodySize.width, element.bodySize.height)
        : false;

      element.isVisible != undefined 
        ? sprite.setVisible(element.isVisible)
        : false;

      element.isClickable != undefined
        ? sprite.on('pointerdown', () => this.clickableEnabled ? element.callback(this, sprite) : false, this)
        : false;
    })
  }

  enableClickables(enabled = true) {
    this.clickableEnabled = enabled;
  }

  /**
   * Função responsável por carregar as layers do mapa
   * params: 
   *  key: string, // Nome do mapa importado
   *  tiledSettings: 
   *  [{
   *      tilesetName: string, // Nome do tileset
   *      layers: [{ // Lista de layers
   *         layerName: string, // Nome da layer
   *         collision: boolean, // Se a layer tem colisão
   *         collisionTiles: { // Configurações de colisão
   *           between: { // Colisão entre tiles com inicio e fim
   *             start: number, 
   *             end: number
   *           }
   *           current: number[], // Colisão em tiles específicos
   *         }
   *      }]
   *     }] // Configurações do mapa
   */
  loadMapLayers(key, tiledSettings) {
    // implement the Tilemap
    const tiledMap = this.make.tilemap({ key });

    this.tilesetList = tiledSettings.map(tilesetInfo => {
      const tileset = tiledMap.addTilesetImage(
        tilesetInfo.tilesetName, 
        tilesetInfo.tilesetName);

      const layers = this.loadLayers(tilesetInfo.layers, tileset, tiledMap);

      return {
        tilesets: [ tileset ],
        layers
      };
    });

    return {
      map: tiledMap,
      tilesets: this.tilesetList
    };
  }  

  /**
   * Essa função é responsável por gerar as layers do tiledmaps e setar as colisões
   * @param {[
   * {
   *  layers: [{
   *         layerName: string, // Nome da layer
   *         collision: boolean, // Se a layer tem colisão
   *         collisionTiles: { // Configurações de colisão
   *           between: { // Colisão entre tiles com inicio e fim
   *             start: number, 
   *             end: number
   *           }
   *           current: number[], // Colisão em tiles específicos
   *         }
   * }],
   * tileset: Phaser.Tilemaps.Tileset,
   * tiledMap: Phaser.Tilemaps.Tilemap
   * 
   */
  loadLayers(layers, tileset, tiledMap) {
    return layers.map(layerInfo => {
      const layer = tiledMap.createLayer(
        layerInfo.layerName, 
        tileset, 
        0, 
        0);
      
      layerInfo.collideByProperty
        ? layer.setCollisionByProperty(
            { collides: true },
            layerInfo.collision
          )
        : false
      
      layerInfo.collisionBetween
        ? layer.setCollisionBetween(
            layerInfo.collisionTiles.between.start, 
            layerInfo.collisionTiles.between.end, 
            layerInfo.collision)
        : false;

      layerInfo.collisionCurrent
        ? layer.setCollision(
            layerInfo.collisionTiles.current, 
            layerInfo
          )
        : false;

      return layer;
    });
  }
}