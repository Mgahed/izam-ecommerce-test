import React, {useState, useEffect} from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    TextField,
    Slider,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Paper,
    Divider,
    Button,
    CircularProgress,
    Breadcrumbs,
    Link,
    IconButton,
    Drawer,
    InputAdornment,
} from '@mui/material';
import {
    Home as HomeIcon,
    Search as SearchIcon,
    Add,
    Remove,
    Close as CloseIcon,
    ExpandLess,
} from '@mui/icons-material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../components/ProductCard';
import ProductService from '../services/product';
import {updateCartQuantity, removeFromCart} from '../redux/actions/cartActions';
import ProductDetailsDrawer from '../components/ProductDetailsDrawer';
import OrderSummaryPreview from '../components/OrderSummaryPreview';
import BreadcrumbNav from '../components/BreadcrumbNav';
import SearchBar from '../components/SearchBar';
import FilterDrawer from '../components/FilterDrawer';
import ProductList from '../components/ProductList';
import CategoryService from '../services/category';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters state - applied filters
    const [nameFilter, setNameFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 300]);
    const [categoryFilter, setCategoryFilter] = useState('');

    // Pending filter state - for changes before applying
    const [pendingNameFilter, setPendingNameFilter] = useState('');
    const [pendingPriceRange, setPendingPriceRange] = useState([0, 300]);
    const [pendingCategoryFilter, setPendingCategoryFilter] = useState('');

    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState([]);

    // Drawer states
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Added
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [productsCount, setProductsCount] = useState(0);

    // Initial data fetch
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                // Fetch categories from API
                const categoriesResponse = await CategoryService.getCategories();
                setCategories(categoriesResponse || []);
                // Fetch products as before
                const response = await ProductService.getProducts({page: 1});
                setProducts(response.data);
                setTotalPages(response.last_page);
                setPaginationLinks(response.links || []);
                setProductsCount(response.total || response.data.length);
            } catch (error) {
                setError('Failed to load products or categories. Please try again later.');
            } finally {
                setLoading(false);
                setInitialLoadComplete(true);
                // Initialize pending filters with current filters
                setPendingNameFilter(nameFilter);
                setPendingPriceRange(priceRange);
                setPendingCategoryFilter(categoryFilter);
            }
        };
        fetchInitialData();
    }, []);

    // Effect to fetch products when page changes or when filter is applied
    useEffect(() => {
        if (initialLoadComplete) {
            fetchFilteredProducts();
        }
    }, [page, nameFilter, priceRange, categoryFilter, initialLoadComplete]);

    // Fetch products based on filters and page
    const fetchFilteredProducts = async () => {
        if (!initialLoadComplete) return;

        setLoading(true);
        try {
            const params = {
                page,
                name: nameFilter || undefined,
                min_price: priceRange[0] || undefined,
                max_price: priceRange[1] === 300 ? undefined : priceRange[1],
                category_id: categoryFilter || undefined
            };
            Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

            const response = await ProductService.getProducts(params);
            setProducts(response.data);
            setTotalPages(response.last_page);
            setPaginationLinks(response.links || []);
            setProductsCount(response.total || response.data.length);
        } catch (error) {
            setError('Failed to apply filters. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, value) => {
        if (value !== page) {
            setPage(value);
        }
    };

    const handleApplyFilters = () => {
        // Apply pending filters to actual filters
        setNameFilter(pendingNameFilter);
        setPriceRange(pendingPriceRange);
        setCategoryFilter(pendingCategoryFilter);

        // Reset page to 1 when filters change
        if (page !== 1) {
            setPage(1);
        }
        setIsDrawerOpen(false);
    };

    const handleNameFilterChange = (e) => {
        const value = e.target.value;
        setPendingNameFilter(value);
        // Also update actual filter to trigger search immediately
        setNameFilter(value);
        // Reset page to 1 when search changes
        if (page !== 1) {
            setPage(1);
        }
    };

    const handlePriceRangeChange = (event, newValue) => {
        setPendingPriceRange(newValue);
    };

    const handleCategoryFilterChange = (event) => {
        const categoryId = event.target.value === 'all' ? '' : parseInt(event.target.value);
        setPendingCategoryFilter(categoryId);
    };

    const handleResetFilters = () => {
        // Reset pending filters
        setPendingNameFilter('');
        setPendingPriceRange([0, 300]);
        setPendingCategoryFilter('');

        // Also reset actual filters to trigger a reload
        setNameFilter('');
        setPriceRange([0, 300]);
        setCategoryFilter('');
        setPage(1);

        setIsDrawerOpen(false);
    };

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        // When opening the drawer, sync pending filters with current filters
        if (open) {
            setPendingNameFilter(nameFilter);
            setPendingPriceRange(priceRange);
            setPendingCategoryFilter(categoryFilter);
        }

        setIsDrawerOpen(open);
    };

    // Handle product click to open the drawer
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsProductDrawerOpen(true);
    };

    // Close the drawer
    const handleCloseDrawer = () => {
        setIsProductDrawerOpen(false);
    };

    const handleClearSearch = () => {
        setNameFilter('');
        setPendingNameFilter('');
    };

    if (error) {
        return (
            <Container maxWidth="lg" sx={{py: 4}}>
                <Typography variant="h5" color="error" align="center">
                    {error}
                </Typography>
            </Container>
        );
    }

    const selectedCategoryName = categoryFilter ?
        categories.find(cat => cat.id === categoryFilter)?.name : 'All Products';

    return (
        <Box sx={{bgcolor: '#fafbfc', minHeight: '80vh', py: 4, display: 'flex'}}>
            <Box sx={{pl: 4, pr: 2, pt: 8, display: {xs: 'none', md: 'block'}}}>
                <IconButton
                    onClick={toggleDrawer(true)}
                    sx={{
                        color: 'black',
                        borderRadius: 2,
                        p: '10px',
                        bgcolor: 'white',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <img src="/images/icons/filter.svg" alt="Filter"/>
                </IconButton>
            </Box>

            <Container maxWidth="xlg" sx={{flexGrow: 1}}>
                <BreadcrumbNav categoryName={selectedCategoryName} />

                <Grid sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 4,
                    width: '100%',
                    flexDirection: {xs: 'column', md: 'row'},
                }}>
                    <Grid sx={{
                        width: '100%',
                        borderRadius: 3,
                        boxShadow: '0px 0px 16px 2px rgba(0, 0, 0, 0.04)',
                        flex: 1,
                        height: 'fit-content',
                        p: 3,
                    }}>
                        <SearchBar
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                            onClear={handleClearSearch}
                            onFilterClick={toggleDrawer(true)}
                        />

                        <ProductList
                            products={products}
                            loading={loading}
                            totalPages={totalPages}
                            page={page}
                            paginationLinks={paginationLinks}
                            onPageChange={handlePageChange}
                            onProductClick={handleProductClick}
                            productsCount={productsCount}
                            categoryName={selectedCategoryName}
                        />
                    </Grid>
                    <Grid sx={{
                        maxWidth: {xs: '100%', md: '30%'},
                        borderRadius: 3,
                        boxShadow: '0px 0px 16px 2px rgba(0, 0, 0, 0.04)',
                        flex: 1,
                        height: 'fit-content',
                    }}>
                        <OrderSummaryPreview/>
                    </Grid>
                </Grid>
            </Container>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{sx: {width: 300}}}
            >
                <FilterDrawer
                    priceRange={pendingPriceRange}
                    categoryFilter={pendingCategoryFilter}
                    categories={categories}
                    onPriceRangeChange={handlePriceRangeChange}
                    onCategoryChange={handleCategoryFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                    onClose={toggleDrawer(false)}
                />
            </Drawer>

            {/* Product Details Drawer */}
            <ProductDetailsDrawer
                open={isProductDrawerOpen}
                product={selectedProduct}
                onClose={handleCloseDrawer}
            />
        </Box>
    );
};

export default HomePage;
