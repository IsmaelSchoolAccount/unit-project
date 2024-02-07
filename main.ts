function Player_y (jump: boolean) {
    sy += Gravity
    if (MainPlayer.isHittingTile(CollisionDirection.Bottom)) {
        inAir = 0
        sy = 0
    } else {
        inAir += 1
    }
    if (jump && inAir < jumpOffset) {
        sy = jumpHeight
    }
    return sy
}
function Player_x (Joystick: number) {
    sx += Joystick * Aceleration
    sx = sx * Friction
    return sx
}

function SpawnEnemy(enemyImg : Image, xPos : number, yPos : number) : Sprite{
    let enemy = sprites.create(enemyImg, SpriteKind.Enemy)
    enemy.setPosition(xPos, yPos)
    return enemy
}

function EnemyPatrol(enemy: Sprite, px1: number, py1: number, px2: number, py2 : number, speed: number){
    let moving2: boolean = enemy.x > px1
    if(moving2){
        MoveToPoint(enemy, px2, py2, speed)
    }
    else{
        MoveToPoint(enemy, px1, py1, speed)
    }
}

function MoveToPoint(sprite: Sprite, px: number, py: number, speed: number){
    let dirx = px - sprite.x
    let diry = py - sprite.y
    let mag = Math.sqrt((dirx ** 2) + (diry ** 2))
    sprite.setVelocity((dirx / mag) * speed, (diry / mag) * speed)
}

let testEnemy = SpawnEnemy(sprites.duck.duck1, 20, 1958)
let inAir = 0
let jumpOffset = 0
let jumpHeight = 0
let Gravity = 0
let Friction = 0
let Aceleration = 0
let sy = 0
let sx = 0
let MainPlayer: Sprite = null
MainPlayer = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
sx = 0
sy = 0
Aceleration = 10
Friction = 0.8
Gravity = 6
jumpHeight = -120
jumpOffset = 8
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(MainPlayer)
game.onUpdate(function () {
    EnemyPatrol(testEnemy, 20, 1958, 100, 1958, 20)
    MainPlayer.vx = Player_x(controller.dx())
    MainPlayer.vy = Player_y(controller.up.isPressed())
})
