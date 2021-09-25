var searchRecipe = document.querySelector("#recipe-ul");
var ingredientsEl = document.querySelector("#ingredient-ul");
//var apiDekotes = "&apiKey=53b19f6822e64faa9c8f717580b163ec";
//var apiMcD = "&apiKey=e00508acdc184205a22e718465e12ad6";
//var apiClay = "&apiKey=eb1b0d3e64d1482b93094b580e6611ec";
//var apiDave = "&apiKey=ba77d9351f84470abf1737ae544fa7fa";
var currentKey = "&apiKey=eb1b0d3e64d1482b93094b580e6611ec";
function getFood() {
    var recipe = document.querySelector("#search").value;
    if (recipe != "") {
        var foodApiUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + recipe + currentKey;
        fetch(foodApiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log("Eazy Eatz Search: " + recipe);
            //var nutritionSearch = "true";
            for(var i = 0; i < data.results.length; i++) {
                console.log(data.results[i].title);
            };
            // adjust spoonId
                // if spoon recipe is selected, it retrieves it id and places it in the link
            displayRecipes(data);
            //var spoonId = data.results[0].id;
            //var infoApiUrl = "https://api.spoonacular.com/recipes/" + spoonId + "/information?includeNutrition=" + nutritionSearch + currentKey;
            //fetch(infoApiUrl)
            //.then(function(response) {
            //    return response.json();
            //}).then(function(information) {
            //    console.log(information);
            //    console.log(information.nutrition );
            //    console.log("Ingredients: ")
            //    for (var i = 0; i < information.nutrition.ingredients.length; i++) {
            //        console.log(information.nutrition.ingredients[i].name + " " + information.nutrition.ingredients[i].amount + " " + information.nutrition.ingredients[i].unit);
            //    }
            //    
            //    console.log("Use analyzed instructions: ");
            //    var stepCount = 0;
            //    if (information.analyzedInstructions[0].steps) {
            //        for (var i = 0; i < information.analyzedInstructions[0].steps.length; i++) {
            //            stepCount+= 1;
            //            console.log("Step " + stepCount + ": " + information.analyzedInstructions[0].steps[i].step);
            //        }
            //    }
                // PRICE CONVERTER
                //var price = Math.round(information.pricePerServing);
                //price/=100;
                
                //console.log("Price/Serving: $" + price + " Estimated Total Price: $" + (price*=information.servings));
                /////////////////////////////////////////////////
            //    displayIngredients(information);
            //});
        });
    }
};
var displayRecipes = function(recipeList) {

    searchRecipe.textContent = "";
    
    for(var i = 0; i < recipeList.results.length; i++) {
        
        //console.log("pizza " + recipeList.results[i].title);
        var recipeBox = document.createElement("li");
        
        //recipe.textContent = recipeList.results[i].title;
        //var recipeTitle = document.createElement("button");
        recipeBox.classList = "p-4 hover:bg-green-100 cursor-pointer recipe-id";
        
        var recipeTitle = document.createElement("a");
        recipeTitle.setAttribute("href", "./ingredient.html")
        //recipeTitle.classList = "p-4 hover:bg-green-100 cursor-pointer recipe-id";
        
        
        recipeTitle.textContent = recipeList.results[i].title;
        recipeTitle.value = recipeList.results[i].id;
        
        //console.log(recipeList.results[i].title + " " + recipeTitle.value);
        //console.log(recipeTitle.value);
        
        recipeBox.appendChild(recipeTitle);
        searchRecipe.appendChild(recipeBox);
        
        
    }


    
    /////////////Fix spoonId to equal the chosen recipe//////////////
    //var spoonId = recipeTitle.value;
    ////////////////////////////////////////////
    //var infoApiUrl = "https://api.spoonacular.com/recipes/" + spoonId + "/information?includeNutrition=true" + currentKey;
    //        fetch(infoApiUrl)
    //        .then(function(response) {
    //            return response.json();
    //        }).then(function(information) {
    //            console.log(information);
    //            console.log(information.nutrition );
    //            console.log("Ingredients: ")
    //            for (var i = 0; i < information.nutrition.ingredients.length; i++) {
    //                console.log(information.nutrition.ingredients[i].name + " " + information.nutrition.ingredients[i].amount + " " + information.nutrition.ingredients[i].unit);
    //            }
                
    //            console.log("Use analyzed instructions: ");
    //            var stepCount = 0;
    //            if (information.analyzedInstructions[0].steps) {
    //                for (var i = 0; i < information.analyzedInstructions[0].steps.length; i++) {
    //                    stepCount+= 1;
    //                    console.log("Step " + stepCount + ": " + information.analyzedInstructions[0].steps[i].step);
    //                }
    //            }
                // PRICE CONVERTER
                //var price = Math.round(information.pricePerServing);
                //price/=100;
                
                //console.log("Price/Serving: $" + price + " Estimated Total Price: $" + (price*=information.servings));
                /////////////////////////////////////////////////
    //            displayIngredients(information);
    //        });

};

var displayIngredients = function(ingr) {
    ingredientsEl.textContent = "";
    for(var i = 0; i < ingr.nutrition.ingredients.length; i++) {
        var ingrList = document.createElement("li");
        ingrList.classList = "p-4 hover:bg-green-100 cursor-pointer";
        ingrList.textContent = ingr.nutrition.ingredients[i].name;
        ingredientsEl.appendChild(ingrList);
    }
};