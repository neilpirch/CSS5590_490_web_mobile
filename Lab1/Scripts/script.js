function buildPage(items){
    var row = 0;

    $.each(items, function(game){
        //alert(items[game].name);
        if (game % 3 == 0){
            row++;
            newRow(row);
        }
        newCol(game, row);
        newItem(items[game],game);
    })
}

function newRow(id){
    $('#main-content').append('<div class="row" id="row-' + id + '" style="padding-top: 30px; width: 100%;"></div>')
}

function newCol(id, rowNum){
    $('#row-'+rowNum).append('<div class="col-sm-4" id="game-' + id + '" style="padding-left: 30px;"></div>')
}

function newItem(game,id){
    $('#game-' + id).append('<div class="row"><img class="center-block max-width img-responsive img" src="' + game.image +'"><p></p>')
        .append('<div class="row"><div class="gray img-rounded col-lg-10 col-lg-push-1"><p></p>')
        .append('<div class="row"><div class="col-sm-9 text-left"><h4>' + game.name + '</h4></div>' +
            '<div class="col-sm-3 text-right"><h4><strong>' + game.price + '</strong></h4>')
        .append('<div class="row aliceblue"><div class="max-width center-block like-img"><em>' + game.flavor + '</em>')
}

function clearItems(){
    $('#main-content').empty();
}

$(document).ready(function(){

    var db;
    $.getJSON("db.json", function(json) {
        db = json;
    });

    //let db = JSON.parse(json.type);

    $('.nav li').click(function(){
        clearItems();
        let kind = this.id;
        let games = db[kind];
        buildPage(games);
    })
});