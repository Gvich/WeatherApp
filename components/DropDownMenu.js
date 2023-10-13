import React from 'react';
import {SelectList} from "react-native-dropdown-select-list/index";
import {FontAwesome} from "@expo/vector-icons";

const DropDownMenu = ({ chooseLanguage, theme }) => {

    const data = [
        {key:'1', value:'ru'},
        {key:'2', value:'en'},
    ]

    return (
        <SelectList
            setSelected={val=> chooseLanguage(val)}
            data={data}
            save="value"
            search={false}
            placeholder={'Изменить язык'}
            maxHeight={90}
            boxStyles={{borderColor: theme === 'light' ? 'white' : 'black', borderRadius: 8}}
            inputStyles={{color: theme === 'light' ? 'white' : 'black', textTransform: 'uppercase'}}
            arrowicon={<FontAwesome name="chevron-down" size={15} color={theme === 'light' ? 'white' : 'black'} />}
            dropdownStyles={{borderColor: theme === 'light' ? 'white' : 'black'}}
            dropdownTextStyles={{color: theme === 'light' ? 'white' : 'black', textTransform: 'uppercase'}}
        />
    );
};

export default DropDownMenu;
