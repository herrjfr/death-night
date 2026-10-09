let main = document.querySelector(".main")
let mainPlayer = document.querySelector(".main-player")
const shootSound = document.querySelector(".shot-sound")

let mouseX;
let mouseY;

let playerX = 50
let playerY = 272

let minusX
let minusY

let angle

//!mouse kordinatini almaq
main.addEventListener("mousemove", (event) => {
    
    let rect = main.getBoundingClientRect()

    mouseX = event.clientX - rect.left
    mouseY = event.clientY - rect.top

    minusX = mouseX - playerX
    minusY = mouseY - playerY

    angle = Math.atan2(minusY, minusX) * 180 / Math.PI

    mainPlayer.style.transform = `rotate(${angle}deg)`
})

//!ates
main.addEventListener("click", () => {

    shootSound.currentTime = 0
    shootSound.play()

    let bullet = document.createElement("div")
    bullet.classList.add("bullet")

    let bulletX = playerX
    let bulletY = playerY

    let speed = 20

    bullet.style.left = playerX + "px"
    bullet.style.top = playerY + "px"

    let bulletAngle = angle
    
    let shot = setInterval(() => {

        bulletX += Math.cos(bulletAngle * Math.PI / 180) * speed
        bulletY += Math.sin(bulletAngle * Math.PI / 180) * speed

        bullet.style.left = bulletX + "px"
        bullet.style.top = bulletY + "px"

        bullet.style.transform = `rotate(${bulletAngle}deg)`

        if(bulletY<=0 || bulletY>=380 || bulletX>=1500){
            bullet.remove()
            clearInterval(shot)
        }

        //!gulle zombiye deyir
        let zombies = document.querySelectorAll(".zombie")
        zombies.forEach(zombie=>{
            let zombieX = Number(zombie.dataset.x)
            let zombieY = Number(zombie.dataset.y)
            if(bulletX>=zombieX && bulletX<=zombieX+70&&
                bulletY>=zombieY && bulletY<=zombieY+120){
                    bullet.remove()
                    clearInterval(shot)
                    zombie.remove()
                }
        })
    }, 10)

    main.append(bullet)
})

//!random zombie yaratmaq
function createZombie(){
    let zombie = document.createElement("div")

    zombie.classList.add("zombie1")
    zombie.classList.add("zombie")
    
    main.append(zombie)
    
    let zombieX = 1400
    let zombieY = Math.floor((Math.random()*80)+180)

    zombie.dataset.x = zombieX
    zombie.dataset.y = zombieY

    zombie.style.left = zombieX + "px"
    zombie.style.top = zombieY + "px"

    let zombieMove = setInterval(()=>{
        zombieX--

        zombie.dataset.x = zombieX

        zombie.style.left = zombieX + "px"

        if(zombieX<=300){
            zombie.remove()
            clearInterval(zombieMove)
            clearInterval(zombieWalk)
        }
    },30)
    let zombieWalk = setInterval(()=>{
        zombie.classList.toggle("zombie2")
    },700)
}

setInterval(()=>{
    createZombie()
},2000)