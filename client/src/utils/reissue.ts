import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from 'feature/profile/user';
import { getMe, getReissue } from './memberApis';
import { NavigateFunction } from 'react-router-dom';
export const reissue = async (
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  const { status } = await getReissue();
  if (status < 300) {
    setTimeout(() => {
      void reissue(dispatch, navigate);
    }, 950 * 60 * 30);

    const { status, data } = await getMe();
    if (status < 300) {
      dispatch(loginUser(data.data));
    }
  } else {
    dispatch(logoutUser());
    navigate('/');
  }
};
