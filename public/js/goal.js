document.addEventListener('DOMContentLoaded', () => {
    const addGoalBtn = document.getElementById('addGoalBtn');
    const goalFormModal = document.getElementById('goalFormModal');
    const closeBtn = document.querySelector('.close');
    const goalForm = document.getElementById('goalForm');
    const goalsList = document.getElementById('goalsList');

//Apparition du formulaire pour l'ajout des objectifs
    addGoalBtn.addEventListener('click', () => {
        goalFormModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        goalFormModal.style.display = 'none';
    });

    
    window.addEventListener('click', (event) => {
        if (event.target === goalFormModal) {
            goalFormModal.style.display = 'none';
        }
    });

    
    function loadGoals() {
        fetch('/goals')
            .then(response => response.json())
            .then(goal => {
                const goalsHtml = `
                    <div class="goal-item">
                        <div class="nutrition-facts">
                            <div class="nutrition-category">
                                <span class="category-label">Calories:</span>
                                <span class="category-value">${goal.calories}</span>
                            </div>
                            <div class="nutrition-category">
                                <span class="category-label">Protéines:</span>
                                <span class="category-value">${goal.proteines}</span>
                            </div>
                            <div class="nutrition-category">
                                <span class="category-label">Glucides:</span>
                                <span class="category-value">${goal.glucides}</span>
                            </div>
                            <div class="nutrition-category">
                                <span class="category-label">Lipides:</span>
                                <span class="category-value">${goal.lipides}</span>
                            </div>
                        </div>
                    </div>
                `;
                goalsList.innerHTML = goalsHtml;
            })
            .catch(error => console.error('Error loading goals:', error));
    }

    //Formulaire pour ajouter un objectif
    goalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = {
            calories: parseInt(document.getElementById('calories').value),
            proteines: parseInt(document.getElementById('proteines').value),
            glucides: parseInt(document.getElementById('glucides').value),
            lipides: parseInt(document.getElementById('lipides').value)
        };

        fetch('/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(() => {
            goalFormModal.style.display = 'none';
            goalForm.reset();
            loadGoals();
        })
        .catch(error => console.error('Erreur:', error));
    });

    loadGoals();
});