/**
 * Tool Classes
 */

 /**
 * Selector API: Select an element by ID.
 * @param selector The ID of target element.
 * @return {Element}
 * @private
 */
var _sel = function (selector) {
  return document.getElementById(selector);
};

/**
 * Selector API: Select an element by CSS selector. Same as jQuery.
 * @param selector A valid CSS selector.
 * @return {NodeList}
 * @private
 */
var _selAll = function (selector) {
    return document.querySelectorAll(selector);
};


var _showAlert = function (ID) {
    function hideAlert() {
        setTimeout(function(){
            $("#" + ID).hide(1000);
        }, 3000)
    }

    $("#" + ID).show(500, hideAlert());


};



/**
 * Specialize who is on current drop.
 * @value 1: PC is on this turn.
 * @value 2: Player is on this turn.
 * @type {Number}
 */
var PC_or_Player = 1;

/**
 * Specialize which piece PC or player takes.
 * @type {{PC: string, Player: string}}
 */
var Piece = {
  PC: "X",
  Player: "O",

  setPlayer_XO: function () {
      Piece.PC = "X";
      Piece.Player = "O";
  },

  setPlayer_OX: function () {
      Piece.PC = "O";
      Piece.Player = "X";
  }
};


/**
 * DROP STEP: How PC drops a step.
 * Current strategy: drop steps randomly, as I haven't learnt AI yet.
 */
function PC_drops() {
    // STEP 1: Check if there's no empty cells.
    //alert(is_game_ends());

    if(is_game_ends()) return;

    // STEP 2: Randomly pick up an empty cell.
    let cell_id;
    do{
       cell_id = Math.floor(Math.random() * 9 + 1)
    } while(_sel("cell-" + cell_id).currentState !== "empty");

    // STEP 3: Drop.
    _sel("cell-" + cell_id).currentState = Piece.PC;
    _sel("cell-" + cell_id).innerText = Piece.PC;

}

/**
 * DROP STEP: How player drops a step.
 *
 */
function Player_drops() {

}


/**
 * The main entrance for dropping steps of Tic Tac Toe.
 * Note: if game ends, this function will also start a new game.
 */
function drop_steps() {
    let clickedCell = window.event.srcElement;          // Get the clicked cell

    //alert(clickedCell.id);

    if(clickedCell.currentState === "empty") {
        // PRE-CHECK: If game ends, then we won't allow any inputs.
        if(is_game_ends()){
            return;
        }

        // STEP1: User drop a piece.
        clickedCell.currentState = Piece.Player;
        clickedCell.innerText = Piece.Player;

        // STEP2: PC drop a piece.
        PC_drops();

        // STEP3: Check if game ends.
        // If game ends, ready to start a new game.
        if(is_game_ends()){
            end_and_restart_game();
        }
    }
}

/**
 * Check if game ends.
 * SITUATION 1 (One wins): The three same pieces connected as a solid line.
 * SITUATION 2 (No wins): No empty cells anymore, but no one wins.
 */
function is_game_ends() {
    function is_anyone_wins(){
        function allThreeCellsAreSame(cell1, cell2, cell3){
            cell1 = _sel(cell1);
            cell2 = _sel(cell2);
            cell3 = _sel(cell3);
            return((cell1.innerText === "X" && cell2.innerText === "X" && cell3.innerText === "X")
                    || (cell1.innerText === "O" && cell2.innerText === "O" && cell3.innerText === "O"));
        }

        if(    allThreeCellsAreSame("cell-1", "cell-2", "cell-3")
            || allThreeCellsAreSame("cell-4", "cell-5", "cell-6")
            || allThreeCellsAreSame("cell-7", "cell-8", "cell-9")

            || allThreeCellsAreSame("cell-1", "cell-4", "cell-7")
            || allThreeCellsAreSame("cell-2", "cell-5", "cell-8")
            || allThreeCellsAreSame("cell-3", "cell-6", "cell-9")

            || allThreeCellsAreSame("cell-1", "cell-5", "cell-9")
            || allThreeCellsAreSame("cell-3", "cell-5", "cell-7"))
        {
            return true;
        }
        else
            return false;
    }

    function is_no_one_wins(){
        let has_empty_cell = false;
        for(let i = 1; i <= 9; i++) {
            if(_sel("cell-" + i).currentState === "empty"){
                has_empty_cell = true;
                break;
            }
        }

        return !has_empty_cell;
    }

    if(is_anyone_wins())
        return [true, "anyone_wins"];

    if(is_no_one_wins())
        return [true, "no_one_wins"];

    return false;

}


/**
 * Reset game.
 */
function reset_game(give_tips) {
    // Initialize cells
    for(let i = 0; i < _selAll(".cell").length; i++){
        _selAll(".cell")[i].currentState = "empty";
        _selAll(".cell")[i].innerText = "";
    }

    // If give_tips = true, Show reset game state alert
    // give_tips is the switch for this alert. When resetting at game ends, this is unexpected.
    if(give_tips)
        _showAlert("alert-game-reset");
}

/**
 * Call when a stage ends, then it will start a new game.
 */
function end_and_restart_game(){
    _showAlert("alert-game-ends");

    setTimeout(reset_game, 2000 + 1000);
}

/**
 * Init game.
 * Run on every time the game loads.
 */
function init_game() {
    // Initialize cells
    for(let i = 0; i < _selAll(".cell").length; i++){
        // Initialize: Set cell text as empty
        _selAll(".cell")[i].currentState = "empty";

        _selAll(".cell")[i].onclick = drop_steps;
    }

    // Let user to choose piece
    $('#piece-chooser').modal('show');
}



/**
 * Initialize game.
 */
init_game();