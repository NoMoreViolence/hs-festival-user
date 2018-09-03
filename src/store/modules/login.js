import { createAction } from 'redux-actions';
import { produce } from 'immer';

const CHANGE_GRADE = 'login/CHANGE_GRADE';
const CHANGE_MAJOR = 'login/CHANGE_MAJOR';
const CHANGE_CLASS = 'login/CHANGE_CLASS';
const CHANGE_NUMBER = 'login/CHANGE_NUMBER';
const CHANGE_NAME = 'login/CHANGE_NAME';

// export const changeGrade = value => ({ type: CHANGE_GRADE, grade: value });
export const changeGrade = createAction(CHANGE_GRADE, value => value);
// export const changeMajor = value => ({ type: CHANGE_MAJOR, major: value });
export const changeMajor = createAction(CHANGE_MAJOR, value => value);
// export const changeClass = value => ({ type: CHANGE_CLASS, class: value });
export const changeClass = createAction(CHANGE_CLASS, value => value);
// export const changeNumber = value => ({ type: CHANGE_NUMBER, number: value });
export const changeNumber = createAction(CHANGE_NUMBER, value => value);
// export const changeName = value => ({ type: CHANGE_NAME, name: value })
export const changeName = createAction(CHANGE_NAME, value => value);

const initialState = {
  gradeRange: [1, 2, 3],
  majorRange: ['HACK', 'USN', 'GAME'],
  classRange: [1, 2],
  numberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
  currentGrade: 1,
  currentMajor: 'HACK',
  currentClass: 1,
  currentNumber: 1
};

const loglog = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_GRADE:
      console.log('hello');
      break;
    default:
      break;
  }
});

// export default function counter(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_GRADE:
//       return { number: state.number + 1 };
//     case DECREASE:
//       return { number: state.number - 1 };
//     default:
//       return state;
//   }
// }
