import httpService from '../services/httpService';

import {
  DeleteFileResponse,
  GetFilesResponse,
  GetFilesResponseFromServer,
  OrganizationResponse
} from '../common/types';
import {
  GET_ORGANIZATIONS_URL,
  GET_ORGANIZATION_FILES_URL,
  UPLOAD_FILE_URL,
  DOWNLOAD_FILE_URL
} from '../common/constants';
import { AxiosResponse } from 'axios';

const convertDate = (date: number): Date => {
  return new Date(date);
};

const convertResponse = (response: GetFilesResponseFromServer): GetFilesResponse => {
  const newResponse = {
    ...response,
    content: response.content.map((element) => {
      return { ...element, createdAt: convertDate(element.createdAtMillis) };
    })
  };
  return newResponse;
};

const fileManagementService = {
  getOrganizations: async (): Promise<OrganizationResponse> => {
    const response = await httpService.get(
      `${process.env.REACT_APP_BASE_FILE_MANAGEMENT_API_URL}${GET_ORGANIZATIONS_URL}`
    );
    return response.data;
  },

  getFiles: async (
    organizationId: number | undefined,
    pageNumber?: number | undefined
  ): Promise<GetFilesResponse> => {
    const response = await httpService.get(
      `${process.env.REACT_APP_BASE_FILE_MANAGEMENT_API_URL}${GET_ORGANIZATION_FILES_URL}`,
      { params: { organizationId, pageNumber } }
    );
    return convertResponse(response.data);
  },

  uploadFile: async (
    file: File[],
    userId: number | null | undefined,
    organizationId: number | undefined,
    organizationName: string | undefined
  ): Promise<AxiosResponse> => {
    const data = new FormData();
    data.append('file', file[0]);
    data.append(
      'request',
      `{\n"appUserId": ${userId},\n"organizationId": ${organizationId},\n"organizationName": "${organizationName}"\n}`
    );
    const response = await httpService.post(
      `${process.env.REACT_APP_BASE_FILE_MANAGEMENT_API_URL}${UPLOAD_FILE_URL}`,
      data
    );
    return response;
  },

  deleteFile: async (fileInfoId: number | undefined): Promise<DeleteFileResponse> => {
    const response = await httpService.delete(
      `${process.env.REACT_APP_BASE_FILE_MANAGEMENT_API_URL}${GET_ORGANIZATION_FILES_URL}`,
      { params: { fileInfoId } }
    );
    return response.data;
  },

  downloadFile: async (fileInfoId: number | undefined): Promise<Blob> => {
    const response = await httpService.get(
      `${process.env.REACT_APP_BASE_FILE_MANAGEMENT_API_URL}${DOWNLOAD_FILE_URL}`,
      { params: { fileInfoId } }
    );
    return response.data;
  }
};

export default fileManagementService;
