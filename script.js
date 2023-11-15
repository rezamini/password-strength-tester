const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter(); //calculate the password strength immediately based on the input current password

function updateStrengthMeter() {
    if(passwordInput.value == null) return; 
    const weaknesses = calculatePasswordStrength(passwordInput.value);
    console.log(weaknesses);

    let strength = 100;
    reasonsContainer.innerHTML = '';
    weaknesses.forEach(weakness => {
        if(weakness == null) return;

        strength -= weakness.deduction;
        const messageElementDiv = document.createElement('div');
        messageElementDiv.innerHTML = weakness.message;
        reasonsContainer.appendChild(messageElementDiv);
    })

    strengthMeter.style.setProperty('--strength', strength);
  }

function calculatePasswordStrength(password) {
  const weaknesses = [];
  return weaknesses;
}