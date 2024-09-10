function generateID() {
    var count = 0;
    return function () {
      return count++;
    };
  }
  var id = generateID();
  $("#title").css({ "background-color": "gold", "text-align": "center" });
  // to create a product we use the function under
  function makeSomething(price, name, category, images) {
    return {
      id: id(),
      price: price,
      name: name,
      category: category,
      images: images,
      date: Date(),
    };
  }

  // to keep going back and forth between the images after triggering the button we use the function under
  var counter = 0;
  function toggleImage() {
    counter = (counter + 1) % item1.images.length;
    console.log("index/counter== > ", counter);
    $("#image").attr("src", item1.images[counter]);
  }
  
  $("#image").on("click", function () {
    toggleImage();
  });
  // i wrote those high order below function to help through my methods later
  function each(array, func) {
    for (let i = 0; i < array.length; i++) {
      func(array[i], i);
    }
  }
  function map(array, func) {
    var acc = [];
    each(array, function (element, i) {
      acc.push(func(element, i));
    });
    return acc;
  }
  
  function filter(array, predicate) {
    var acc = [];
    each(array, function (element, i) {
      if (predicate(element, i)) {
        acc.push(element);
      }
    });
    return acc;
  }
// that a function to add products to our list
  function Makeshop(name) {
    const addSomething = function (name, price, category, images) {
      this.list.push(makeSomething(price, name, category, images));
    };
    // displaybycat is to loop through the list and prints out only the elment where the predicate is correct
    const displayByCat = function (category) {
      return filter(this.list, function (element, i) {
        return element.category === category;
      });
    };
    // to display the list's product from the cheapest to the most expensive
    const sortByPrice = function () {
      return this.list.sort(function (a, b) {
        return a.price - b.price;
      });
    };
    var obj = {};
    obj.name = name;
    obj.list = [];
    obj.addSomething = addSomething;
    obj.displayByCat = displayByCat;
    obj.sortByPrice = sortByPrice;
    return obj;
  }
  
  // so we created an instance called shop1
  var shop1 = Makeshop("shop1");
  shop1.addSomething("Pizza", 10, "peperoni", [
    "https://dxpulwm6xta2f.cloudfront.net/eyJidWNrZXQiOiJhZGMtZGV2LWltYWdlcy1yZWNpcGVzIiwia2V5IjoicGl6emFfcGVwcGVyb25pLmpwZyIsImVkaXRzIjp7ImpwZWciOnsicXVhbGl0eSI6ODB9LCJwbmciOnsicXVhbGl0eSI6ODB9LCJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19",
    "https://images.ctfassets.net/j8tkpy1gjhi5/5OvVmigx6VIUsyoKz1EHUs/b8173b7dcfbd6da341ce11bcebfa86ea/Salami-pizza-hero.jpg",

  ]);
  
  $("#shop").css({'display': 'flex', "align-items": "center","margin-left": "32%",'gap': "20%",'color':'gold'});
  
  // after giving this function an arguement the function will display all the info about it
  function displayOne(item) {
    console.log(item.images[0]);
  
    $("#shop").append(`<div>
      <h3>Name: ${item.name}</h3>
      <h3>Price: ${item.price}</h3>
      <h3>Category: ${item.category}</h3>
      <img id="image-${item.id}" src="${item.images[0]}"/>
      </div>`);
    $(`#image-${item.id}`).on("click", function () {
      toggleImage(item);
    });
    $(`#image-${item.id}`).css({ width: "200px", heigth: "200px" });
  }
  // displayOne(item1)
  var counter = 0;
  
  function toggleImage(item) {
    console.log(item);
  
    counter = (counter + 1) % item.images.length;
    console.log("index/counter== > ", counter);
    $(`#image-${item.id}`).attr("src", item.images[counter]);
  }
  // we used each in this function sort of loop to iterate throught the list so it displays each item on the list
  function displayAll(array) {
    each(array, function (element, i) {
      console.log(element);
      displayOne(element);
    });
  }
  displayAll(shop1.list);
  
  // this function is to display the list after sorting the items depending on the price
  $("body").append("<button id='Sort' >Sort by price</button>");
  function displaySortedItems() {
    var arr = shop1.sortByPrice();
    $("#shop").empty();
    displayAll(arr);
  }
  $("#Sort").on("click", function () {
    displaySortedItems();
  });
  
  // basically it will display each element having the category
  $("body").append("<input id='input' placeholder='insert category'>");
  $("body").append("<button id='search' >search</button>");
  function search() {
    var cat = $("#input").val();
    $("#shop").empty();
    displayAll(shop1.displayByCat(cat));
  }
  $("#search").on("click", function () {
    search();
  });
  
  
  // $("body").append("<button id='manager' >Manager interface </button>");
  
  $("body").append(`<div id='manager-div'>
  <input id='name' placeholder='name'>
  <input id='price' placeholder='price'>
  <input id='category' placeholder='category'>
  <input id='images' placeholder='images'>
  <input id='images2' placeholder='images'>

  <button id='add' >Add item </button>
    </div>`);

 
  $("#add").on("click", function () {

    var x =  $("#images").val()
    console.log('x',typeof(x));
    
    shop1.addSomething(
      $("#name").val(),
      $("#price").val(),
      $("#category").val(),
     [ $("#images").val(),$("#images2").val()]
    );
console.log(shop1.list);

    $("#shop").empty();
    displayAll(shop1.list);
    });
  

  



