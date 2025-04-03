import { calculateNutrientTotal, updateElementText } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const totals = {
        calories: document.getElementById('total-calories'),
        proteines: document.getElementById('total-proteines'),
        glucides: document.getElementById('total-glucides'),
        lipides: document.getElementById('total-lipides')
    };

    const updateTotals = (meals) => {
        const nutrients = ['calories', 'proteines', 'glucides', 'lipides'];
        
        nutrients.map(nutrient => {
            const element = totals[nutrient];
            const value = calculateNutrientTotal(meals, nutrient);
            const unit = nutrients.filter(n => n !== 'calories').includes(nutrient) ? 'g' : '';
            updateElementText(element, `${value}${unit}`);
        });
    };

    const loadTotals = () => {
        fetch('/meals')
            .then(response => response.json())
            .then(meals => updateTotals(meals))
            .catch(error => console.error('Erreur:', error));
    };

    loadTotals();
});