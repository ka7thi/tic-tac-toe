const curtains = document.querySelectorAll(".curtain"),
      buttons = getButtons(),
      historyPages = "";

addButtonsAction(buttons);

function getButtons() {
    const buttons = document.querySelectorAll(".menu__button");
    return buttons;
};

function getBackButton() {
    const backButton = document.querySelector(".menu__return");
    return backButton;
};

function addButtonsAction(buttons) {
    
    buttons[0].addEventListener('click', function() {
        
        curtains[0].classList.add("startStartAnimation", "holdAnimation");
        
        setTimeout(function() {
            
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                
                if(this.status === 200 && this.readyState === 4) {
                    document.querySelector(".wrapper").innerHTML = this.responseText;
                    getBackButton().addEventListener("click", returnMenu);
                    game();
                    history.pushState(historyPages, "", "/game/gra");
                };
            };
            
            xhr.onprogress = function(e) {
                
                if(e.loaded >= e.total) {
                    curtains[0].classList.remove("startStartAnimation", "holdAnimation");
                    curtains[0].classList.add("endStartAnimation");
                };
            };
        
            xhr.open("GET", "assets/start.html", true);
            xhr.send();
            
            setTimeout(function() {
                curtains[0].classList.remove("endStartAnimation");
            }, 1000);
            
        }, 1000);
            
    });
    
    buttons[1].addEventListener('click', function() {
        
        curtains[0].classList.add("startHowPlayAnimation", "holdAnimation");
        
        setTimeout(function() {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                
                if(this.status === 200 && this.readyState === 4) {
                    document.querySelector(".wrapper").innerHTML = this.responseText;
                    getBackButton().addEventListener("click", returnMenu);
                    history.pushState(historyPages, "", "/game/jak-grac");
                };
            };
        
            xhr.onprogress = function(e) {
                
                if(e.loaded >= e.total) {
                    curtains[0].classList.remove("startHowPlayAnimation", "holdAnimation");
                    curtains[0].classList.add("endHowPlayAnimation");
                };
            };
        
            xhr.open("GET", "assets/how_play.html", true);
            xhr.send();
        
            setTimeout(function() {
                curtains[0].classList.remove("endHowPlayAnimation");
            }, 1000);
            
        }, 1000);
    
    });
    
    buttons[2].addEventListener('click', function() {
        
        curtains[0].classList.add("startAboutAnimation", "holdAnimation");
    
        setTimeout(function() {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
            
                if(this.status === 200 && this.readyState === 4) {
                    document.querySelector(".wrapper").innerHTML = this.responseText;
                    getBackButton().addEventListener("click", returnMenu);
                    history.pushState(historyPages, "", "/game/o-autorze");
                };
            };
        
            xhr.onprogress = function(e) {
            
                if(e.loaded >= e.total) {
                    curtains[0].classList.remove("startAboutAnimation", "holdAnimation");
                    curtains[0].classList.add("endAboutAnimation");
                };      
            };
        
            xhr.open("GET", "assets/about.html", true);
            xhr.send();
        
            setTimeout(function() {
                curtains[0].classList.remove("endAboutAnimation");
            }, 1000);
            
        }, 1000);
    
    });
    
};

function main() {
    
    setTimeout(function() {
        
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            
            if(this.status === 200 && this.readyState === 4) {
                document.querySelector(".wrapper").innerHTML = this.responseText;
                addButtonsAction(getButtons());
            };
        };
    
        xhr.onprogress = function(e) {
                
            if(e.loaded >= e.total) {
                curtains[0].classList.remove("startReturnAnimation", "holdAnimation");
                curtains[0].classList.add("endReturnAnimation");
                history.go(-1);
            };    
        };
        
        xhr.open("GET", "assets/main.html", true);
        xhr.send();
        
        setTimeout(function() {
            curtains[0].classList.remove("endReturnAnimation");
        }, 1000);
            
    }, 1000);
    
};

function returnMenu() {
    curtains[0].classList.add("startReturnAnimation", "holdAnimation");
    main();
}

