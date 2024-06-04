import { Scene } from 'phaser';

export const defaultLanguage = 
    localStorage.getItem('gameLanguage')
    ? localStorage.getItem('gameLanguage') 
    : 'en';

/**
 * Função utilizada como "Bootstrap" que é responsável por carregar os assets
 * para o preloader
 */
export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    /**
     * Função responsável por carregar os assets base do jogo
     */
    preload ()
    {
        this.load.spritesheet('woman_person', 'assets/persons/woman_player.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('office_tileset', 'assets/tiled/office_tileset.png');
        this.load.image('maze_tilemap', 'assets/tiled/meetingroom_tileset.png');
        this.load.image('coffeeshop_tileset', 'assets/tiled/coffeeshop_tileset.png');
        this.load.image('meetingroom_tileset', 'assets/tiled/meetingroom_tileset.png');
        this.load.image('labirinto_tileset', 'assets/tiled/labirinto_tileset.png');
        this.load.image('hall_tileset', 'assets/tiled/hall_tileset.png');
        this.load.tilemapTiledJSON('office', 'assets/tiled/office.json');
        this.load.tilemapTiledJSON('coffeeshop', 'assets/tiled/coffeeshop.json');
        this.load.tilemapTiledJSON('meetingroom', 'assets/tiled/meetingroom.json');
        this.load.tilemapTiledJSON('labirinto', 'assets/tiled/labirinto.json');
        this.load.tilemapTiledJSON('hall', 'assets/tiled/hall.json');
        this.load.spritesheet('pressed_button', 'assets/ui/shake_button.png', {frameWidth: 128, frameHeight: 64});
        this.load.bitmapFont('upheav', 'assets/fonts/Upheaval20px.png', 'assets/fonts/Upheaval20px.xml');
        this.load.bitmapFont('nokia', 'assets/fonts/Nokia8px.png', 'assets/fonts/Nokia8px.xml');
        this.load.bitmapFont('determination', 'assets/fonts/FontUT16px.png', 'assets/fonts/FontUT16px.xml');
        this.load.spritesheet('action-key', 'assets/tiled/E-Key.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('dummy', 'assets/persons/dummy-sheet.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('bunny', 'assets/persons/playerbunny.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('bunnyKhali', 'assets/persons/chibi.png', {frameWidth: 48, frameHeight: 41});
        this.load.spritesheet('calendario', 'assets/ui/calendario.png', {frameWidth: 640, frameHeight: 360});
        this.load.image('language_icon', 'assets/ui/select_language_icon.png');
        this.load.image('language_button', 'assets/ui/language_button.png');
        this.load.image('language_option_button', 'assets/ui/language_option_button.png');
        this.load.image('back_to_main_menu_button', 'assets/ui/back_to_main_menu_button.png');        
        this.load.html('start_menu', 'assets/ui/start_menu.html');
        this.load.image('background', 'assets/ui/menu_background_zoopliers.png');
        this.load.json('dialogs', `assets/locales/${defaultLanguage}/dialogs.json`);
        this.load.image('card', 'assets/ui/assets/card.png');
        this.load.html('detalheForn', 'assets/ui/detalheForn/item.html');
        this.load.html('listaForn', 'assets/ui/listaForn/listaForn.html');
        this.load.image('sourcing_background', 'assets/tiled/imac_screen_640x360.png');
        this.load.image('supplier_background', 'assets/tiled/imac_screen_supplier_details.png');
        this.load.image('search_button', 'assets/tiled/search.png');
        this.load.image('card_button', 'assets/tiled/card_button.png');
        this.load.image('contrato', 'assets/tiled/service_contract.png');
        this.load.image('sup', 'assets/tiled/supplier_button.png');
        this.load.image('meta', 'assets/tiled/meta_button.png');
        this.load.image('computador_ativo', 'assets/tiled/computador_ativo.png');
        this.load.image('meta', 'assets/tiled/imagens_contrato/meta_button.png');
        this.load.image('meta_sombra', 'assets/tiled/imagens_contrato/meta_button_cornder_shadow.png');
        this.load.image('meta_sombra_full', 'assets/tiled/imagens_contrato/meta_button_full_shadow.png');
        this.load.image('top_joystick', 'assets/ui/top_joystick.png');
        this.load.image('base_joystick', 'assets/ui/base_joystick.png');
        this.load.image('action_trigger', 'assets/ui/action_trigger.png');
        this.load.image('top_joystick', 'assets/ui/top_joystick.png');
        this.load.image('base_joystick', 'assets/ui/base_joystick.png');
        this.load.image('action_trigger', 'assets/ui/action_trigger.png');
        this.load.image('sup_sombra', 'assets/tiled/imagens_contrato/supplier_button_corner_shadow.png');
        this.load.image('sup_sombra_full', 'assets/tiled/imagens_contrato/supplier_button_full_shadow.png');
        this.load.image('satisfaction', 'assets/tiled/imagens_contrato/barra_de_satisfacao.png');
        this.load.image('satisfaction_meta', 'assets/tiled/imagens_contrato/barra_de_satisfacao_meta.png');
        this.load.image('satisfaction_sup', 'assets/tiled/imagens_contrato/barra_de_satisfacao_sup.png');
        this.load.image('black_background', 'assets/tiled/black_background.png');
        this.load.image('selecionar_button', 'assets/tiled/selecionar.png');
        this.load.image('select_button', 'assets/tiled/select.png');
        this.load.image('recusar_button', 'assets/tiled/recusar.png');
        this.load.image('deny_button', 'assets/tiled/deny.png');
        this.load.image('cutsceneinicialcompleta', 'assets/ui/cutscene/cutsceneinicialcompleta.png');
        this.load.image('coelho_head', 'assets/ui/portraits/coelho_head.png');
        this.load.image('coelho_head_shock', 'assets/ui/portraits/coelho_head_shock.png');
        this.load.image('coelho_head_happy', 'assets/ui/portraits/coelho_head_happy.png');
        this.load.image('coelho_head_sad', 'assets/ui/portraits/coelho_head_sad.png');
        this.load.image('coelho_head_talk', 'assets/ui/portraits/coelho_head_talk.png');
        this.load.image('coelho_head_think', 'assets/ui/portraits/coelho_head_think.png');
        this.load.image('llama_head', 'assets/ui/portraits/llama_head.png');
        this.load.image('llama_head_happy', 'assets/ui/portraits/llama_head_happy.png');
        this.load.image('llama_head_sad', 'assets/ui/portraits/llama_head_sad.png');
        this.load.image('llama_head_wink', 'assets/ui/portraits/llama_head_wink.png');
        this.load.image('llama_head_whoops', 'assets/ui/portraits/llama_head_whoops.png');
        this.load.image('final1', 'assets/ui/final1.png');
        this.load.image('final2', 'assets/ui/final2.png');
        this.load.image('llama_head_happy', 'assets/ui/portraits/llama_head_happy.png');
        this.load.image('elefante_head_happy', 'assets/ui/portraits/elefante_head_happy.png');
        this.load.image('explain_button', 'assets/ui/explain_button.png');
        this.load.image('elefante', 'assets/persons/elefante.png');
        this.load.image('jardim', 'assets/tiled/jardim.png');
        this.load.image('onboarding_escritorio', 'assets/tiled/onboarding_escritorio.png');
        this.load.image('explain_button', 'assets/ui/explain_button.png');
        this.load.image('folderExplain', 'assets/ui/feedback/folder1.png');
        this.load.image('folderFeedback', 'assets/ui/feedback/folder2.png');
        this.load.image('mapLabirinto', 'assets/ui/mapa.png');
        this.load.image('coffeShop', 'assets/ui/coffeShop.png');
        this.load.image('theOffice', 'assets/ui/theOffice.png');
        this.load.image('mapIcon', 'assets/ui/mapIcon.png');
        this.load.spritesheet('folderIcon', 'assets/ui/folderIcon.png', {frameWidth: 32, frameHeight: 25});
        this.load.image('confidencialidade1', 'assets/ui/confidencialidade1.png');
        this.load.image('confidencialidade2', 'assets/ui/confidencialidade2.png');
        this.load.image('confidencialidade', 'assets/ui/confidencialidade.png');
        this.load.spritesheet('seta', 'assets/ui/arrow.png', {frameWidth: 24, frameHeight: 24});
        this.load.audio('mainmenu_music', 'assets/sounds/trilha_sonora/menu_inicial.mp3');
        this.load.audio('cafeteria', 'assets/sounds/trilha_sonora/cafeteria.mp3');
        this.load.audio('escritorio', 'assets/sounds/trilha_sonora/escritorio.mp3');
        this.load.audio('labirinto', 'assets/sounds/trilha_sonora/labirinto.mp3');
        this.load.audio('feedback', 'assets/sounds/trilha_sonora/feedback.mp3');
        this.load.audio('walk', 'assets/sounds/efeitos_sonoros/walk_sound.mp3');
        this.load.audio('pasta_effect', 'assets/sounds/efeitos_sonoros/pasta_effect_sound.mp3');
        this.load.image('close_button', 'assets/ui/close_button.png');
        this.load.image('controlls_button', 'assets/ui/controls_button.png');
        this.load.image('controlls_tutorial', 'assets/ui/tutorial_basico.png');
        this.load.image('background_dialog', 'assets/ui/background_dialog.png');
        this.load.image('background_options_dialog', 'assets/ui/background_options_dialog.png');
        this.load.image('titulo_green_bean', 'assets/ui/titulo_green_bean.png');
        this.load.image('titulo_expresso_repair', 'assets/ui/titulo_expresso_repair.png');
        this.load.image('titulo_cafetech', 'assets/ui/titulo_cafetech.png');
        this.load.image('titulo_heritage', 'assets/ui/titulo_heritage.png');
        this.load.image('capivara', 'assets/persons/capivara.png');
        this.load.image('gata', 'assets/persons/gata.png');
        this.load.image('koala', 'assets/persons/koala.png');
        this.load.image('pinguim', 'assets/persons/pinguim.png');
        this.load.image('peixe', 'assets/persons/peixe.png');
        this.load.image('arara', 'assets/persons/arara.png');

    }
    
    create ()
    {
        this.scene.start('MainMenu');
        this.scene.launch('HudScene');
    }
}
