info.player1.setLife(3)
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function(sprite: Sprite, location: tiles.Location) {
    tiles.placeOnTile(MainPlayer, tiles.getTileLocation(5, 122))
    info.changeLifeBy(-1)
    
})
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
function Player_y (jump: boolean) {
    sy += Gravity
    // conditional statements and booleans
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

// Function with return value and parameters
function SpawnEnemy(enemyImg : Image, xPos : number, yPos : number) : Sprite{
    let enemy = sprites.create(enemyImg, SpriteKind.Enemy)
    enemy.setPosition(xPos, yPos)
    moving2List.push(true)
    return enemy
}

function EnemyPatrol(enemy: Sprite, px1: number, py1: number, px2: number, py2 : number, speed: number, enemyNum: number){
    if (enemy.x > px2 && moving2List[enemyNum]){
        moving2List[enemyNum] = false
    }
    else if (enemy.x < px1 && !moving2List[enemyNum]){
        moving2List[enemyNum] = true
    }
    if(enemy.data){
        MoveToPoint(enemy, px2, py2, speed, enemyNum)
    }
    else{
        MoveToPoint(enemy, px1, py1, speed, enemyNum)
    }
}

function MoveToPoint(sprite: Sprite, px: number, py: number, speed: number, enemyNum: number){
    if ((moving2List[enemyNum] && sprite.x > px) || (!moving2List[enemyNum] && sprite.x < px)){
        return
    }

    let dirx = px - sprite.x
    let diry = py - sprite.y
    let mag = Math.sqrt((dirx ** 2) + (diry ** 2))
    sprite.setVelocity((dirx / mag) * speed, (diry / mag) * speed)
}

let PlayerAnimationFall: Image[] = []
let PlayerAnimationJump: Image[] = []
let PlayerAnimationIdle: Image[] = []
let PlayerAnimationLeft: Image[] = []
let PlayerAnimationRight: Image[] = []
let PlayerAnimationFrame = 0
let inAir = 1000
// Arrays
let moving2List: Array<boolean> = []
let enemiesList: Array<Sprite> = []
let jumpOffset = 0
let jumpHeight = 0
let Gravity = 0
let Friction = 0
let Aceleration = 0
let sy = 0
let sx = 0

sx = 0
sy = 0
Aceleration = 10
Friction = 0.8
Gravity = 6
jumpHeight = -120
jumpOffset = 8
// Tilemaps
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(MainPlayer, tiles.getTileLocation(5, 122))
scene.cameraFollowSprite(MainPlayer)
let testEnemy = SpawnEnemy(sprites.castle.skellyFront, 50, 568)
enemiesList.push(testEnemy)
// Program output
game.onUpdate(function () {
    // for loop
    for(let i = 0; i < enemiesList.length; i++){
        EnemyPatrol(testEnemy, 20, 568, 100, 568, 20, i)
    }

    // User input
    MainPlayer.vx = Player_x(controller.dx())
    MainPlayer.vy = Player_y(controller.up.isPressed())
})
game.onUpdateInterval(200, function () {
    Animation()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(player: Sprite){
    player.setPosition(5, 122)
})
