import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';

function SearchBar(props) {

    const { searchValue, setSearchValue, handleSearch } = props;

    return (
        <TextField
            className="SearchBar"
            id="search-events"
            label="Search for Events..."
            value={searchValue}
            onChange={handleSearch}
            InputProps={{
                endAdornment: (
                    <IconButton
                        sx={{ visibility: searchValue ? "visible" : "hidden" }}
                        onClick={() => setSearchValue("")}
                    >
                        <ClearIcon />
                    </IconButton>
                ),
            }} />
    );
}

export default SearchBar;