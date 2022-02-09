/**
 * @type {Response} server response
 */
const response = require('../../config/ResponseStatus')
/**
 * load Product Services
 * @type {class} productService
 */
const productService = require('../service/productService')
/**
 * init
 * @type {object} productServiceObj
 */
const productServiceObj = new productService()

//importing logger module
const logger = require('../../config/logger')

/**
 * class for productController
 *
 * @type {class} productController
 * @created_at 9th February 2022
 * @created_by Md Tanjin Alam
 */
class productController {

    /**
    * get product list
    *
    * @params  
    * @return {Promise<*>}
    * @created_by Md Tanjin Alam
    */
     productList = async (req, res) => {
         
        await productServiceObj.productList(req)
            .then(result => {
                return res.status(response.STATUS_OK).send(result)
            })
            .catch(err => {
                logger.log("error", "productController :: productList", err);
                return res.status(response.STATUS_SERVER_ERROR).send(err)
            })
    }

    /**
    * get product list
    *
    * @params  
    * @return {Promise<*>}
    * @created_by Md Tanjin Alam
    */
     setBidLimit = async (req, res) => {
         
        await productServiceObj.setBidLimit(req)
            .then(result => {
                return res.status(response.STATUS_OK).send(result)
            })
            .catch(err => {
                logger.log("error", "productController :: setBidLimit", err)
                return res.status(response.STATUS_SERVER_ERROR).send(err)
            })
    }

   

}

module.exports = productController