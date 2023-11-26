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
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowercaseWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  weaknesses.push(repeatCharactersWeakness(password));

  return weaknesses;
}

function lengthWeakness(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "Your password is too short",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 15,
    };
  }
}

function lowercaseWeakness(password){
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters');

}

function uppercaseWeakness(password){
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters');
}

function numberWeakness(password){
    return characterTypeWeakness(password, /[0-9]/g, 'numbers');
}

function specialCharactersWeakness(password){
    // ^ not symbol followed by the conditions
    // \s white space
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters');
}


function characterTypeWeakness(password, regex, type){
    const matches = password.match(regex);
    if(matches == null || matches.length === 0){
        return {
            message: `Your password has no ${type}`,
            deduction: 20
        }
    }

    if(matches.length <= 2){
        return {
            message: `Your password could use more ${type}`,
            deduction: 5
        }
    }
}

function repeatCharactersWeakness(password){
    // (.) means anything followed by the same thing \1 . so we have two characters in a row like aa or 11 or more.
    // e.g, The length would be 1 for 'aa' and 2 for 'aaaa'. every two set is increased by 1 length
    // to have it match for atleast three character set the format is /(.)\1\1/g)
    const matches = password.match(/(.)\1\1/g);
    if(matches == null) return;
    
    if(matches.length > 0){
        return {
            message: 'Your password has repeat characters',
            deduction: matches.length * 10,
        }
    }
}
