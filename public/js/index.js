import { calculateNutrientTotal, updateElementText } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const totals = {
        calories: document.getElementById('total-calories'),
        proteines: document.getElementById('total-proteines'),
        glucides: document.getElementById('total-glucides'),
        lipides: document.getElementById('total-lipides')
    };

    const updateTotals = (meals) => {
        const updateTotal = (elementId, nutrient) => 
            updateElementText(totals[elementId], `${calculateNutrientTotal(meals, nutrient)}${nutrient !== 'calories' ? 'g' : ''}`);

        updateTotal('calories', 'calories');
        updateTotal('proteines', 'proteines');
        updateTotal('glucides', 'glucides');
        updateTotal('lipides', 'lipides');
    };

    const loadTotals = () => {
        fetch('/meals')
            .then(response => response.json())
            .then(meals => updateTotals(meals))
            .catch(error => console.error('Erreur:', error));
    };

    loadTotals();
});