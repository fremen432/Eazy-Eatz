

var getFood = function() {
    var type = window.prompt("'cuisine(Italian)', 'excludeCuisine(Greek)', 'diet(vegetarian)'")
    var search = window.prompt("italian");
    var foodApiUrl = "https://api.spoonacular.com/recipes/complexSearch?" + type + "=" + search + "&apiKey=e00508acdc184205a22e718465e12ad6";
    fetch(foodApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
    });
};

getFood();
