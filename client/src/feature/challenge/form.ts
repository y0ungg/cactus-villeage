import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Challenge {
  challengeType: string
  targetDate: number
  targetTime: number
  isValid: boolean
}
interface ChallengeForm {
  challenge_form: Challenge
}
const initialChallenge = {
  challengeType: 'none',
  targetDate: 0,
  targetTime: 0,
  isValid: false
};

const initialState: ChallengeForm = {
  challenge_form: initialChallenge
};

export const challFormSlice = createSlice({
  name: 'challChoose',
  initialState,
  reducers: {
    setChall: (
      state,
      { payload }: PayloadAction<Pick<Challenge, 'challengeType'>>
    ) => {
      state.challenge_form = {
        ...state.challenge_form,
        challengeType: payload.challengeType
      };
    },
    setDate: (
      state,
      { payload }: PayloadAction<Pick<Challenge, 'targetDate'>>
    ) => {
      state.challenge_form = {
        ...state.challenge_form,
        targetDate: payload.targetDate
      };
    },
    setTime: (
      state,
      { payload }: PayloadAction<Pick<Challenge, 'targetTime'>>
    ) => {
      state.challenge_form = {
        ...state.challenge_form,
        targetTime: payload.targetTime
      };
    },
    setIsValid: (
      state,
      { payload }: PayloadAction<Pick<Challenge, 'isValid'>>
    ) => {
      state.challenge_form = {
        ...state.challenge_form,
        isValid: payload.isValid
      };
    },
    clearChooseForm: (state) => {
      state.challenge_form = initialChallenge;
    }
  }
});
export const { setChall, setDate, setTime, setIsValid, clearChooseForm } =
  challFormSlice.actions;
export default challFormSlice.reducer;