const staff = document.getElementById("staff")
const ctx = staff.getContext("2d");
ctx.fillStyle = "green";

staff.height = 400

window.addEventListener("resize", function(){
    staff.width = staff.clientWidth
})

function staffDraw() {
    [5, 6, 7, 8, 9, 16, 17, 18, 19, 20].forEach(y => {
        ctx.beginPath();
        ctx.moveTo(0, 16*y);
        ctx.lineTo(400, 16*y);
        ctx.stroke()
    });
}
staffDraw()

drawing = new Image();
drawing.src = "treble.png";
drawing.onload = function() {
   ctx.drawImage(drawing,0,0);
};