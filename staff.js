const staffCanv = document.getElementById("staff")
const overlayCanv = document.getElementById("overlay")

const staff = staffCanv.getContext("2d");
const overlay = overlayCanv.getContext("2d");
staff.fillStyle = "green";

staffCanv.height = 1600
overlayCanv.height = 1600

var currentChord = NaN
var overlayDrawn = false


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

function drawOverlay(chord) {
    overlayDrawn=true
    overlay.strokeStyle = "rgba(0, 0, 0, 0)"
    overlay.fillStyle = "rgba(255, 255, 0, 0.4)";
    overlay.beginPath();
    overlay.fillRect(384 + (320*chord[1]), 172 + (704*chord[0]), 96, 552)
    overlay.moveTo(432 + (320*chord[1]), 172 + (704*chord[0]))
    overlay.arc(432 + (320*chord[1]), 172 + (704*chord[0]), 48, 0, Math.PI, true);
    overlay.moveTo(432 + (320*chord[1]), 724 + (704*chord[0]))
    overlay.arc(432 + (320*chord[1]), 724 + (704*chord[0]), 48, 0, Math.PI, false);
    overlay.fill();
    overlay.stroke()
    overlay.closePath();
    overlay.beginPath();
    overlay.fillStyle = "rgba(0, 0, 0, 1)";
    overlay.arc(432 + (320*chord[1]), 192 + (704*chord[0]) + (32*chord[2]), 32, 0, 2* Math.PI)
    //console.log(432 + (320*chord[1]))
    overlay.fill();
    overlay.stroke()
    overlay.closePath();
}

function removeOverlay(chord) {
    overlay.clearRect(384 + (320*chord[1]),  108 + (704*chord[0]), 96, 680);
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
    line = (Math.floor((pos['y'] - 172)/32) % 22)
    if(line < 0) {line = 0}
    //if(line > 16) {line = 16}
    console.log(line)
    if(pos['y'] >= 140 && (pos['y']-172) % 724 <= 544) {
        if(pos['x'] >= (432-margin) && (pos['x'] - 240) % 320 >= 0 && (pos['x'] - (432-margin)) % 320 <= margin*2) {
            currentChord = [Math.floor((pos['y']-172) / 724), Math.floor((pos['x'] - (432-margin))/320), line]
            if(typeof lastChord === "undefined") {
                lastChord = ""
            }
            if(JSON.stringify(currentChord) != JSON.stringify(lastChord)) {
                // console.log(currentChord + '\n' + lastChord)
                // console.log(currentChord == lastChord)
                console.log('a')
                removeOverlay(lastChord)
                overlayDrawn=false
                drawOverlay(currentChord)
                lastChord = currentChord
            }
        } else {
            if(overlayDrawn) {
                overlayDrawn=false
                removeOverlay(lastChord)
                lastChord = [-1, 0, 0]
            }
        } 

    } else {
        if(overlayDrawn) {
            //console.log('b')
            overlayDrawn=false
            removeOverlay(lastChord)
            lastChord = [-1, 0, 0]
        }
    }
})


staffDraw()
