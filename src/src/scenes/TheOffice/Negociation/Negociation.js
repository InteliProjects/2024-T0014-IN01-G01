import DefaultScene from '../../interfaces/Scene'; // Importa a classe DefaultScene de um arquivo específico
import { sceneManager } from '../../../components/SceneManager/SceneManager';
import { wonNegotiationScript } from './sceneScript';
import { Dialog } from '../../../components/Dialog';

export class Negociation extends DefaultScene { // Define uma classe Negociation que estende a classe DefaultScene
    clausulas = []; // Declara um array vazio para armazenar cláusulas
    configuracoes; // Declara uma variável para armazenar configurações de cláusulas
    randomNumber = 0; // Inicializa uma variável para armazenar um número aleatório
    tentativas = 0; // Inicializa uma variável para contar as tentativas
    change = 0; // Inicializa uma variável para controlar a mudança de cena
    clausulaVisible = 0; // Inicializa uma variável para contar o número de cláusulas visíveis
    satsfaction = null; // Declara uma variável para armazenar uma imagem de satisfação
    satsfaction_meta = null; // Declara uma variável para armazenar uma imagem de satisfação meta
    satsfaction_sup = null; // Declara uma variável para armazenar uma imagem de satisfação sup
    x_1 = 209; // Define uma posição X para cláusulas
    x_2 = 401; // Define outra posição X para cláusulas
    x_tabela = 317; // Define uma posição X para a tabela
    y_tabela = 65; // Define uma posição Y para a tabela
    sceneManager;
    hudManager;

    constructor() { // Define o construtor da classe
        super({ key: 'Negociation' }); // Chama o construtor da classe pai com uma chave específica
        this.sceneManager = sceneManager;
        this.dialogManager = new Dialog('negotiation');
    }    

    create(){ // Define o método create para inicializar os elementos da cena
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'black_background'); // Adiciona uma imagem de fundo preto
        this.add.image(this.game.config.width/2, this.game.config.height/2, 'contrato').setOrigin(.5); // Adiciona uma imagem de fundo para o contrato
        this.hudManager = this.scene.get('HudScene'); // Obtém a cena 'HudScene'
        this.hudManager.isVisible = false;

        this.sceneManager.status['sourcing'] = true; 

        // Gerar as configurações para as cláusulas
        this.configuracoes = [
            this.gerarConfiguracao(this.x_1, 131, false, true), // Define configurações para uma cláusula
            this.gerarConfiguracao(this.x_1, 195, true, false), // Define configurações para outra cláusula
            this.gerarConfiguracao(this.x_1, 258, false, true), // Define configurações para outra cláusula
            this.gerarConfiguracao(this.x_2, 99, true, false), // Define configurações para outra cláusula
            this.gerarConfiguracao(this.x_2, 163, false, true), // Define configurações para outra cláusula
            this.gerarConfiguracao(this.x_2, 227, true, false) // Define configurações para outra cláusula
        ];

        // Adicionando cláusulas ao array
        this.configuracoes.forEach(config => this.adicionarClausula.call(this, this.clausulas, config));

