const staff = document.getElementById("staff")
const ctx = staff.getContext("2d");
ctx.fillStyle = "green";

staff.height = 1600
staff.width = (staff.height/staff.clientHeight)*staff.clientWidth

window.addEventListener("resize", function(){
    staff.width = (staff.height/staff.clientHeight)*staff.clientWidth
})

function staffDraw() {
    ctx.lineWidth = 8;
    [5, 6, 7, 8, 9, 16, 17, 18, 19, 20].forEach(y => {
        ctx.beginPath();
        ctx.moveTo(0, 64*y);
        ctx.lineTo(staff.width, 64*y);
        ctx.stroke()
    });
    img = new Image();
    img.onload = function() {
    ctx.drawImage(img,0,0,800,2187,20,210,180,480);
    console.log("a")
    };
    img.src = 'resources/GClef.png';
}

staffDraw()
