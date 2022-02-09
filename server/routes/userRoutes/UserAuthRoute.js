const router = require('express').Router()
const validToken = require('../../config/accessToken').validToken
/**
 * load controllers
 *
 * @type {controller} list of all Controller
 */
const UserController = require('../../app/controller/userController')
const ProductController = require('../../app/controller/productController')


/**
 * request value validator
 */
const login_validator = require('../../app/validator/UserAuthValidator').login_validator()


/**
 * initialize controllers
 *
 * @type {object}   authController,
 *                  
 *                  
 */
const userController = new UserController()
const productController = new ProductController()


/**
 * Router list for user
 *
 * @type {route} user 
 * @url  
 *     api/v1/auth/login   
 *       
 */
router.post('/login',login_validator, userController.login)





/**
 * Router list for product
 *
 * @type {route} product 
 * @url  
 *     api/v1/auth/productList   
 *     api/v1/auth/productList    
 */
router.get('/producList', [validToken], productController.productList)
router.post('/setBidLimit', productController.setBidLimit)


router.get('/test', (req, res) => {
    res.send('**************Backend is working fine***********')
})

module.exports = router