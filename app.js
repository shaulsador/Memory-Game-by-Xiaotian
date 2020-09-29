const board = document.querySelector(".board");
const score = document.querySelector("#score")

board.addEventListener('click', flipcard);

whiteDiv = [];
function whiteboard() {
    for (let i = 0; i < 12; i++) {
        whiteDiv[i] = document.createElement('div');
        whiteDiv[i].classList.add('card-down');
        whiteDiv[i].innerHTML = '<img src="images/white.png">';
        board.appendChild(whiteDiv[i]);
    }
}
whiteboard();

var imgDiv = [];
function create(){
    for(let i=0; i<6; i++){
        imgDiv[i] = document.createElement('div');
        imgDiv[i].classList.add('card-up');
        imgDiv[i].innerHTML = `<img src="images/${i+1}.png">`;
        // board.appendChild(imgDiv[i]);
    }
    for(let i=6; i<12; i++){
        imgDiv[i] = document.createElement('div');
        imgDiv[i].classList.add('card-up');
        imgDiv[i].innerHTML = `<img src="images/${i-5}.png">`
        // board.appendChild(imgDiv[i]);
    }
}
create();
imgDiv.sort(() => 0.5 - Math.random());


let numberOfClicks = 0;
let index = [];
function flipcard(e) {
    let choice = e.target;
    if(choice.classList.contains('card-down') && numberOfClicks < 2) {
        // console.log(whiteDiv.indexOf(choice));
        index[numberOfClicks] = whiteDiv.indexOf(choice);
        choice.parentNode.replaceChild(imgDiv[index[numberOfClicks]], choice);
        // console.log(choice.innerHTML);
        numberOfClicks++;
        if(numberOfClicks == 2) {
            checkMatch(index[0], index[1]);
            // numberOfClicks = 0;
        }
        // choice
    }
}

let gain = 0
function checkMatch(a, b) {
    if (imgDiv[a].innerHTML === imgDiv[b].innerHTML) {
        window.setTimeout(function() {         
            imgDiv[a].classList.toggle('removed');
            imgDiv[b].classList.toggle('removed');
            imgDiv[a].addEventListener('transitionend', function(){
                imgDiv[a].innerHTML = '';
            });
            imgDiv[b].addEventListener('transitionend', function(){
                imgDiv[b].innerHTML = '';
            });
            ++gain;
            score.innerHTML = `${gain*100}`;
        }, 300);
        if(gain == 5) {
            alert('Congrats!');
        }
    } else {
        window.setTimeout(function() {
            imgDiv[a].parentNode.replaceChild(whiteDiv[a],imgDiv[a]);
            imgDiv[b].parentNode.replaceChild(whiteDiv[b],imgDiv[b]);
        }, 500);
    }
    numberOfClicks = 0;
}