        // Adicionando manipulador de eventos 'pointerdown' a todas as cláusulas
        for (let i = 0; i < this.clausulas.length; i++) {
            this.clausulas[i].sup.on('pointerdown', () => {
                this.negociar(i); // Chama a função de negociação quando uma cláusula é clicada
            });
        }
        // Adiciona imagens de satisfação
        this.satsfaction = this.add.image(this.x_tabela, this.y_tabela, 'satisfaction');
        this.satsfaction_meta = this.add.image(this.x_tabela, this.y_tabela, 'satisfaction_meta');
        this.satsfaction_sup = this.add.image(this.x_tabela, this.y_tabela, 'satisfaction_sup');
    }
 

    async update() { // Define o método update para atualizar a cena
        // Verifica se o número de tentativas é igual a 5 e o número de cláusulas visíveis é igual a 3 ou mais
        if(this.tentativas >= 5)
        {
            this.tentativas = 0;
            await this.finalizaGame();
            this.sceneManager.status['negotiation'] = true; 
            this.scene.stop('Sourcing'); // Para a cena 'Sourcing'
            this.scene.stop(); // Para a cena atual
        }
    }

    async finalizaGame() {
        this.clausulas[0].meta.setVisible(true);
        this.clausulas[0].sup.setVisible(false);
        this.clausulas[2].meta.setVisible(true);
        this.clausulas[2].sup.setVisible(false);
        this.clausulas[4].meta.setVisible(true);
        this.clausulas[4].sup.setVisible(false);

        this.clausulas[1].meta.setVisible(false);
        this.clausulas[1].sup.setVisible(true);
        this.clausulas[3].meta.setVisible(false);
        this.clausulas[3].sup.setVisible(true);
        this.clausulas[5].meta.setVisible(false);
        this.clausulas[5].sup.setVisible(true);

        this.satsfaction.setVisible(true).setDepth(2);
        
        this.scene.pause();
        
        await this.sceneManager.initiateScene(wonNegotiationScript, this); // Inicia a cena 'wonNegotiationScript'
        
        this.hudManager.isVisible = true;
    }
    
    gerarConfiguracao(x, y, supVisible, metaVisible) { // Define a função para gerar configurações de cláusulas
        return {
            x: x,
            y: y,
            supImagem: 'sup',
            metaImagem: 'meta',
            supVisible: supVisible,
            metaVisible: metaVisible
        };
    }

    adicionarClausula(array, config) { // Define a função para adicionar cláusulas ao array
        const { x, y, supImagem, metaImagem, supVisible, metaVisible } = config;
        array.push({
            sup: this.add.image(x, y, supImagem).setOrigin(0).setVisible(supVisible).setInteractive(), // Adiciona uma imagem de sup e a torna interativa
            meta: this.add.image(x, y, metaImagem).setOrigin(0).setVisible(metaVisible).setInteractive() // Adiciona uma imagem de meta e a torna interativa
        });
    }
    
    negociar(clausulaSelecionada) {
        this.tentativas++;
        // Gera um número aleatório
        let totalOfMetaClausules = Phaser.Math.Between(1, 3);
        totalOfMetaClausules = totalOfMetaClausules == 2 ? 3 : totalOfMetaClausules;
    
        // Inverte a visibilidade da cláusula selecionada
        const clausula = this.clausulas[clausulaSelecionada];

        const sortValue = () => { return Math.round(Math.random())-0.5 };
        const arrClausulas = this.clausulas.sort(sortValue);

        for (let i = 0; i < 6; i++) { // Loop sobre todas as cláusulas
            arrClausulas[i].sup.setVisible(false);
            arrClausulas[i].meta.setVisible(false);
            
            if(this.clausulas[clausulaSelecionada] === arrClausulas[i])  {
                arrClausulas[i].meta.setVisible(true);
                totalOfMetaClausules++;
                continue;
            }

            if(i < totalOfMetaClausules) {
                arrClausulas[i].meta.setVisible(true);
            } else {
                arrClausulas[i].sup.setVisible(true);
            }
        }
        
        // Atualiza a contagem de cláusulas visíveis
        this.clausulaVisible = totalOfMetaClausules++;
        
        // Atualiza a visibilidade das imagens de satisfação
        this.atualizarSatisfacao();
    }
    
    atualizarSatisfacao() {
        // Oculta todas as imagens de satisfação
        this.satsfaction.setVisible(false);
        this.satsfaction_meta.setVisible(false);
        this.satsfaction_sup.setVisible(false);

        // Determina qual imagem de satisfação mostrar com base na contagem de cláusulas visíveis
        if (this.clausulaVisible === 3) {
            this.satsfaction.setVisible(true);
        } else if (this.clausulaVisible < 3) {
            this.satsfaction_sup.setVisible(true);
        } else if (this.clausulaVisible > 3) {
            this.satsfaction_meta.setVisible(true);
        }
    }
}