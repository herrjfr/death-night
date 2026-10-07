let main = document.querySelector(".main")
let mainPlayer = document.querySelector(".main-player")

let mouseX;
let mouseY;

let playerX = 0
let playerY = 270

let minusX
let minusY

let angle

main.addEventListener("mousemove", (event) => {
    mouseX = event.offsetX
    mouseY = event.offsetY

    minusX = mouseX - playerX
    minusY = mouseY - playerY

    angle = Math.atan2(minusY, minusX) * 180 / Math.PI

    mainPlayer.style.transform = `rotate(${angle}deg)`
})

main.addEventListener("click", () => {
    let bullet = document.createElement("div")
    bullet.classList.add("bullet")

    let bulletX = playerX
    let bulletY = playerY

    let speed = 10

    bullet.style.left = playerX + "px"
    bullet.style.top = playerY + "px"

    let shot = setInterval(() => {

        bulletX += Math.cos(angle * Math.PI / 180) * speed
        bulletY += Math.sin(angle * Math.PI / 180) * speed

        bullet.style.left = bulletX + "px"
        bullet.style.top = bulletY + "px"
        if(bulletY<=0 || bulletY>=380 || bulletX>=750){
            bullet.remove()
            clearInterval(shot)
        }
    }, 10)

    main.append(bullet)
})