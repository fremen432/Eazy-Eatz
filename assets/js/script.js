
var getFood = function() {
    //var type = window.prompt("'cuisine', 'excludeCuisine', 'diet'")
    //var search = window.prompt("italianI");
    var recipe = window.prompt("RECIPE");
    var foodApiUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + recipe + "&apiKey=e00508acdc184205a22e718465e12ad6";
    fetch(foodApiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log("Eazy Eatz Search: " + recipe);
        var nutritionSearch = "true";
        for(var i = 0; i < data.results.length; i++) {
            console.log(data.results[i].title);
        };
        // adjust spoonId
            // if spoon recipe is selected, it retrieves it id and places it in the link
        var spoonId = data.results[0].id;
        var infoApiUrl = "https://api.spoonacular.com/recipes/" + spoonId + "/information?includeNutrition=" + nutritionSearch + "&apiKey=e00508acdc184205a22e718465e12ad6";
        fetch(infoApiUrl)
        .then(function(response) {
            return response.json();
        }).then(function(information) {
            console.log(information);
            console.log(information.nutrition );
            for (var i = 0; i < information.nutrition.ingredients.length; i++) {
                console.log(information.nutrition.ingredients[i].name + " " + information.nutrition.ingredients[i].amount + " " + information.nutrition.ingredients[i].unit);
            }
        });
    });
};

getFood();
