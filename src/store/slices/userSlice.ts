import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Bug 1: Incomplete type definition
interface UserState {
  data: any; // Should be properly typed
  loading: boolean;
  error: string | null;
}

// Bug 2: Initial state with potential undefined values
const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

// Bug 3: Slice name collision potential
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Bug 4: Mutation of state directly
    setUserData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    // Bug 5: No validation of payload
    updateUserPreferences: (state, action) => {
      state.data.preferences = {
        ...state.data.preferences,
        ...action.payload,
      };
    },
    // Bug 6: Inconsistent error handling
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      // Bug 7: Inconsistent state management
      state.loading = false;
      state.data = null;
    },
    // Bug 8: Redundant loading state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Bug 9: Reset without proper type checking
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Bug 10: Export actions without type safety
export const {
  setUserData,
  updateUserPreferences,
  setError,
  setLoading,
  resetState,
} = userSlice.actions;

// Bug 11: Selector with potential performance issues
export const selectUser = (state: { user: UserState }) =>
  state.user.data;

// Bug 12: Selector without memoization
export const selectUserPreferences = (state: { user: UserState }) =>
  state.user.data?.preferences;

// Bug 13: Default export without proper typing
export default userSlice.reducer;
