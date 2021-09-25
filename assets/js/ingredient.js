
var getIngredient = function(spoonId) {
    var infoApiUrl = "https://api.spoonacular.com/recipes/" + spoonId + "/information?includeNutrition=true" + currentKey;
    fetch(infoApiUrl)
    .then(function(response) {
        return response.json();
    }).then(function(information) {
        console.log(information);
        console.log(information.nutrition );
        console.log("Ingredients: ")
        for (var i = 0; i < information.nutrition.ingredients.length; i++) {
            console.log(information.nutrition.ingredients[i].name + " " + information.nutrition.ingredients[i].amount + " " + information.nutrition.ingredients[i].unit);
        }
                
        console.log("Use analyzed instructions: ");
        var stepCount = 0;
        if (information.analyzedInstructions[0].steps) {
            for (var i = 0; i < information.analyzedInstructions[0].steps.length; i++) {
                        stepCount+= 1;
                        console.log("Step " + stepCount + ": " + information.analyzedInstructions[0].steps[i].step);
            }
        }
                // PRICE CONVERTER
                //var price = Math.round(information.pricePerServing);
                //price/=100;
                
                //console.log("Price/Serving: $" + price + " Estimated Total Price: $" + (price*=information.servings));
                /////////////////////////////////////////////////
                displayIngredients(information);
    });
}
var displayIngredients = function(ingr) {
    ingredientsEl.textContent = "";
    for(var i = 0; i < ingr.nutrition.ingredients.length; i++) {
        var ingrList = document.createElement("li");
        ingrList.classList = "p-4 hover:bg-green-100 cursor-pointer";
        ingrList.textContent = ingr.nutrition.ingredients[i].name;
        ingredientsEl.appendChild(ingrList);
    }
};






var getRecipeId = function() {
    var recipeId = document.location.search;
    if (recipeId) {
        getIngredient(recipeId);
    }
    else {
        document.location.replace("./index.html");
    }
}

getIngredient();