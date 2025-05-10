import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Slider,
    Divider,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button
} from '@mui/material';
import { Close as CloseIcon, ExpandLess } from '@mui/icons-material';

const FilterDrawer = ({
    priceRange,
    categoryFilter,
    categories,
    onPriceRangeChange,
    onCategoryChange,
    onApplyFilters,
    onResetFilters,
    onClose
}) => {
    return (
        <Box sx={{width: 300, height: '100%', display: 'flex', flexDirection: 'column'}} role="presentation">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                }}
            >
                <Typography variant="h5" fontWeight={600}>Filters</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </Box>

            {/* Scrollable Filter Area */}
            <Box sx={{flexGrow: 1, overflowY: 'auto', p: 3}}>
                {/* Price Section */}
                <Box sx={{mb: 3}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                        <Typography id="price-range-slider" gutterBottom fontWeight={600} variant="body1">
                            Price
                        </Typography>
                        <ExpandLess/>
                    </Box>
                    <Slider
                        value={priceRange}
                        onChange={onPriceRangeChange}
                        valueLabelFormat={(value) => `$${value}`}
                        valueLabelDisplay="auto"
                        min={0}
                        max={300}
                        aria-labelledby="price-range-slider"
                        sx={{
                            color: 'black',
                            mt: 2,
                            '& .MuiSlider-valueLabel': {bgcolor: 'black'},
                            '& .MuiSlider-thumb': {bgcolor: 'black'}
                        }}
                    />
                    <Box sx={{display: 'flex', justifyContent: 'space-between', px: 1}}>
                        <Typography variant="caption">${priceRange[0]}</Typography>
                        <Typography variant="caption">${priceRange[1]}</Typography>
                    </Box>
                </Box>
                <Divider sx={{my: 3}}/>

                {/* Category Section */}
                <Box sx={{mb: 3}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                        <Typography gutterBottom fontWeight={600} variant="body1">
                            Category
                        </Typography>
                        <ExpandLess/>
                    </Box>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={categoryFilter === ''}
                                    onChange={onCategoryChange}
                                    value="all"
                                    sx={{'&.Mui-checked': {color: '#2563EB'}}}
                                />}
                                label="All"
                            />
                            {categories.map(category => (
                                <FormControlLabel
                                    key={category.id}
                                    control={<Checkbox
                                        checked={categoryFilter === category.id}
                                        onChange={onCategoryChange}
                                        value={category.id.toString()}
                                        sx={{'&.Mui-checked': {color: '#2563EB'}}}
                                    />}
                                    label={category.name}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </Box>
            </Box>

            {/* Drawer Footer */}
            <Box sx={{p: 3, borderTop: '1px solid #eee'}}>
                <Button
                    variant="contained"
                    onClick={onApplyFilters}
                    fullWidth
                    sx={{
                        bgcolor: 'black',
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: 600,
                        py: 1.5,
                        fontSize: 16,
                        boxShadow: 'none',
                        '&:hover': {bgcolor: '#222'}
                    }}
                >
                    Apply Filter
                </Button>
                <Button
                    variant="text"
                    onClick={onResetFilters}
                    fullWidth
                    sx={{
                        mt: 1.5,
                        color: 'text.secondary',
                        fontWeight: 500,
                        textTransform: 'none'
                    }}
                >
                    Clear all filters
                </Button>
            </Box>
        </Box>
    );
};

export default FilterDrawer;
