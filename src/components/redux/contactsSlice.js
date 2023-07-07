import { createSlice } from '@reduxjs/toolkit';
import { getContactsApi, addContactApi, deleteContactApi } from './operations';

const appState = {
  contacts: [],
  filter: '',
  isLoading: false,
  error: null,
};
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: appState,

  extraReducers: {
    //pending
    [getContactsApi.pending]: handlePending,
    [addContactApi.pending]: handlePending,
    [deleteContactApi.pending]: handlePending,
    //rejected
    [getContactsApi.rejected]: handleRejected,
    [addContactApi.rejected]: handleRejected,
    [deleteContactApi.rejected]: handleRejected,
    //fulfilled
    [getContactsApi.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
    },

    [addContactApi.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contacts.push(action.payload);
    },

    [deleteContactApi.fulfilled](state, action) {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      state.contacts.splice(index, 1);
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const contactReducer = contactsSlice.reducer;
