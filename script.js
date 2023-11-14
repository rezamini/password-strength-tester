const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter(); //calculate the password strength immediately based on the input current password

function updateStrengthMeter() {
    if(passwordInput.value == null) return; 
    const weaknesses = calculatePasswordStrength(passwordInput.value);
  }

function calculatePasswordStrength(password) {
  const weaknesses = [];
  return weaknesses;
}

