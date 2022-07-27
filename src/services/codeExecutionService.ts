import { AxiosResponse } from 'axios';
import { USER_TRIGGER_EXECUTE } from '../common/constants';
import httpService from '../services/httpService';

const codeExecutionService = {
  userDemandExecute: async (
    fileId: number | undefined,
    fileName: string | undefined,
    organizationId: number | undefined,
    organizationName: string | undefined
  ): Promise<AxiosResponse> => {
    const data = {
      fileId: fileId,
      fileName: fileName,
      organizationId: organizationId,
      organizationName: organizationName,
      functionRequest: []
    };
    const response = await httpService.post(
      `${process.env.REACT_APP_BASE_CODE_EXECUTION_API_URL}${USER_TRIGGER_EXECUTE}`,
      data
    );
    return response.data;
  }
};

export default codeExecutionService;
