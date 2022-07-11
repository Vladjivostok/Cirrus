import httpService from '../services/httpService';

import { OrganizationResponse } from '../common/types';
import { GET_ORGANIZATIONS_URL } from '../common/constants';

const fileManagementService = {
  getOrganizations: async (): Promise<OrganizationResponse> => {
    const response = await httpService.get(GET_ORGANIZATIONS_URL);

    return response.data;
  }
};

export default fileManagementService;