function returnMenuAfterGame() {
    
    if(document.querySelector(".win")) {
        const text = document.querySelector(".win");
        text.parentNode.removeChild(text);
    } else if (document.querySelector(".lose")) {
        const text = document.querySelector(".lose");
        text.parentNode.removeChild(text);
    } else {
        const text = document.querySelector(".draw");
        text.parentNode.removeChild(text);
    };
    
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        
        if(this.status === 200 && this.readyState === 4) {
            document.querySelector(".wrapper").innerHTML = this.responseText;
            addButtonsAction(getButtons());
        };
    };
    
    xhr.onprogress = function(e) {
                
        if(e.loaded >= e.total) {
                
            if(document.querySelector(".--winLeft")) {
                
                curtains[0].classList.remove("--winLeft", "holdAnimation");  
                curtains[0].classList.add("--winLeftReturn");
                curtains[1].classList.add("--winRightReturn"); 
                
            } else if (document.querySelector(".--loseLeft")) {
                
                curtains[0].classList.remove("--loseLeft", "holdAnimation");  
                curtains[0].classList.add("--loseLeftReturn");
                curtains[1].classList.add("--loseRightReturn");
                
            } else {
                
                curtains[0].classList.remove("--drawLeft", "holdAnimation");  
                curtains[0].classList.add("--drawLeftReturn");
                curtains[1].classList.add("--drawRightReturn");
                
            };
            
        } else {
            console.log("Wczytywanie");
        };         
    };
    history.go(-1);
        
    xhr.open("GET", "assets/main.html", true);
    xhr.send();
        
    setTimeout(function(){
        curtains[0].classList.remove("--winLeftReturn", "--loseLeftReturn", "--drawLeftReturn");
        curtains[1].classList.remove("--winRightReturn", "--loseRightReturn", "--drawRightReturn");
    }, 2000);          
};

