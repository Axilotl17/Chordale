const staffCanv = document.getElementById("staff")
const overlayCanv = document.getElementById("overlay")

const staff = staffCanv.getContext("2d");
const overlay = overlayCanv.getContext("2d");
staff.fillStyle = "green";

staffCanv.height = 1600
overlay.height = 1600
staffCanv.width = (staffCanv.height/staffCanv.clientHeight)*staffCanv.clientWidth

window.addEventListener("resize", function(){
    staffCanv.width = (staffCanv.height/staffCanv.clientHeight)*staffCanv.clientWidth
    staffDraw()
})

function staffDraw() {
    staff.beginPath();
    staff.lineWidth = 8;
    [5, 6, 7, 8, 9, 16, 17, 18, 19, 20].forEach(y => {
        staff.moveTo(0, 64*y);
        staff.lineTo(staffCanv.width, 64*y);
        staff.stroke()
    });
    treble = new Image();
    treble.onload = function() {
    staff.drawImage(treble,0,0,800,2187,20,210,180,480);
    };
    treble.src = 'resources/GClef.png';
    bass = new Image();
    bass.onload = function() {
    staff.drawImage(bass,0,0,1280,1422,20,1020,200,220);
    };
    bass.src = 'resources/FClef.png';
    staff.closePath();
}

function drawOverlay(staff, n) {
    overlay.beginPath();
    overlay.fillRect(20, 20, 40, 40)
    overlay.stroke()
    overlay.fillStyle = "rgba(255, 255, 0, 0.5)";

}



staffDraw()
