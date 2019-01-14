import { AbstractControl } from '@angular/forms';

export const passwordValidator = (control: AbstractControl) => {
  const validObj = validate(control.value);
  const errorEntry = Object.entries(validObj).filter(val => !val[1])[0];

  return errorEntry ? { [errorEntry[0]]: true }  : null;
};

const validate = password => {
  const hasMatchedUpperCaseLetters = [].filter.call(
    password,
    letter => letter == letter.toUpperCase() && letter.toLowerCase() != letter.toUpperCase(),
  ).length > 0;

  const hasMatchedLowerCaseLetters = [].filter.call(
    password,
    letter => letter == letter.toLowerCase() && letter.toLowerCase() != letter.toUpperCase(),
  ).length > 2;

  const hasMatchedNumericLetters = [].filter.call(
    password,
    letter => Boolean(Number(letter)),
  ).length > 0;

  const specialCharacters = ['#', '*', '.', '!', '?', '$'];

  const hasMatchedSpecialLetters = [].filter.call(
    password,
    letter => Boolean(specialCharacters.find(char => char === letter)),
  ).length > 0;

  const hasFirstLetterChar = password[0] && (password[0].toLowerCase() != password[0].toUpperCase());

  const noTwoSameAdjacentLetters = password => {
    const password1 = password + " ";
    const password2 = " " + password;

    return [].filter.call(
      password1,
      (letter, index) => letter === password2[index],
    ).length == 0;
  }

  const hasNoTwoSameAdjacentLetters = noTwoSameAdjacentLetters(password);

  return {
    hasMatchedLowerCaseLetters,
    hasMatchedUpperCaseLetters,
    hasMatchedNumericLetters,
    hasMatchedSpecialLetters,
    hasFirstLetterChar,
    hasNoTwoSameAdjacentLetters,
  };
};

export const matchPasswordValidator = (control: AbstractControl) => {
  let password = control.get('password').value;

  let confirmPassword = control.get('confirmPassword').value;

   if (password != confirmPassword) {
       control.get('confirmPassword').setErrors({ matchPassword: true });
   } else {
       return null;
   }
}