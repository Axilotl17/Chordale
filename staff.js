const staffCanv = document.getElementById("staff")
const overlayCanv = document.getElementById("overlay")

const staff = staffCanv.getContext("2d");
const overlay = overlayCanv.getContext("2d");
staff.fillStyle = "green";

staffCanv.height = 1600
overlayCanv.height = 1600

var currentChord = NaN

window.addEventListener("resize", canvResize())

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

function drawOverlay(staff, n, pos) {
    overlay.clearRect(0, 0, overlayCanv.width, overlayCanv.height);
    overlay.strokeStyle = "rgba(0, 0, 0, 0)"
    overlay.fillStyle = "rgba(255, 255, 0, 0.4)";
    overlay.beginPath();
    overlay.fillRect(384 + (320*n), 300 + (704*staff), 96, 296)
    overlay.moveTo(432 + (320*n), 300 + (704*staff))
    overlay.arc(432 + (320*n), 300 + (704*staff), 48, 0, Math.PI, true);
    overlay.moveTo(432 + (320*n), 596 + (704*staff))
    overlay.arc(432 + (320*n), 596 + (704*staff), 48, 0, Math.PI, false);
    overlay.fill();
    overlay.stroke()

}
function canvResize() { 
    [staffCanv, overlayCanv].forEach(element => {
        element.width = (element.height/element.clientHeight)*element.clientWidth
    });
    staffDraw()
}

staffCanv.addEventListener('mousemove', function(e) {
    var rect = staffCanv.getBoundingClientRect();
    pos = {
        x: (e.clientX - rect.left) * (staffCanv.width / rect.width),
        y: (e.clientY - rect.top) * (staffCanv.width / rect.width)
    };
    margin = 100
    if(pos['y'] >= 172 && (pos['y']-172) % 724 <= 512) {
        currentLine = (Math.floor((pos['y'] - 172)/64) % 11)
        if(pos['x'] >= (432-margin) && (pos['x'] - 240) % 320 >= 0 && (pos['x'] - (432-margin)) % 320 <= margin*2) {
            currentChord = Math.floor((pos['x'] - (432-margin))/320)
            drawOverlay(Math.floor((pos['y']-172) / 724), currentChord)
        } else {
            overlay.clearRect(0, 0, overlayCanv.width, overlayCanv.height);
        } 
        console.log(currentLine)
    } else {
        overlay.clearRect(0, 0, overlayCanv.width, overlayCanv.height);
    }
})


staffDraw()
