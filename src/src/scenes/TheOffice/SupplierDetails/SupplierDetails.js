// import { Scene, Display } from 'phaser';
import DefaultScene from '../../interfaces/Scene';
import { Dialog } from "../../../components/Dialog";
import { sceneManager } from '../../../components/SceneManager/SceneManager';
import { explanationStatus } from './sceneScript';

/**
 * Classe responsável por criar a cena do escritório
 */
export class SupplierDetails extends DefaultScene
{
    player;
    fornecedor;
    tilesetList;
    speechList = { };
    image;
    teclaE;
    translateContainer;
    dialogManager;
    selectCallback;
    nome;
    desc;
    logo;
   /*
   * Construtor responsável por instanciar uma nova scene
   */
    constructor (key = 'SupplierDetails')
    {
        super({ key });
        this.dialogManager = new Dialog('supplierDetails');
    }

    init(data)
    {
        this.fornecedor = data.data;
        this.selectCallback = data.selectCallback;
    }

    preload(){
        // tem um erro nessa parte do código, ao invés dele definir novamente as imagens ele usa
        // a mesma imagem para todos os fornecedores        
        this.load.image('logo' + this.fornecedor.id, this.fornecedor.logo);
        this.load.image('nome' + this.fornecedor.id,  this.fornecedor.nome);
        this.load.image('descricao'+ this.fornecedor.id, this.fornecedor.descricao);
    }

    create(){
        this.hudManager = this.scene.get('HudScene');
        this.hudManager.isVisible = false;
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'black_background').setDepth(0);
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'supplier_background').setDepth(1);

        this.add.image(58, 48, 'logo'+this.fornecedor.id).setOrigin(0).setScale(1.1).setDepth(2);
        this.add.image(284, 68, 'nome'+this.fornecedor.id).setOrigin(0).setDepth(2);
        this.add.image(285, 97, 'descricao'+this.fornecedor.id).setOrigin(0).setScale(1).setDepth(2);
        const btnSelecionar = this.add.image(325, 225, 'selecionar_button').setInteractive().setOrigin(0).setScale(0.35).setDepth(2);
        const btnRecusar = this.add.image(455, 225, 'recusar_button').setInteractive().setOrigin(0).setScale(0.35).setDepth(2);

        btnRecusar.on('pointerdown', () => !this.hudManager.isDialogActive ? this.acaoBtn('recusar') : false, this);
        btnSelecionar.on('pointerdown', () => !this.hudManager.isDialogActive ? this.acaoBtn('selecionar') : false, this);

        this.events.once('postupdate', () => {
            setTimeout(async () => {
                await sceneManager.initiateScene(explanationStatus, this);
                sceneManager.status['supplierDetailsExplanation'] = true;
            }, 500);
        })
    }

    acaoBtn(botao){
        if(botao == 'selecionar'){
            setTimeout(async () => {
                switch(this.fornecedor.id) {
                    case 'stargate':
                        await this.dialogManager.generateDialog('stargate_approved')
                        .then(() => {
                            this.scene.launch("Sourcing");
                            this.scene.stop()
                        });
                        break;
                    case 'intercom':
                        await this.dialogManager.generateDialog('intercom_approved')
                        .then(() => {
                            this.scene.launch("Sourcing");
                            this.scene.stop()
                        });
                        break;
                    case 'quantumleap':
                        await this.dialogManager.generateDialog('quantum_approved')
                        .then(() => {
                            this.scene.launch("Sourcing");
                            this.scene.stop()
                        });
                        break;
                    case 'nexus':
                        await this.dialogManager.generateDialog('nexus_approved')
                        .then(() => {
                            // this.scene.launch('Negociation', { data: this.fornecedor, callback: this.selectCallback });
                            this.scene.launch('Confidentiality');
                            this.scene.stop()
                        });
                        break;
                }
            }, 500);
        }
        else if(botao == 'recusar' && this.fornecedor.aprovado){
            this.scene.launch("Sourcing");
            this.scene.stop()
        }
        else{ 
            this.scene.launch("Sourcing");
            this.scene.stop()
        }
    }
}
