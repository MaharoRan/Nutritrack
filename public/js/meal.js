document.addEventListener('DOMContentLoaded', () => {
    const addMealBtn = document.getElementById('addMealBtn');
    const mealFormModal = document.getElementById('mealFormModal');
    const closeBtn = document.querySelector('.close');
    const mealForm = document.getElementById('mealForm');
    const mealsList = document.getElementById('mealsList');

//Apparition du formulaire pour l'ajout des repas
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
                const categorizedMeals = {
                    calories: meals.map(meal => ({
                        nom: meal.nomRepas,
                        value: meal.calories
                    })),
                    proteines: meals.map(meal => ({
                        nom: meal.nomRepas,
                        value: meal.proteines
                    })),
                    glucides: meals.map(meal => ({
                        nom: meal.nomRepas,
                        value: meal.glucides
                    })),
                    lipides: meals.map(meal => ({
                        nom: meal.nomRepas,
                        value: meal.lipides
                    }))
                };

                //Création de l'affichage des repas
                const mealsHtml = meals.map(meal => `
                    <div class="meal-item">
                        <h3>${meal.nomRepas}</h3>
                        <div class="nutrition-facts">
                            <div class="nutrition-category">
                                <span class="category-label">Calories:</span>
                                <span class="category-value">${meal.calories}</span>
                            </div>
                            <div class="nutrition-category">
                                <span class="category-label">Protéines:</span>
                                <span class="category-value">${meal.proteines}g</span>
                            </div>
                            <div class="nutrition-category">
                                <span class="category-label">Glucides:</span>
                                <span class="category-value">${meal.glucides}g</span>
                            </div>
                            <div class="nutrition-category">
                                <span class="category-label">Lipides:</span>
                                <span class="category-value">${meal.lipides}g</span>
                            </div>
                        </div>
                    </div>
                `).join('');

                mealsList.innerHTML = `
                    <div class="meals-container">
                        ${mealsHtml}
                    </div>
                `;

                const style = document.createElement('style');
                
                document.head.appendChild(style);
            })
            .catch(error => console.error('Erreur:', error));
    }

    //Formulaire pour ajouter un repas
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