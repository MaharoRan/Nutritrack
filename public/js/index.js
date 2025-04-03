import { calculateNutrientTotal, updateElementText } from './utils.js';

const progressBarElements = {
    calories: {
        bar: document.getElementById('progress-calories'),
        label: document.getElementById('progress-calories-label')
    },
    proteines: {
        bar: document.getElementById('progress-proteines'),
        label: document.getElementById('progress-proteines-label')
    },
    glucides: {
        bar: document.getElementById('progress-glucides'),
        label: document.getElementById('progress-glucides-label')
    },
    lipides: {
        bar: document.getElementById('progress-lipides'),
        label: document.getElementById('progress-lipides-label')
    }
};

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

    const updateProgressBars = (meals, goals) => {
        const nutrients = ['calories', 'proteines', 'glucides', 'lipides'];
        
        nutrients.forEach(nutrient => {
            const value = calculateNutrientTotal(meals, nutrient);
            const goal = goals[nutrient] || 100; 
            const percentage = (value / goal) * 100;
            
            progressBarElements[nutrient].bar.style.width = `${percentage}%`;
            
            const label = `${Math.round(percentage)}% (${value}/${goal}${nutrient === 'calories' ? '' : 'g'})`;
            progressBarElements[nutrient].label.textContent = label;
    
            //Affichage de la barre de progression
            if (percentage >= 100) {
                progressBarElements[nutrient].bar.style.backgroundColor = 'green';
            } else {
                progressBarElements[nutrient].bar.style.backgroundColor = 'red';
            }
        });
    };

    const loadTotals = () => {
        Promise.all([
            fetch('/meals'),
            fetch('/goals')
        ])
        .then(([mealsResponse, goalsResponse]) => 
            Promise.all([mealsResponse.json(), goalsResponse.json()])
        )
        .then(([meals, goals]) => {
            updateTotals(meals);
            updateProgressBars(meals, goals);
        })
        .catch(error => console.error('Erreur:', error));
    };

    loadTotals();
});