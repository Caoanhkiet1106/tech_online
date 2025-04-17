import express from 'express';
const router = express.Router();
import * as UserController from './controllers/UserController.js';
import * as ProductController from './controllers/ProductController.js';
import * as CategoryController from './controllers/CategoryController.js';
import * as BrandController from './controllers/BrandController.js';
import * as OrderController from './controllers/OrderController.js';
import * as OrderDetailController from './controllers/OrderDetailController.js';
import * as NewsController from './controllers/NewsController.js'
import * as NewsDetailController from './controllers/NewsdetailController.js';
import asyncHandler from './middlewares/asyncHandel.js';
import validate from './middlewares/validate.js';
import InsertProductRequest from './dtos/requests/product/InsertProductRequests.js';
import UpdateProductRequest from './dtos/requests/product/UpdateProductRequests.js';
import InsertOrderRequest from './dtos/requests/order/InsertOrderRequests.js';
import InsertUserRequest from './dtos/requests/users/InsertUserRequests.js';
import InsertNewsRequest from './dtos/requests/news/InsertNewsRequests.js';
import InsertNewsDetailRequest from './dtos/requests/news-detail/InsertNewsDetailRequest.js';
import UpdateNewsRequest from './dtos/requests/news/UpdateNewsRequests.js';
export function AppRoute(app) {
    // User Routes
    router.post('/users',
        validate(InsertUserRequest),
        asyncHandler(UserController.insertUser));
    // Product Routes
    router.get('/products', asyncHandler(ProductController.getProducts));
    router.get('/products/:id', asyncHandler(ProductController.getProductById));
    router.post('/products',
        validate(InsertProductRequest),
        asyncHandler(ProductController.insertProducts)
    );
    router.put('/products/:id',
        validate(UpdateProductRequest),
        asyncHandler(ProductController.updateProducts));
    router.delete('/products/:id', asyncHandler(ProductController.deleteProducts));

    // Category Routes
    router.get('/categories', asyncHandler(CategoryController.getCategories));
    router.get('/categories/:id', asyncHandler(CategoryController.getCategoryById));
    router.post('/categories', asyncHandler(CategoryController.insertCategory));
    router.put('/categories/:id', asyncHandler(CategoryController.updateCategory));
    router.delete('/categories/:id', asyncHandler(CategoryController.deleteCategory));

    // Brand Routes
    router.get('/brands', asyncHandler(BrandController.getBrands));
    router.get('/brands/:id', asyncHandler(BrandController.getBrandById));
    router.post('/brands', asyncHandler(BrandController.insertBrand));
    router.put('/brands/:id', asyncHandler(BrandController.updateBrand));
    router.delete('/brands/:id', asyncHandler(BrandController.deleteBrand));

    // Order Routes
    router.get('/orders', asyncHandler(OrderController.getOrders));
    router.get('/orders/:id', asyncHandler(OrderController.getOrderById));
    router.post('/orders', validate(InsertOrderRequest), asyncHandler(OrderController.insertOrder));
    router.put('/orders/:id', asyncHandler(OrderController.updateOrder));
    router.delete('/orders/:id', asyncHandler(OrderController.deleteOrder));

    // Order Detail Routes
    router.get('/order-details', asyncHandler(OrderDetailController.getOrderDetails));
    router.get('/order-details/:id', asyncHandler(OrderDetailController.getOrderDetailById));
    router.post('/order-details', asyncHandler(OrderDetailController.insertOrderDetail));
    router.put('/order-details/:id', asyncHandler(OrderDetailController.updateOrderDetail));
    router.delete('/order-details/:id', asyncHandler(OrderDetailController.deleteOrderDetail));

    // News Routes
    router.get('/news', asyncHandler(NewsController.getNews)); // Lấy danh sách tất cả bài viết
    router.get('/news/:id', asyncHandler(NewsController.getNewsById)); // Lấy bài viết theo ID
    router.post('/news',
         validate(InsertNewsRequest), 
         asyncHandler(NewsController.insertNews)); // Thêm mới bài viết
    router.put('/news/:id',
        validate(UpdateNewsRequest), // Validate dữ liệu đầu vào 
        asyncHandler(NewsController.updateNews)); // Cập nhật bài viết theo ID
    router.delete('/news/:id', asyncHandler(NewsController.deleteNews)); // Xóa bài viết theo ID
    
    // News Detail Routes
    router.get('/news-details', asyncHandler(NewsDetailController.getNewsdetails)); // Lấy danh sách Newsdetail (có tìm kiếm và phân trang)
    router.get('/news-details/:id', asyncHandler(NewsDetailController.getNewsdetailById)); // Lấy Newsdetail theo ID
    router.post('/news-details',
        validate(InsertNewsDetailRequest) // Validate dữ liệu đầu vào
        , asyncHandler(NewsDetailController.insertNewsdetail)); // Thêm mới Newsdetail
    router.put('/news-details/:id', asyncHandler(NewsDetailController.updateNewsdetail)); // Cập nhật Newsdetail theo ID
    router.delete('/news-details/:id', asyncHandler(NewsDetailController.deleteNewsdetail)); // Xóa Newsdetail theo ID
    app.use('/api', router);
}
