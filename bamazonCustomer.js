const inquirer = require("inquirer");

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayEverything();
});



function displayEverything() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        let initialTable = []

        // for(let i = 0; i < res.length; i++) {

        // }
        // console.table(res[0]);
        firstQuestion();
    })
};



// ========================================================================================================================
// ============================================================
// ============================================================
function firstQuestion() {
    inquirer.prompt([
        {
            name: "search",
            message: "What would you like to search up?",
            type: "list",
            choices: ["Furniture", "Phones", "Cooking", "Cleaning", "Audio", "Automobile", "Computers"]
        }
    ]).then(function (answer) {
        // console.log("\n\n" + answer.search + "\n\n");
        tablePullUp(answer.search);
    })
};


function tablePullUp(answerOne) {
    const whichTable = `WHERE departmentId = "${answerOne}";`;

    connection.query("SELECT * FROM products " + whichTable, function (err, res) {
        if (err) throw err;
        let items = []

        console.log("\n*****Individual View*****\n============================================================");
        for (let i = 0; i < res.length; i++) {
            console.log(
                "ID: " + res[i].id + "\n" +
                "Item: " + res[i].type + "\n" +
                "Cost: $" + res[i].value + "\n" +
                "In Stock: " + res[i].quantity) + "\n\n";
            console.log("====================");
            // items.push(res[i].type);

            let itemsObjArray = {
                type: res[i].type,
                value: "$" + res[i].value,
                quantity: res[i].quantity
            }

            items.push(itemsObjArray);

        }
        // console.log("====================");
        console.log("\n*****Table View*****\n============================================================");
        console.table(items);
        console.log("-----------------------------------");
        // console.log(items)

        // console.log("\n\n" + items + "\n\n");
        secondQuestion(items);


    });
    // console.log("\n\n" + items + "\n\n");
    // connection.end();
};




function secondQuestion(items) {
    // console.log("\n\n" + items + "\n\n");
    inquirer.prompt([
        {
            name: "item",
            message: "What would you like to buy from this department?",
            type: "list",
            choices: [items[0].type, items[1].type, items[2].type]
        }
    ]).then(function (answer) {
        console.log("\n\nYou want the: " + answer.item);

        pricePullUp(answer.item);


        // connection.end();
    })
}




function pricePullUp(answerTwo) {
    // console.log("WHASHDSAJHDASHDJKSAHDKSAHDJSHDJSHAKDHJSKDHK***************")
    // console.log(answerTwo);
    const whichPrice = `WHERE type = "${answerTwo}";`;
    // console.log("\n\n" + whichPrice + "\n")

    connection.query("SELECT * FROM products " + whichPrice, function (err, res) {
        if (err) throw err;

        console.log("This costs: $" + res[0].value);
        console.log("In Stock: " + res[0].quantity + "\n");

        thirdQuestion(res[0].type);

    });
    // console.log("\n\n" + items + "\n\n");
    // connection.end();
};




function thirdQuestion(itemType) {
    // console.log("\n\n" + itemType + "   jidsajdiljasdlsadmkasljdlkasjdklasjdlkas\n\n");
    inquirer.prompt([
        {
            name: "howMany",
            message: "How many would you like to buy?",
        }
    ]).then(function (answer) {
        const inStock = `WHERE type = "${itemType}";`;
        // ==============================

        if (!parseInt(answer.howMany)) {
            console.log("\nYou need to specify a numerical symbol");
            thirdQuestion(itemType);
        }
        // ==============================
        else {
            connection.query("SELECT * FROM products " + inStock, function (err, res) {
                if (err) throw err;

                // console.log(itemType);

                else if (answer.howMany > res[0].quantity) {
                    console.log("We don't have that many in stock :((");
                    console.log("What we got: " + res[0].quantity);
                    console.log("How many you want: " + answer.howMany);
                    // console.log(itemType);
                    thirdQuestion(itemType);
                }

                else {
                    console.log("Great! How much money do you got?");
                    let numOfWhatTheyBought = answer.howMany;
                    let newQuantity = res[0].quantity - numOfWhatTheyBought;
                    // console.log("\n\n" + newQuantity)
                    // console.log(itemType);
                    // console.log("\n" + numOfWhatTheyBought);

                    // This is going to be used to update my table
                    updateProduct(newQuantity, itemType, numOfWhatTheyBought);
                    
                }

            });
        }

    })
}


function updateProduct(replaceQuantity, itemType, numOfWhatTheyBought) {
    console.log("Just kidding, you get a sale since you're a great customer, everything for free!");
    // console.log(numOfWhatTheyBought);
    // console.log(replaceQuantity, itemType);
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: replaceQuantity
        },
        {
          type: itemType
        }
      ],
      function(err, res) {
        if (err) throw err;
        // console.log(res.affectedRows + itemType + " updated!\n");
        // let totalCost = numOfWhatTheyBought * res[0].value
        // console.log(res);
        calculateCost(itemType, numOfWhatTheyBought);
      }
    )
};


function calculateCost(itemType, costOfWhatTheyBought) {
    // console.log(itemType);
    const whichPrice = `WHERE type = "${itemType}";`;
    connection.query("SELECT * FROM products " + whichPrice, function (err, res) {
        if (err) throw err;

        setTimeout(function() {
            console.log(`\n\nBUT your Total cost waaaaas $${res[0].value * costOfWhatTheyBought} so pay up`);
        }, 2000);

        setTimeout(function() {
            console.log("\n\n\n\n\n What can I say, I'm cheap......... just like Amazon");
        }, 4000);

        setTimeout(function() {
            buyAgain();
        }, 6000)
        // customerCost();


    });
}


function buyAgain() {
    inquirer.prompt([
        {
            name: "shopAgain",
            message: "\n\n\n\n\n Would you like to shop again? ^_^",
            type: "list",
            choices: ["YES", "no"]
        }
    ]).then(function (answer) {
        switch (answer.shopAgain) {
            case "YES": displayEverything();
            break;

            case "no": connection.end();
            break;

            default: displayEverything();
        }
    })
}
// function customerCost(itemBuyingType, howMuchTheyPay) {
//     const whichPrice = `WHERE type = "${itemBuyingType}";`;
//     connection.query("SELECT * FROM products " + whichPrice, function (err, res) {
//         if (err) throw err;

//         console.log(res[0]);

//     });
// }