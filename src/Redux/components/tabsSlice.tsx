import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface TabsState {
    activeTab: number;
}

const initialState: TabsState = {
    activeTab: 0
};

const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        setActiveTab(state, action: PayloadAction<number>) {
            state.activeTab = action.payload;
        }
    }
});

export const { setActiveTab } = tabsSlice.actions;
export default tabsSlice.reducer;
