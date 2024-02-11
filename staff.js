const staffCanv = document.getElementById("staff")
const overlayCanv = document.getElementById("overlay")

const staff = staffCanv.getContext("2d");
const overlay = overlayCanv.getContext("2d");
staff.fillStyle = "green";

staffCanv.height = 1600
overlayCanv.height = 1600

var currentChord = NaN
var overlayDrawn = false

var score = {}


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
    console.log(toNote(chord) + ", " + chord)
    ledger(chord, overlay)
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
    overlay.fillStyle = "rgba(0, 0, 0, 0.65)";
    overlay.arc(432 + (320*chord[1]), 192 + (704*chord[0]) + (32*chord[2]), 32, 0, 2* Math.PI)
    overlay.fill();
    overlay.stroke()
    overlay.closePath();


}

function ledger(chord, ctx) {
    ctx.strokeStyle = "rgb(0, 0, 0)"
    ctx.lineWidth = 8;
    ctx.beginPath();
    if(chord[2] <= 2) {
        ctx.moveTo(384 + (320*chord[1]), 192 + (704*chord[0]) + (32*2));
        ctx.lineTo(480 + (320*chord[1]), 192 + (704*chord[0]) + (32*2));
        ctx.stroke()
        if(chord[2] <= 0) {
            ctx.moveTo(384 + (320*chord[1]), 192 + (704*chord[0]) + (32*0));
            ctx.lineTo(480 + (320*chord[1]), 192 + (704*chord[0]) + (32*0));
            ctx.stroke()
        }
    }
    if(chord[2] >= 14) {
        ctx.moveTo(384 + (320*chord[1]), 192 + (704*chord[0]) + (32*14));
        ctx.lineTo(480 + (320*chord[1]), 192 + (704*chord[0]) + (32*14));
        ctx.stroke()
        if(chord[2] >= 16) {
            ctx.moveTo(384 + (320*chord[1]), 192 + (704*chord[0]) + (32*16));
            ctx.lineTo(480 + (320*chord[1]), 192 + (704*chord[0]) + (32*16));
            ctx.stroke()
        }
    }
    ctx.closePath();
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

function toNote(chord){
    if(chord[0] == 0) {
        return(String.fromCharCode(((16 - chord[2]) % 7) + 65) + Math.floor((42 - chord[2])/7))
    } else {
        return(String.fromCharCode(((18 - chord[2]) % 7) + 65) + Math.floor((30 - chord[2])/7))
    }
}

// function notePos(note) {
//     return(note[0] 
// }


staffCanv.addEventListener('mousemove', function(e) {
    var rect = staffCanv.getBoundingClientRect();
    var staffy
    //var lastChord
    pos = {
        x: (e.clientX - rect.left) * (staffCanv.width / rect.width),
        y: (e.clientY - rect.top) * (staffCanv.width / rect.width)
    };
    margin = 100
    line = Math.floor((pos['y']-16)/32)
    staffy = Math.floor((pos['y']+16)/800)
    line = (line % 25)
    if(line == 24) {
        staffy--
    }
    if(staffy==0) {
        line -= 5
        if(line>16) {
            line = 16
        } else if (line < 0) {
            line = 0
        }
        
    } else {
        line -= 2
        if(line>16) {
            line = 16
        } else if (line < 0) {
            line = 0
        }
    }

    if(pos['x'] >= (432-margin) && (pos['x'] - 240) % 320 >= 0 && (pos['x'] - (432-margin)) % 320 <= margin*2) {
        currentChord = [staffy, Math.floor((pos['x'] - (432-margin))/320), line]


        if(typeof lastChord === "undefined") {
            lastChord = ""
        }
        if(JSON.stringify(currentChord) != JSON.stringify(lastChord)) {
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
})
staffCanv.addEventListener('mouseleave', function() {
    overlay.clearRect(0, 0, overlayCanv.width, overlayCanv.height)
});
staffCanv.addEventListener('click', function(e) {
    score[currentChord]
}

)



staffDraw()
