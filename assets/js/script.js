
var searchRecipe = document.querySelector("#recipe-ul");
var apiDekotes = "&apiKey=53b19f6822e64faa9c8f717580b163ec";
var apiMcD = "&apiKey=e00508acdc184205a22e718465e12ad6";
var apiClay = "&apiKey=eb1b0d3e64d1482b93094b580e6611ec";
var apiDave = "&apiKey=ba77d9351f84470abf1737ae544fa7fa";

function getFood() {
    //var type = window.prompt("'cuisine', 'excludeCuisine', 'diet'")
    //var search = window.prompt("italianI");
    // var recipe = window.prompt("RECIPE");
    var recipe = document.querySelector("#search").value;
    var foodApiUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + recipe + apiClay;
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
        // recipe.value = "";
        // adjust spoonId
            // if spoon recipe is selected, it retrieves it id and places it in the link
        // Call function to display elements
        displayRecipes(data);
        var spoonId = data.results[0].id;
        var infoApiUrl = "https://api.spoonacular.com/recipes/" + spoonId + "/information?includeNutrition=" + nutritionSearch + apiClay;
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



// Create and display elements on the page
var displayRecipes = function(recipeList) {

    var recipeTitle = document.createElement("li");

    if (recipeList.results.title) {
        recipeTitle.textContent = "";
    
    } else {
        for(var i = 0; i < recipeList.results.length; i++) {
            // console.log("pizza " + recipeList.results[i].title);
            recipeTitle.textContent = recipeList.results[i].title;
            searchRecipe.append(recipeTitle);
        }
    }

   
    
    

};


// Onclick functions that starts the search for recipes
$("#search").click(getFood());