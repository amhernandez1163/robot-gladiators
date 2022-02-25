var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max  - min + 1) + min);

    return value;
};

var fightOrSkip = function () {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer. Please try again.");
        return fightOrSkip();
    }
    
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
      
        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerInfo.money for skipping  
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            //return true if player wants to leave
            return true;
        }
    }  
    return false;
};

var fight = function(enemy) {
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    // repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
        //ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
            //if true, lease fight by breaking loop
                break;
            }

            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
    
            // check enemy's health
            if (enemy.health <= 0){
                window.alert(enemy.name + " has died!");
                
                playerInfo.money = playerInfo.money + 20;

                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            
        } else {
                // remove player's health by subtracting the amount set in the enemy.attack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

                // check player's health
            if (playerInfo.health <= 0){
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        
        isPlayerTurn = !isPlayerTurn;
    }
};

var startGame = function () {
    playerInfo.reset()

    for(var i = 0; i < enemyInfo.length; i++) {
        //check player stats
        console.log(playerInfo);

        //if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));
            var pickedEnemyObj = enemyInfo [i];
            pickedEnemyObj.health = randomNumber(40, 60);
            console.log(pickedEnemyObj);
            fight(pickedEnemyObj);

            // if the player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
            // ask if the player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            //if yes, take them to the store () function
                if (storeConfirm) { 
                shop();
                }
            }
        } 
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //play again
    endGame();
};

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    //if player is still alive, player wins!
   
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    if (playerInfo.money > highScore){
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + "now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + "did not beat the high score of " + highScore + ". Maybe next time!");
    }
    
    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt(
         "Would you like to REFILL your health, UPGRADE your attack or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);
    
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
           window.alert("Leaving the store.");
           break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break; 
    }
};

var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
        
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10, 
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, 
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }  
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber (10, 14)
    }, 
    {
        name: "Amy Andriod", 
        attack: randomNumber (10, 14)
    }, 
    {
        name: "Robo Trumble",
        attack: randomNumber (10, 14)
    }
];

startGame();




 