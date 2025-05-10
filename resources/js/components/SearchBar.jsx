import React, { useState, useEffect, useCallback } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';

const SearchBar = ({ value, onChange, onClear, onFilterClick, showFilter = true, debounceTime = 500 }) => {
    const [inputValue, setInputValue] = useState(value);
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Update local state when prop value changes externally
    useEffect(() => {
        setInputValue(value);
        setDebouncedValue(value);
    }, [value]);

    // Handle debouncing effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, debounceTime);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, debounceTime]);

    // Send final debounced value to parent component
    useEffect(() => {
        // Only trigger onChange if value has actually changed
        if (debouncedValue !== value) {
            // Create a synthetic event object to match onChange expectation
            const event = { target: { value: debouncedValue } };
            onChange(event);
        }
    }, [debouncedValue, onChange, value]);

    // Handle immediate input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Clear input
    const handleClear = () => {
        setInputValue('');
        setDebouncedValue('');
        onClear();
    };

    return (
        <TextField
            placeholder="Search by product name"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
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
                    <InputAdornment position="end">
                        {inputValue && (
                            <IconButton
                                size="small"
                                onClick={handleClear}
                                sx={{ mr: 0.5 }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                        <IconButton
                            onClick={onFilterClick}
                            sx={{
                                display: { xs: 'block', md: 'none' },
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
