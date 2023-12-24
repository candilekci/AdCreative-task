import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterModal } from '../../components/Types';

export  interface CharacterListModel {
    CharacterList: CharacterModal[];
    search: string;
}
const initialState :  CharacterListModel =
    {
        CharacterList: [],
        search: '',
    };

const AddSearch = createSlice({
    name: 'CharacterList',
    initialState,
    reducers: {
        AddCharacter: (state, action: PayloadAction<CharacterModal>) => {
            state.CharacterList.push(action.payload);
        },
        RemoveCharacter: (state, action: PayloadAction<number>) => {
            state.CharacterList = state.CharacterList.filter((item) => item.id !== action.payload);
        },
        SetSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
          },

    },
});
export const {
    AddCharacter, RemoveCharacter, SetSearch
  } = AddSearch.actions;
export default AddSearch.reducer;