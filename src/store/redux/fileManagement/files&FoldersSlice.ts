import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { GetFilesResponse, Organization } from '../../../common/types';
import fileManagementService from '../../../services/fileManagementService';

type SelectedFolderType = {
  organization: { id: number; name: string };
  permission: string;
};

interface FileManagementState {
  myOrganizations: Organization[] | null;
  organizationFiles: GetFilesResponse | null;
  selectedFolder: SelectedFolderType | null;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: FileManagementState = {
  selectedFolder: null,
  organizationFiles: null,
  myOrganizations: null,
  isError: false,
  isLoading: false,
  message: ''
};

export const getUserFolders = createAsyncThunk('fileManage/getFolders', async (_, thunkAPI) => {
  try {
    const response = (await fileManagementService.getOrganizations()).userOrganizations;

    return response;
  } catch (error) {
    let errCode = '';

    if (error instanceof AxiosError) {
      errCode = error.response?.data.message;
    }
    return thunkAPI.rejectWithValue(errCode);
  }
});

export const getOrganizationFiles = createAsyncThunk(
  'fileManage/getFiles',
  async (organizationId: number | undefined, thunkAPI) => {
    try {
      const response = await fileManagementService.getFiles(organizationId);
      return response;
    } catch (error) {
      let errCode = '';
      if (error instanceof AxiosError) {
        errCode = error.response?.data.message;
      }
      return thunkAPI.rejectWithValue(errCode);
    }
  }
);

export const fileManagementSlice = createSlice({
  name: 'fileManagement',
  initialState,
  reducers: {
    setCurrentFolder: (state, action) => {
      state.selectedFolder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.myOrganizations = action.payload;
      })
      .addCase(getOrganizationFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.organizationFiles = action.payload;
      });
  }
});

export const { setCurrentFolder } = fileManagementSlice.actions;

export default fileManagementSlice.reducer;
