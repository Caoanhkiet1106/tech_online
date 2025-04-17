import React from 'react';
import { Box } from '@mui/material';
import Categories_List from '../../components/admin/Categories_List';

const CategoryPage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Categories_List />
    </Box>
  );
};

export default CategoryPage;