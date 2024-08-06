document.getElementById('dietForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const mealSelect = document.getElementById('meal');
    const quantity = parseFloat(document.getElementById('quantity').value);
    const age = parseInt(document.getElementById('age').value);

    if (isNaN(quantity) || isNaN(age) || quantity <= 0 || age <= 0) {
        alert('Please enter valid numbers.');
        return;
    }

    const selectedOption = mealSelect.options[mealSelect.selectedIndex];
    const caloriesPerUnit = parseFloat(selectedOption.getAttribute('data-calories'));
    const totalMealCalories = caloriesPerUnit * quantity;

    const totalCaloriesElem = document.getElementById('totalCalories');
    let totalCalories = parseFloat(totalCaloriesElem.innerText.split(': ')[1]);
    totalCalories += totalMealCalories;
    totalCaloriesElem.innerText = `Total Calories Eaten: ${totalCalories}`;

    const remainingCaloriesElem = document.getElementById('remainingCalories');
    const dailyCalorieNeeds = calculateDailyCalorieNeeds(age);
    const remainingCalories = dailyCalorieNeeds - totalCalories;
    remainingCaloriesElem.innerText = `Remaining Calories: ${remainingCalories > 0 ? remainingCalories : 0}`;

    if (remainingCalories < 0) {
        alert('You have exceeded your daily calorie intake!');
    }
});

function calculateDailyCalorieNeeds(age) {
    if (age >= 18 && age <= 25) return 2500;
    if (age >= 26 && age <= 35) return 2400;
    if (age >= 36 && age <= 45) return 2200;
    if (age >= 46 && age <= 55) return 2000;
    if (age >= 56) return 1800;
    return 2000; // Default for under 18
}
