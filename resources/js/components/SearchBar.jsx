import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';

const SearchBar = ({ value, onChange, onClear, onFilterClick, showFilter = true }) => {
    return (
        <TextField
            placeholder="Search by product name"
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            size="small"
            sx={{
                mb: 3,
                borderRadius: 2,
                bgcolor: '#fff',
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                }
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: showFilter && (
                    <InputAdornment position="end" sx={{
                        display: { xs: 'block', md: 'none' },
                    }}>
                        {value && (
                            <IconButton
                                size="small"
                                onClick={onClear}
                                sx={{ mr: 0.5 }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                        <IconButton
                            onClick={onFilterClick}
                            sx={{
                                border: '1px solid transparent',
                                borderRadius: 10,
                                p: 0.5,
                                backgroundColor: '#F0F0F0',
                                width: '31.33px',
                            }}
                        >
                            <img src="/images/icons/filter.svg" alt="Filter" />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchBar;
