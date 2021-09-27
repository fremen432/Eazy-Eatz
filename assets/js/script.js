var searchRecipe = document.querySelector("#recipe-ul");
var ingredientsEl = document.querySelector("#ingredient-ul");
var groceriesEl = document.querySelector("#prevgroc-ul");
var instructionsEl = document.querySelector("#instructions-ul");
//var apiDekotes = "&apiKey=53b19f6822e64faa9c8f717580b163ec";
//var apiMcD = "&apiKey=e00508acdc184205a22e718465e12ad6";
//var apiClay = "&apiKey=eb1b0d3e64d1482b93094b580e6611ec";
//var apiDave = "&apiKey=ba77d9351f84470abf1737ae544fa7fa";

// We used mutliple API keys because of limits of free Spoonacular account 
var currentKey = "&apiKey=eb1b0d3e64d1482b93094b580e6611ec";

// Array of li elements from "Ingredient List" section.
var ingredients = [];

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
        });
    }
};
var displayRecipes = function(recipeList) {

    searchRecipe.textContent = "";
    
    for(var i = 0; i < recipeList.results.length; i++) {
        
        var recipeTitle = document.createElement("li");
        recipeTitle.classList = "p-4 hover:bg-green-100 cursor-pointer recipe-id";
        recipeTitle.textContent = recipeList.results[i].title;
        recipeTitle.value = recipeList.results[i].id;
        recipeTitle.addEventListener("click", function(event) {
            console.log(event.target.value);
            getIngredient(event.target.value);
        })
        searchRecipe.appendChild(recipeTitle);
    }
};  
function getIngredient(spoonId) {
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
        displayIngredients(information);
        console.log("Use analyzed instructions: ");
        var stepCount = 0;
        if (information.analyzedInstructions[0].steps) {
            instructionsEl.textContent = ""
            for (var i = 0; i < information.analyzedInstructions[0].steps.length; i++) {
                
                stepCount+= 1;
                console.log("Step " + stepCount + ": " + information.analyzedInstructions[0].steps[i].step);

                console.log("Check 1")

                var instructionsLi = document.createElement("li");
                instructionsLi.classList = "p-4 hover:bg-green-100 cursor-pointer ingreds";
                instructionsLi.textContent = stepCount + ": " + information.analyzedInstructions[0].steps[i].step;
                instructionsEl.appendChild(instructionsLi);
                console.log("Check 2")

            }
        }
    });

};

var displayIngredients = function(ingr) {
    ingredientsEl.textContent = "";
    for(var i = 0; i < ingr.nutrition.ingredients.length; i++) {
        var ingrList = document.createElement("li");
        ingrList.classList = "p-4 hover:bg-green-100 cursor-pointer ingreds";
        ingrList.textContent = ingr.nutrition.ingredients[i].name;
        ingredientsEl.appendChild(ingrList);        
    }
};

function loadList() {
    ingredients = JSON.parse(localStorage.getItem("ingredients"));
    console.log(ingredients)
    
    for(var i = 0; i < ingredients.length; i++) {
        var prevGroceryLi = document.createElement("li");
        prevGroceryLi.classList = "p-4 hover:bg-green-100 cursor-pointer";
        prevGroceryLi.textContent = ingredients[i];
        console.log(prevGroceryLi);
        groceriesEl.appendChild(prevGroceryLi);
    }
}

$(".sortable-ul").sortable({
    connectWith: $(".sortable-ul"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone"
    
});
///////////////////////////////////////////////////
function secondApi() {
    fetch(
        "https://api.giphy.com/v1/gifs/search?q=masterchef-food-home-cooks-l0HlCoRBQjCfZAisw&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN"
    ).
    then(function(response) {
        return response.json();
    }).then(function(response) {
      ////////////////////////////
        var responseContainerEl = document.querySelector('#response-container');
        responseContainerEl.innerHTML = '';
        var gifImg = document.createElement('img');
        gifImg.setAttribute('src', response.data[39].images.fixed_height.url);
        responseContainerEl.appendChild(gifImg);
    });
};

///////////////////////MODAL//////////////////////////////////
var openmodal = document.querySelectorAll('.modal-open')
for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function(event){
        event.preventDefault()
        toggleModal()
    })
}

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

function toggleModal () {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
}
//////////////////////////////////////////////////////////////

function saveGrocery() {
    ingredients = [];
    groceryIngreds();
}

var grocUl = document.querySelector("#groc-ul");
var listItems = grocUl.getElementsByTagName("li");

var groceryIngreds = function(){
        for (let i = 0; i < listItems.length; i++) {
            
            var items = listItems[i].innerText;
            console.log(items);
        
            ingredients.push(items);
            localStorage.setItem("ingredients", JSON.stringify(ingredients));

            console.log(ingredients);
        };

};
