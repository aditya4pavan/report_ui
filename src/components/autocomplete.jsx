/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ options = [], title = 'NA', onChange, value = [], multiple = true }) {
    console.log(value)
    return (
        <Autocomplete
            multiple={multiple}
            options={options}
            onChange={onChange}
            getOptionSelected={(opt, val) => {
                return opt.title === val.title
            }}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                </React.Fragment>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label={title} />
            )}
            value={value}
        />
    );
}
