import { Boot } from './scenes/Boot';
import { TheOffice } from './scenes/TheOffice/TheOffice';
import TextTranslationPlugin from 'phaser3-rex-plugins/plugins/texttranslation-plugin.js';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import { MainMenu } from './scenes/MainMenu/MainMenu';
import { CoffeShop } from './scenes/CoffeShop/CoffeShop';
import { Sourcing } from './scenes/TheOffice/Sourcing/Sourcing';
import { SupplierDetails } from './scenes/TheOffice/SupplierDetails/SupplierDetails';
import {  Negociation } from './scenes/TheOffice/Negociation/Negociation';
import {  Confidentiality } from './scenes/TheOffice/Confidentiality/Confidentiality';
import CutsceneInicial from './scenes/CutSceneInicial/sceneInicial';
import CutsceneFinal from './scenes/CutSceneFinal/sceneFinal';
import CutsceneCreditos from './scenes/CutSceneCreditos/sceneCreditos';
import CutSceneCalendario from './scenes/TheOffice/CutSceneCalendario/sceneCalendario';
import { MeetingRoom } from './scenes/MeetingRoom/MeetingRoom';
import { HudScene } from './components/Hud/HudScene';
import { Onboarding } from './scenes/TheOffice/Onboarding/onboarding';
import { JardimOnboarding } from './scenes/TheOffice/Onboarding/doors_onboarding/jardim';  
import { CoffeShopOnboarding } from './scenes/TheOffice/Onboarding/doors_onboarding/coffeShop';  
import { TheOfficeOnboarding } from './scenes/TheOffice/Onboarding/doors_onboarding/theOffice';  
import { HallPrincipal } from './scenes/HallPrincipal/HallPrincipal';

/**
 * Essas são as configurações do jogo onde ficaram todos os dados básicos para instanciar o jogo
 */
const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {
        global: [
            {
                key: 'rexVirtualJoystick',
                plugin: VirtualJoystickPlugin,
                start: true
            },
            {
                key: 'rexTextTranslation',
                plugin: TextTranslationPlugin,
                start: true,
                mapping: 'translation'  // Add text-translation plugin to `scene.translation`
            }
        ]
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [
        Boot,
        TheOffice,
        CutsceneInicial,
        CutsceneFinal,
        CutsceneCreditos,
        CutSceneCalendario,
        MainMenu,
        CoffeShop,
        Sourcing,
        SupplierDetails,
        Onboarding,
        JardimOnboarding, 
        CoffeShopOnboarding,
        TheOfficeOnboarding,
        MeetingRoom,
        HudScene,
        Negociation,
        Confidentiality,
        HallPrincipal
    ],
    dom: {
        createContainer: true,
        parent: 'myHtml'
    },
    pixelArt: true,
};

/**
 * Instancia o jogo com as configurações definidas
 */
export const game = new Phaser.Game(config);