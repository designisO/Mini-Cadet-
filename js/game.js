var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game variables
var game;
var platforms;
var player;
var cursor;

var jumpHeight = -300;

// lauch game variable only if user is signed in.
(function launch(){
    let user = Moralis.User.current();
    if (!user) {
        console.log("Please Connect Wallet. Thanks!")
    }
    else{
        console.log(user.get('ethAddress') + " " + "logged in.")
        game = new Phaser.Game(config);
    }
})()

function preload ()
{
    this.load.image('background', 'assets/tiles/background.jpg');
    this.load.image('ground', 'assets/tiles/Tile (14).png');
    this.load.image('ground2', 'assets/tiles/Tile (13).png');
    this.load.image('boxes', 'assets/objects/box.png');
    
    this.load.image('player', 'assets/objects/Idle.png');
}

function create ()
{
    this.add.image(400, 300, 'background').setScale(0.55);
    


    platforms = this.physics.add.staticGroup();
    // bottom platforms #130 spacing
    platforms.create(65, 600, 'ground').setScale(0.5).refreshBody();
    platforms.create(195, 600, 'ground2').setScale(0.5).refreshBody();
    platforms.create(325, 600, 'ground2').setScale(0.5).refreshBody();
    platforms.create(455, 600, 'ground2').setScale(0.5).refreshBody();
    platforms.create(585, 600, 'ground2').setScale(0.5).refreshBody();
    platforms.create(715, 600, 'ground2').setScale(0.5).refreshBody();
    platforms.create(845, 600, 'ground2').setScale(0.5).refreshBody();



    // mid platforms

    platforms.create(195, 400, 'ground2').setScale(0.5).refreshBody();
    
    platforms.create(455, 400, 'ground2').setScale(0.5).refreshBody();
    platforms.create(585, 400, 'ground2').setScale(0.5).refreshBody();


    // door
    //platforms.create(730, 458, 'door').setScale(0.3).refreshBody();
    
    
    player = this.physics.add.sprite(100, 450, 'player').setScale(0.1).refreshBody();
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);
   
    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

}
else
{
    player.setVelocityX(0);

}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(jumpHeight);
}
}