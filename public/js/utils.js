// public/js/utils.js
export const compose = (f, g) => x => f(g(x));

export const calculateNutrientTotal = (meals, nutrient) => 
    meals.reduce((acc, meal) => acc + meal[nutrient], 0);

export const updateElementText = (element, text) => {
    if (element) element.textContent = text;
    return element;
};