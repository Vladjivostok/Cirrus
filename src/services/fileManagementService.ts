import httpService from '../services/httpService';

import { OrganizationResponse } from '../common/types';
import { GET_ORGANIZATIONS_URL, UPLOAD_FILE_URL } from '../common/constants';
import { AxiosResponse } from 'axios';

const fileManagementService = {
  getOrganizations: async (): Promise<OrganizationResponse> => {
    const response = await httpService.get(GET_ORGANIZATIONS_URL);
    return response.data;
  },

  uploadFile: async (
    file: File[],
    userId: number | null | undefined,
    organizationId: number | undefined,
    organizationName: string | undefined
  ): Promise<AxiosResponse> => {
    const response = await httpService.post(UPLOAD_FILE_URL, file, {
      params: {
        UserId: userId,
        organizationId: organizationId,
        organizationName: organizationName
      }
    });
    return response;
  }
};

export default fileManagementService;
