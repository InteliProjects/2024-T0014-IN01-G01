import { game } from "../main";

/**
 * Essa classe é responsável por guardar todos os atributos e funções básicas de um jogador
 */
export default class Player extends Phaser.Physics.Arcade.Sprite
{
  scene;
  spritePlayer;
  movementKeys;
  speed = 200;
  joystick;
  isActionKeyEnabled = false;
  actionKeySprite;
  hudManager = game.scene.getScene('HudScene');
  idleAnim = 'idleDown';
  isMovementsEnabled = true;
  
  /**
   * Construtor da classe, responsável por iniciar os atributos básicos do jogador e instanciar a sprite
   */
  constructor(scene, x, y, sprite)
  {
    super(scene, x, (y-45), sprite);
    this.spritePlayer = sprite;
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this
    .setScale(1)
    .setCollideWorldBounds(true)
    .setFlipX(false)
    .setDepth(10);
    
    this.body.onOverlap = true;
    this.body.onCollide = true;

    if(this.spritePlayer === "bunny")
    {
      this.body.setSize(32, 16, true);
      // Compensar offset do posicionamento nos parâmetros do super acima!!!
      this.body.setOffset(0, 45);
    }
    else
    {
      this.body.setSize(38, 35, true);
      // Compensar offset do posicionamento nos parâmetros do super acima!!!
      this.body.setOffset(5, 5);
    }

    this.actionKeySprite = this.scene.add.sprite(this.x, this.y - this.height, 'action-key');
    this.actionKeySprite.setOrigin(0.5, 1).setDepth(10);

    // Initialize sheets
    this.createSheets();
    this.play('idleDown')
    this.actionKeySprite.play('press');
    this.walkSoundEffect = this.scene.sound.add('walk', {volume: 2, loop: true}).setRate(1.5);
  }

  setMapCollision(mapInfo) {
    this.setCollision(mapInfo.tilesets.map(tileset => tileset.layers));
  }

  setActionKeyEnabled(enabled) {
    this.isActionKeyEnabled = enabled
  }

  setMovementsEnabled(enabled) {
    this.isMovementsEnabled = enabled;
  }
  /**
   * Função responsável por atualizar o status da classe player
   */
  update() {
      
    if(this.hudManager.getMovement().STOP) this.play(this.idleAnim, true);

    !this.hudManager.isDialogActive ? Promise.resolve(
      this.setVelocity(0),
      this.movementTriggers['UP'](this.hudManager.getMovement().UP),
      this.movementTriggers['DOWN'](this.hudManager.getMovement().DOWN),
      this.movementTriggers['LEFT'](this.hudManager.getMovement().LEFT),
      this.movementTriggers['RIGHT'](this.hudManager.getMovement().RIGHT),
    ) : this.setVelocity(0);

    // Validate if player is moving and play walk sound effect
    if((this.body.velocity.x != 0 || this.body.velocity.y != 0) && !this.walkSoundEffect.isPlaying) {
      this.walkSoundEffect.play();
    } else if(this.body.velocity.x == 0 && this.body.velocity.y == 0) {
      this.walkSoundEffect.stop();
    }

    this.actionKeySprite.setVisible(this.isActionKeyEnabled);
    this.actionKeySprite.setPosition(this.x, this.y - 15);
  }

  /**
   * Classe responsável por criar os sheets que vão ser utilizados na animação do jogador
   */
  createSheets() {
    this.anims.create({
      key: "walkDown",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers(this.spritePlayer, { start: 0, end: this.spritePlayer === "bunny" ? 3 : 1 }),
      repeat: -1
    });

    this.anims.create({
      key: "idleDown",
      frameRate: 1,
      frames: this.anims.generateFrameNumbers(this.spritePlayer, { start: 1, end: 1 }),
      repeat: 0
    });

    this.anims.create({
      key: "walkUp",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers(this.spritePlayer, { start: this.spritePlayer === "bunny" ? 4 : 2, end: this.spritePlayer === "bunny" ? 7 : 3 }),
      repeat: -1
    });

    this.anims.create({
      key: "idleUp",
      frameRate: 1,
      frames: this.anims.generateFrameNumbers(this.spritePlayer, { start: this.spritePlayer === "bunny" ? 5 : 3, end: this.spritePlayer === "bunny" ? 5 : 3 }),
      repeat: 0
    });

    this.anims.create({
      key: "walkRight",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers(this.spritePlayer, { start: this.spritePlayer === "bunny" ? 8 : 4, end: this.spritePlayer === "bunny" ? 11 : 5 }),
      repeat: -1
    });

    this.anims.create({
      key: "idleRight",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers(this.spritePlayer, { start: this.spritePlayer === "bunny" ? 9 : 5, end: this.spritePlayer === "bunny" ? 9 : 5 }),
      repeat: -1
    })
    
    this.anims.create({
      key: "walkLeft",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers(this.spritePlayer, { start: this.spritePlayer === "bunny" ? 12 : 6, end: this.spritePlayer === "bunny" ? 15 : 7 }),
      repeat: -1
    });

    this.anims.create({
      key: "idleLeft",
      frameRate: 1,
      frames: this.anims.generateFrameNumbers(this.spritePlayer, { start: this.spritePlayer === "bunny" ? 13 : 7, end: this.spritePlayer === "bunny" ? 13 : 7 }),
      repeat: 0
    });
    
    this.actionKeySprite.anims.create({
      key: 'press',
      frameRate: 2,
      frames: this.anims.generateFrameNumbers('action-key', {start: 0, end: 1}),
      repeat: -1
    });
  }

  /**
   * Função responsável por capturar os triggers de movimentação do jogador
   */
  movementTriggers = {
    UP: (move) => {
      if(!move) return; 

      this.idleAnim = 'idleUp';
      this.play("walkUp", true);
      this.setVelocityY(- this.speed);
    },
    DOWN: (move) => {
      if(!move) return; 

      this.idleAnim = 'idleDown';
      this.play('walkDown', true);
      this.setVelocityY(this.speed)
    },
    LEFT: (move) => {
      if(!move) return; 

      this.idleAnim = 'idleLeft';
      this.setFlipX(false);
      this.play('walkLeft', true);
      this.setVelocityX(- this.speed);
    },
    RIGHT: (move) => {
      if(!move) return; 

      this.idleAnim = 'idleRight';
      this.setFlipX(false);
      this.play('walkRight', true);
      this.setVelocityX(this.speed);
    }
  }  

  /**
   * Função responsável por setar os objetos que vão colidir com o jogador
   */
  setCollision(collisionObjects) {
    collisionObjects.forEach(element => {
      this.scene.physics.add.collider(this, element);
    });
  }

  isTriggered() {
        return this.hudManager.captureTrigger();
  }
}