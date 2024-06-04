import { Scene } from "phaser";

export class StartMenu extends Scene {

    constructor () {
        super({key: 'StartMenu'})
    }
    create () {
        this.add.image(100, 100, 'action-key')
        this.cameras.main.setBounds(0, 0, 1024, 768);
        this.cameras.main.setZoom(1);
    }
}