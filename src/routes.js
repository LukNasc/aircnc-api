const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');


const router = express.Router();
const upload  = multer(uploadConfig);
//Métodos mais importantes numa API REST
//GET, POST, PUT, DELETE
//req.query => acessar query params  (filtragem de dados)
//req.params => acessar route params (Edição e delete)
//req.body =>Pegar o corpo da requisição
router.post('/users', SessionController.store);

router.post('/spots', upload.single('thumbnail'),SpotController.store);
router.get('/spots',SpotController.index);

router.get('/dashboard',DashboardController.show);

router.post('/spots/:spot_id/bookings',BookingController.store);

router.post('/bookings/:booking_id/approvals', ApprovalController.store);
router.post('/bookings/:booking_id/rejections',RejectionController.store);

module.exports = router;


