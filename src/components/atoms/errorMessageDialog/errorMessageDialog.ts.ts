import { ResponseErrorCode } from '../../../common/types';
import { maxUploadSize } from '../../../common/fileUtils';
import { convertSizeToMB } from '../../../common/utility';

export const errorMessageDialog = (message: ResponseErrorCode): string | undefined => {
  let errorMessage;
  if (message === 'err001' || message === 'err007' || message === 'err017') {
    errorMessage = 'Invalid credentials';
  }

  if (message === 'err006' || message === 'err003') {
    errorMessage = 'User does not exist';
  }

  if (message === 'err005') {
    errorMessage = 'Invite has already been sent to that email';
  }

  if (message === 'err008') {
    errorMessage = 'User already activated';
  }

  if (message === 'err010') {
    errorMessage = 'Folder with that name already exists';
  }

  if (
    message === 'err004' ||
    message === 'err009' ||
    message === 'err015' ||
    message === 'err014'
  ) {
    errorMessage = 'Access denied, you are not authorized!';
  }

  if (message === 'err021') {
    errorMessage = 'Username cannot be longer then 50 characters';
  }

  if (
    message === 'err016' ||
    message === 'err101' ||
    message === 'err102' ||
    message === 'err104' ||
    message === 'err105' ||
    message === 'err108' ||
    message === 'err201' ||
    message === 'err202' ||
    message === 'err203' ||
    message === 'err204' ||
    message === 'err205' ||
    message === 'err206'
  ) {
    errorMessage = 'Oops, something went wrong';
  }

  if (message === 'err018') {
    errorMessage = 'Role not found';
  }

  if (message === 'err019') {
    errorMessage = 'Username already taken';
  }

  if (message === 'err100') {
    errorMessage = 'File not found';
  }

  if (message === 'err103') {
    errorMessage = 'The type of file isnt supported';
  }

  if (message === 'err106') {
    errorMessage = 'File with this name already exist, rename the file and try again';
  }

  if (message === 'err107') {
    errorMessage = `File too large to upload, maximum upload size is ${convertSizeToMB(
      maxUploadSize
    )}`;
  }

  if (message === 'err110') {
    errorMessage = 'File does not exist';
  }

  if (message === 'err207') {
    errorMessage = 'Function execution failed';
  }

  if (message == undefined || message == '' || message == null) {
    errorMessage = 'Oops, something went wrong, try again later';
  }
  return errorMessage;
};

export default errorMessageDialog;