function game() {
    
    var myTurn = function() {
        
        this.classList.add("x");
        checkSquare();
        checkDraw = checkDraw + 1;
        this.removeEventListener("click", myTurn);
        blockSquare();
        ifWin();
        ifDraw();
        setTimeout(function(){
            answer();
            unblockSquare();
            ifLose();
        }, 1000);
        
    };
    
    let gameSquare = "";
    const squareTab = new Array(9);
    
    for(i=0; i<9; i++){
        gameSquare += "<div id='square" + i + "' class='game__square'></div>";
    };
    
    document.querySelector(".game").innerHTML = gameSquare;
    
    for(i=0; i<9; i++) {
        squareTab[i] = document.querySelector("#square"+i);
        squareTab[i].addEventListener("click", myTurn, false);
    };
    
    let checkDraw = 0;
    
    function checkSquare() {
        for(i=0; i<9; i++) {
            if(squareTab[i].classList.contains("x") || squareTab[i].classList.contains("o")) {
                squareTab[i].removeEventListener("click", myTurn);
                squareTab[i].style.cursor = "auto"; 
            };
        };
    };

    function blockSquare() {
        for(i=0; i<9; i++) {
            squareTab[i].removeEventListener("click", myTurn);
        };
    };

    function unblockSquare() {
        for(i=0; i<9; i++) {
            if(squareTab[i].classList.contains("x") || squareTab[i].classList.contains("o")) {
                squareTab[i].removeEventListener("click", myTurn);
            } else {
                squareTab[i].addEventListener("click", myTurn, false);
            };
        };
    };
    
    
    
    function answer() {
        
        if(checkWin == true) {
            return;
        } else {
            
            const ans = Math.floor(Math.random()*10);
            for(i=0; i<9; i++) {
                
                if(ans == i) {
                    
                    if(squareTab[i].classList.contains("x") || squareTab[i].classList.contains("o")) {
                    answer();
                    } else {
                        squareTab[i].classList.toggle("o");
                        checkDraw = checkDraw + 1;
                    };
                };
                
                if(ans >= 9) {
                    answer();
                };
            };
        };
        
    };
    
    var checkWin = false;
    
    function ifWin() {
        
        if(squareTab[0].classList.contains("x") && squareTab[1].classList.contains("x") && squareTab[2].classList.contains("x") ||
           squareTab[3].classList.contains("x") && squareTab[4].classList.contains("x") && squareTab[5].classList.contains("x") ||
           squareTab[6].classList.contains("x") && squareTab[7].classList.contains("x") && squareTab[8].classList.contains("x") ||
           squareTab[0].classList.contains("x") && squareTab[3].classList.contains("x") && squareTab[6].classList.contains("x") ||
           squareTab[1].classList.contains("x") && squareTab[4].classList.contains("x") && squareTab[7].classList.contains("x") ||
           squareTab[2].classList.contains("x") && squareTab[5].classList.contains("x") && squareTab[8].classList.contains("x") ||
           squareTab[0].classList.contains("x") && squareTab[4].classList.contains("x") && squareTab[8].classList.contains("x") ||
           squareTab[2].classList.contains("x") && squareTab[4].classList.contains("x") && squareTab[6].classList.contains("x")) {
        
            blockSquare();
            checkWin = true;
       
            curtains[0].classList.add("--winLeft");
            curtains[1].classList.add("--winRight");
       
            setTimeout(function() {   
            
                curtains[1].classList.remove("--winRight");
                curtains[0].classList.add("holdAnimation");
            
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                
                    if(this.status === 200 && this.readyState === 4) {
                        document.querySelector(".curtain").innerHTML = this.responseText;
                        const x = document.querySelector(".--start");
                        x.parentNode.removeChild(x);
                        getBackButton().addEventListener("click", returnMenuAfterGame);
                    };
                };
        
                xhr.open("GET", "assets/win.html", true);
                xhr.send();
            
            }, 2000);
    
        };
    };
    
    function ifLose() {
        
        if(squareTab[0].classList.contains("o") && squareTab[1].classList.contains("o") && squareTab[2].classList.contains("o") ||
           squareTab[3].classList.contains("o") && squareTab[4].classList.contains("o") && squareTab[5].classList.contains("o") ||
           squareTab[6].classList.contains("o") && squareTab[7].classList.contains("o") && squareTab[8].classList.contains("o") ||
           squareTab[0].classList.contains("o") && squareTab[3].classList.contains("o") && squareTab[6].classList.contains("o") ||
           squareTab[1].classList.contains("o") && squareTab[4].classList.contains("o") && squareTab[7].classList.contains("o") ||
           squareTab[2].classList.contains("o") && squareTab[5].classList.contains("o") && squareTab[8].classList.contains("o") ||
           squareTab[0].classList.contains("o") && squareTab[4].classList.contains("o") && squareTab[8].classList.contains("o") ||
           squareTab[2].classList.contains("o") && squareTab[4].classList.contains("o") && squareTab[6].classList.contains("o")) {
            
            blockSquare();
            checkWin = true;
       
            curtains[0].classList.add("--loseLeft");
            curtains[1].classList.add("--loseRight");
            
            setTimeout(function() {   
            
                curtains[1].classList.remove("--loseRight");
                curtains[0].classList.add("holdAnimation");
            
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    
                    if(this.status === 200 && this.readyState === 4) {
                        document.querySelector(".curtain").innerHTML = this.responseText;
                        const x = document.querySelector(".--start");
                        x.parentNode.removeChild(x);
                        getBackButton().addEventListener("click", returnMenuAfterGame);
                    };
                };
        
                xhr.open("GET", "assets/lose.html", true);
                xhr.send();
            
            }, 2000);
    
        };
    };
    
    function ifDraw() {
        
        if(checkDraw == 9 && checkWin === false){
            
            curtains[0].classList.add("--drawLeft");
            curtains[1].classList.add("--drawRight");
            
            setTimeout(function(){   
            
            curtains[1].classList.remove("--drawRight");
            curtains[0].classList.add("holdAnimation");
            
            const xhr = new XMLHttpRequest();
    
            xhr.onreadystatechange = function() {
                
                if(this.status === 200 && this.readyState === 4) {
                    document.querySelector(".curtain").innerHTML = this.responseText;
                    const x = document.querySelector(".--start");
                    x.parentNode.removeChild(x);
                    getBackButton().addEventListener("click", returnMenuAfterGame);
                };
            };
        
            xhr.open("GET", "assets/draw.html", true);
            xhr.send();
            
        }, 2000);
            
        };
    };  
};


