function generateID() {
    var count = 0;
    return function () {
      return count++;
    };
  }
  var id = generateID();
  $("#title").css({ "background-color": "gold", "text-align": "center" });
  
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

  
  var counter = 0;
  function toggleImage() {
    counter = (counter + 1) % item1.images.length;
    console.log("index/counter== > ", counter);
    $("#image").attr("src", item1.images[counter]);
  }
  
  $("#image").on("click", function () {
    toggleImage();
  });
  
  //OR
  
  // $("#image").on("click", toggleImage);
  
  //oop
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
  
  function Makeshop(name) {
    const addSomething = function (name, price, category, images) {
      this.list.push(makeSomething(price, name, category, images));
    };
    const remove = function (id) {
      this.list = filter(this.list, function (element) {
        return element.id !== id;
      });
    };
    const update = function (id, key, val) {
      var searched = filter(this.list, function (element, i) {
        return element.id === id;
      });
      searched[0][key] = val;
      console.log(this.list);
    };
    // const displayByCat = function (category) {
    //   var filtred = filter(this.list, function (element, i) {
    //     return element.category === category;
    //   });
    //   each(filtred, function (element) {
    //     console.log(element.name + " " + element.price + " " + element.category);
    //   });
    // };
    const displayByCat = function (category) {
      return filter(this.list, function (element, i) {
        return element.category === category;
      });
    };
    const sortByPrice = function () {
      return this.list.sort(function (a, b) {
        return a.price - b.price;
      });
    };
    const sortBydate = function () {
      return this.list.sort(function (a, b) {
        return a.date - b.date;
      });
    };
  
    var obj = {};
    obj.name = name;
    obj.list = [];
    obj.addSomething = addSomething;
    obj.remove = remove;
    obj.update = update;
    obj.displayByCat = displayByCat;
    obj.sortByPrice = sortByPrice;
    obj.sortBydate = sortBydate;
    return obj;
  }
  
  var shop1 = Makeshop("shop1");
  shop1.addSomething("Pizza", 10, "peperoni", [
    "https://dxpulwm6xta2f.cloudfront.net/eyJidWNrZXQiOiJhZGMtZGV2LWltYWdlcy1yZWNpcGVzIiwia2V5IjoicGl6emFfcGVwcGVyb25pLmpwZyIsImVkaXRzIjp7ImpwZWciOnsicXVhbGl0eSI6ODB9LCJwbmciOnsicXVhbGl0eSI6ODB9LCJ3ZWJwIjp7InF1YWxpdHkiOjgwfX19",
    "https://images.ctfassets.net/j8tkpy1gjhi5/5OvVmigx6VIUsyoKz1EHUs/b8173b7dcfbd6da341ce11bcebfa86ea/Salami-pizza-hero.jpg",

  ]);
  
  $("#shop").css({'display': 'flex', "align-items": "center","margin-left": "32%",'gap': "20%",'color':'gold'});
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
  function displayAll(array) {
    each(array, function (element, i) {
      console.log(element);
      displayOne(element);
    });
  }
  displayAll(shop1.list);
  
  $("body").append("<button id='Sort' >Sort by price</button>");
  function displaySortedItems() {
    var arr = shop1.sortByPrice();
    $("#shop").empty();
    displayAll(arr);
  }
  $("#Sort").on("click", function () {
    displaySortedItems();
  });
  
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
  
  //Advanced
  $("body").append("<button id='manager' >Manager interface </button>");
  
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
  $("#manager").on("click", function () {
    $("#manager-div").toggle();
  });
  var bt = document.getElementById("sub");
  console.log(bt);
  



