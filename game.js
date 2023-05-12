class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "Entrance");
    }

    preload(){
        this.load.image('door', './assets/door.png');
        this.load.image('arrow', './assets/arrow.png');
    }

    onEnter() {

        let d1 = this.add.image(400, 500, 'door')
        .setScale(0.7)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Door to Left Room"))
        .on('pointerdown', () => {
            this.gotoScene('demo2');
        })

        let d2 = this.add.image(1000, 500, 'door')
        .setScale(0.7)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Door to Right Room"))
        .on('pointerdown', () => {
            this.gotoScene('demo3');
        })

        this.floatingEffect(550, 400, 'arrow');
        this.floatingEffect(1150, 400, 'arrow');
    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "Left Room");
    }

    preload(){
        this.load.image('key', './assets/key.png');
    }

    onEnter() {

        let d3 = this.add.image(400, 500, 'door')
        .setScale(0.7)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Go Back to Entrance"))
        .on('pointerdown', () => {
            this.gotoScene('demo1');
        })

        if(!this.hasItem("key"))
        {
            let key = this.add.image(1000, 500, 'key')
            .setScale(0.8)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A key for unlock door"))
            .on('pointerdown', () => {
                this.showMessage("You get a KEY!");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
        }

    }
}

class Demo3 extends AdventureScene {
    constructor() {
        super("demo3", "Right Room");
    }
    onEnter() {

        let d4 = this.add.image(400, 500, 'door')
        .setScale(0.7)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Go Back to Entrance"))
        .on('pointerdown', () => {
            this.gotoScene('demo1');
        })

        let d5 = this.add.image(1000, 500, 'door')
        .setScale(0.7)
        .setInteractive()
        .on('pointerover', () => {
            if (this.hasItem("key")) {
                this.showMessage("You've got the key for this door.");
            } else {
                this.showMessage("It's locked. Can you find a key?");
            }
        })
        .on('pointerdown', () => {
            if (this.hasItem("key")) {
                this.loseItem("key");
                this.gotoScene('demo4');
            }
        })
    }
}

class Demo4 extends AdventureScene {
    constructor() {
        super("demo4", "Exit");
    }

    preload(){
        this.load.image('firework', './assets/firework.png');
    }

    onEnter() {
        this.add.text(100, 200)
        .setText("Congratulations, you escape !")
        .setFontSize('70px')

        this.fadeEffect(680, 600, 'firework');

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

