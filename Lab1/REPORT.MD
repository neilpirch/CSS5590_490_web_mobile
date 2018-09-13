# The Super Real Store

[![Lab 1 Video](http://img.youtube.com/vi/rG_ry1hkFXg/0.jpg)](http://www.youtube.com/watch?v=rG_ry1hkFXg "Lab 1 Video")


## Introduction
The Super Real Store is an e-commerce web application, developed using a variety of elements and techniques covered in this course.
 
## Objectives

The objective of this project was to develop a multi-page web application for a fictional online store. This web application needed to include the following items:

- User Account Details
- Order Details
- Product Details
- Individual pages for sub-categories of products
- Appropriate images

#### Additional Considerations
This project also called or the use of several web technologies:

- HTML
- CSS
- Responsive Web Design

Optional technologies included:

- Javascript
- Jquery
- Ajax

## Approaches/Methods
The main page was first created using HTML. For styling, the Bootstrap library was included and a custom CSS file was added. A navigation bar was added to the header space of the page, using bootstrap container for responsiveness.


```sh
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-nav navbar-header" style="padding-top: 15px">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.html">
                Super Real Store ;)
            </a>
        </div>
        <div class="collapse navbar-collapse" style="padding-top: 15px" id="myNavbar">
            <ul class="nav navbar-nav">
                <li id="board"><a href="#">Board</a></li>
                <li id="rpg"><a href="#">RPG</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><span class="navbar-text">You are logged in as: </span></li>
                <li id="account"><a href="account_details.html" style="padding-top: 15px">Smeagol</a></li>
                <li id="account"><a href="account_details.html" style="margin-top: -15px;"><img class="img-circle" src="Images/Smeagol.jpg" height="50"></a></li>
            </ul>
        </div>
    </div>
</nav>
```
This code created buttons to navigate to product subcategory pages, as well as the account details page. While the account details page is an entirely separate html file. the product subcategory pages are dynamically created using JQuery.

This function in the included script.js file begins a dynamic refresh of the page, based on product subcategory.
```sh
$('.nav li').click(function(){
        clearItems();
        let kind = this.id;
        let games = db[kind];
        buildPage(games);
    })
```
Product images and information are drawn from a JSON database, formatted as such:
```sh
"board":[
    {
      "name": "Betrayal at House on the Hill",
      "image": "Images/betrayal.jpeg",
      "price": "$49.99",
      "flavor": "Set off with a group of friends to explore the mysterious House on the Hill. Collect interesting artifacts on your journey, but beware. Someone in your midst may not be who you thought they were..."
    },
```
The information contained in each JSON object is included in <div> elements dynamically appended to the body of the page.

```sh
function newItem(game,id){
    $('#game-' + id).append('<div class="row"><img class="center-block max-width img-responsive img" src="' + game.image +'"><p></p>')
        .append('<div class="row"><div class="gray img-rounded col-lg-10 col-lg-push-1"><p></p>')
        .append('<div class="row"><div class="col-sm-9 text-left"><h4>' + game.name + '</h4></div>' +
            '<div class="col-sm-3 text-right"><h4><strong>' + game.price + '</strong></h4>')
        .append('<div class="row aliceblue"><div class="max-width center-block like-img"><em>' + game.flavor + '</em>')
}
```
The result is a responsive product description

![Product Image and Description](Images/SSProductExample.PNG)
 
The Account Details page was created as a separate HTML page, using the same CSS styling.

A link from the Account Details page was created to take users to the Order History page. Similarly to the Product Subcategory pages, the Order history is generated dynamically using JSON database entries:

```sh
"orders":[
    {
      "order_num":314159,
      "order_date":"04 Jul 2018",
      "items":[
        {
          "id": 100,
          "price_paid": 45.99
        },
        {
          "id":103,
          "price_paid":45.99
        }
      ]
    },
 ```
    
 Additional Javascript appends responsive elements to the body of the page, and calculates order totals.
 
 ```sh
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
```

A footer was created in the base HTML, which includes social media links and a copyright notice.

```sh
<footer class="page-footer black" style="width: 100%">
    <div class="container-fluid text-center text-md-left">
        <div class="row">
            <div class="col-sm-6">
                <h2 class="text-uppercase">Super Real Store ;)</h2>
                <p><em>We're totally not stealing your info.</em></p>
            </div>
            <div class="col-sm-6">
                <ul class="list-unstyled text-left"><h4 class="text-uppercase">Connect:</h4>
                    <li>
                        <a href="#">
                            <div class="bg-icons img-circle bg-facebook"></div>
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="bg-icons img-circle bg-twitter"></div>
                            Twitter
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="bg-icons img-circle bg-snapchat"></div>
                            Instagram
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright text-center py-3">© 2018 Copyright: Neil Pirch/Dave Walsh</div>
</footer>
```

![Footer Screenshot](Images/CaptureFooter.PNG)


## Workflow
David Walsh designed the layout of the web site, and implemented the original HTML code and javascript functionality. Neil Pirch added the Account Details page and built this documentation.

## Discussion
This project created opportunities to implement a variety of web technologies in a real-world style application. The skills, tools, and coding practices used in this project are high-leverage fundamentals for professional web developers. 

## Conclusion
This project was engaging, the problem was aligned to professional demands, and the challenge to incorporate a range of technologies made the task rigorous.
