import { User } from '../user.entity';

const validateName = ({ username }: User) => {
  return typeof username === 'string' && username.length > 0;
};

const validateAge = ({ age }: User) => {
  return typeof age === 'number' && age > 0;
};

const validateHobbies = ({ hobbies }: User) => {
  return (
    Array.isArray(hobbies) && hobbies.length && hobbies.every((hobby) => typeof hobby === 'string')
  );
};

export const validateUserData = (userData: User) => {
  return (
    validateName(userData) &&
    validateAge(userData) &&
    validateHobbies(userData) &&
    Object.keys(userData).length < 4
  );
};
