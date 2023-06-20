import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const getStyles = (name, categoryName, theme) => {
    return {
        fontWeight:
            categoryName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function CategorySelector(props) {
    const { choices, setFilters, categoryName, setCategoryName, filters } = props;
    const theme = useTheme();

    const handleChange = (event) => {
        setCategoryName(event.target.value);
        setFilters({
            ...filters,
            categoryName: event.target.value,
        });
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <FormControl sx={{ m: 2, minWidth: 350, borderBottom: 'solid 3px #E2E2E2', paddingBottom: '15px', width: '360px' }} >
                    <InputLabel color='primary' id="demo-multiple-chip-label">Category</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        variant='outlined'
                        value={categoryName}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Category" />}
                        displayEmpty
                        renderValue={(selected) => (
                            <Box color='black' sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip color="chip" key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {choices.map((name) => (
                            <MenuItem key={name} value={name} style={getStyles(name, categoryName, theme)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText sx={{ marginTop: 1.5, fontSize: 12, textAlign: "center", color: '#666666' }}>To select or unselect a category, click on the choosen label.<br />
                    If nothing is selected all the categories will be displayed </FormHelperText>
                </FormControl>
            </ThemeProvider>
        </div>
    );
}