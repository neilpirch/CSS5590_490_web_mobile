//Order Page functions
function loadOrderPage(orderList, products){

    let color = "lightgreen";
    let rowNum = 1;
    $.each(orderList, function(order){
        let orderItem = orderList[order];
        let orderNum = orderItem["order_num"];
        orderNumRow(rowNum, orderNum);
        let total = 0;
        let orderItemList = orderItem["items"];
        $.each(orderItemList, function(item){
            if (color === "lightgreen"){
                color = "aliceblue";
            }else{
                color = "lightgreen";
            }

            let subItem = orderItemList[item];

            let itemID = subItem.id;
            let type;
            if (itemID < 200){
                type = "board";
            }else{
                type = "rpg";
            }

            var image = "Empty";
            var name = "Empty";
            let price_paid = subItem.price_paid;

            total += price_paid;

            let productList = products[type];

            $.each(productList, function(i, product){
                if (product.id === itemID){
                    image = product.image;
                    name = product.name;
                    //return false;
                }
            });

            orderBody(rowNum, name, image, price_paid, color);
        });

        orderTotal(rowNum, total);
        rowNum++;

    })

}

function orderNumRow(rowNum, orderNum){
    $('#main-content').append('<div class="row" style="padding-top: 30px; width: 100%;">'+
        '<div class="col-md-6 col-md-push-3" id="row-' + rowNum + '"><div class="row"><div class="col-md-12 gray" style="color: aliceblue">' +
        '<strong>Order number: </strong>' + orderNum);
}

function orderBody(rowNum, name, image, price, color){
    $('#row-'+rowNum).append('<div class="row ' + color + '" id="item-' + (rowNum+1) + '"><div class="col-md-4">' +
        '<img class="center-block max-width img-responsive img" style="width: 50%; height: 150px;" src="' +
            image +'"></div><div class="col-md-4" ' +
        'style="height: 150px;"><span class="middle-left">' + name + '</span></div><div class="col-md-4" ' +
        'style="height: 150px;"><span class="middle-right">$' + price + '</span>');
}

function orderTotal(rowNum, total){
    $('#row-'+rowNum).append('<div class="row" id="total-' + (rowNum) + '" style="padding-bottom: 15px;">'+
        '<div class="col-md-12 gray" style="color: aliceblue; text-align: right"><strong>Total: $' + total +
        '</strong>')
}

//Product Page functions

//Build the product page using the items passed in via JSON
function buildPage(items){
    var row = 0;

    //Items is an array, game is the index
    $.each(items, function(game){
        //Limit the page to 3 items max wide
        if (game % 3 === 0){
            row++;
            newRow(row);
        }
        //Create a new column for the item
        newCol(game, row);
        //Enter the item information
        newItem(items[game],game);
    })
}

//Generate a new row formatted for the products page with a unique id for appending item information
function newRow(id){
    $('#main-content').append('<div class="row" id="row-' + id + '" style="padding-top: 30px; width: 100%;"></div>')
}

//Generate a new column formatted for the products page and tag it with a unique ID to add in specific item info
function newCol(id, rowNum){
    $('#row-'+rowNum).append('<div class="col-sm-4" id="game-' + id + '" style="padding-left: 30px;"></div>')
}

//Generate the item to be displayed with proper formatting
function newItem(game,id){
    $('#game-' + id).append('<div class="row"><img class="center-block max-width img-responsive img" src="' + game.image +'"><p></p>')
        .append('<div class="row"><div class="gray img-rounded col-lg-10 col-lg-push-1"><p></p>')
        .append('<div class="row"><div class="col-sm-9 text-left"><h4>' + game.name + '</h4></div>' +
            '<div class="col-sm-3 text-right"><h4><strong>' + game.price + '</strong></h4>')
        .append('<div class="row aliceblue"><div class="max-width center-block like-img"><em>' + game.flavor + '</em>')
}

//Remove everything contained in the #main-content div
function clearItems(){
    $('#main-content').empty();
}

$(document).ready(function(){

    //Read in and store the item list JSON for later use
    var db;
    $.getJSON("db.json", function(json) {
        db = json;
    });

    //Read in and store the order list JSON for later use
    var orders;
    $.getJSON("orders.json", function(json) {
        orders = json;
    });

    //If the navigated page is the Orders page

    //Logic for determining which product page to load
    $('.nav li').click(function(){
        clearItems();
        if (this.id === "orders") loadOrderPage(orders["orders"], db);

        //Get the id of the div to select the product type
        let kind = this.id;
        //Select the items in the db that are of the selected product type
        let games = db[kind];
        buildPage(games);
    })
});