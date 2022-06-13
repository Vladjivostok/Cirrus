import React from 'react';

export const useErrorMessage = (message: string) => {
  if (message === 'err001') {
    alert('User not found');
  } else if (message === 'err002') {
    alert('Not logged in');
  } else if (message === 'err003') {
    alert('User with that id does not exist!');
  } else if (message === 'err004') {
    alert('Not Authorized!');
  } else if (message === 'err005') {
    alert('Invite has already been sent to that email!');
  } else if (message === 'err006') {
    alert('Invitation token is not valid!');
  } else if (message === 'err007') {
    alert('User is not verified!');
  }
  return message;
};

export default useErrorMessage;
