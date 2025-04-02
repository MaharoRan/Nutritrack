document.addEventListener('DOMContentLoaded', () => {
    const addMealBtn = document.getElementById('addMealBtn');
    const mealFormModal = document.getElementById('mealFormModal');
    const closeBtn = document.querySelector('.close');
    const mealForm = document.getElementById('mealForm');
    const mealsList = document.getElementById('mealsList');


    addMealBtn.addEventListener('click', () => {
        mealFormModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        mealFormModal.style.display = 'none';
    });

    
    window.addEventListener('click', (event) => {
        if (event.target === mealFormModal) {
            mealFormModal.style.display = 'none';
        }
    });

    
    function loadMeals() {
        fetch('/meals')
            .then(response => response.json())
            .then(meals => {
                mealsList.innerHTML = meals.map(meal => `
                    <div class="meal-item">
                        <h3>${meal.nomRepas}</h3>
                        <p>Calories: ${meal.calories}</p>
                        <p>Protéines: ${meal.proteines}g</p>
                        <p>Glucides: ${meal.glucides}g</p>
                        <p>Lipides: ${meal.lipides}g</p>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Erreur:', error));
    }

    
    mealForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = {
            nomRepas: document.getElementById('name').value,
            calories: parseInt(document.getElementById('calories').value),
            proteines: parseInt(document.getElementById('proteines').value),
            glucides: parseInt(document.getElementById('glucides').value),
            lipides: parseInt(document.getElementById('lipides').value)
        };

        fetch('/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(() => {
            mealFormModal.style.display = 'none';
            mealForm.reset();
            loadMeals();
        })
        .catch(error => console.error('Erreur:', error));
    });

    loadMeals();
});