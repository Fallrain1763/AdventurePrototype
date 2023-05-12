class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "Entrance");
    }

    preload(){
        this.load.image('door', './assets/door.png');
    }

    onEnter() {

        let d1 = this.add.image(400, 500, 'door')
        .setScale(0.5)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Door to Left Room"))
        .on('pointerdown', () => {
            this.gotoScene('demo2');
        })

        let d2 = this.add.image(900, 500, 'door')
        .setScale(0.5)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Door to Right Room"))
        .on('pointerdown', () => {
            this.gotoScene('demo3');
        })
    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "Left Room");
    }
    onEnter() {

        this.input.on('pointerdown', () => this.scene.start('demo3'));
    }
}

class Demo3 extends AdventureScene {
    constructor() {
        super("demo3", "Right Room");
    }
    onEnter() {

        this.input.on('pointerdown', () => this.scene.start('demo4'));
    }
}

class Demo4 extends AdventureScene {
    constructor() {
        super("demo4", "Exit");
    }
    onEnter() {

        this.input.on('pointerdown', () => this.scene.start('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Demo3, Demo4, Outro],
    title: "Adventure Game",
});

