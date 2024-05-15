export default function generatePassword(passwordLength) {

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      let choice = random(0, 3);
      if (choice === 0) {
        password += randomLower();
      } else if (choice === 1) {
        password += randomUpper();
      } else if (choice === 3) {
        password += random(0, 9);
      } else {
        i--;
      }
    }
    
    return password;
};


const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

const randomLower = () => {
    return String.fromCharCode(random(97, 122));
};

const randomUpper = () => {
    return String.fromCharCode(random(65, 90));
};