const { validationResult } = require('express-validator')
/**
 * @type {Response} server response
 */
const response = require('../../config/ResponseStatus')
/**
 * load User Service
 * @type {class} UserService
 */
const userService = require('../service/UserService')
/**
 * init
 * @type {object} usersModelObj
 */
const usersModelObj = new userService()

//importing logger module
const logger = require('../../config/logger')

/**
 * class for userController
 *
 * @type {class} UserController
 * @created_at 9th february 2022
 * @created_by Md Tanjin Alam
 */
class userController {

    /**
    * login request by user
    *
    * @params body 
    * @return {Promise<*>}
    * @created_by Md Tanjin Alam
    */
    login = async (req, res) => {
        //checking request body does have required entity or not or else return error
        const er_obj = validationResult(req)
        if (!er_obj.isEmpty()) {
            let result = this.#getResult(er_obj)
            return res.status(response.STATUS_UNPROCESSABLE_ENTITY).json({ errors: result })
        }
        await usersModelObj.login(req)
            .then(result => {
                return res.status(response.STATUS_OK).send(result)
            })
            .catch(err => {
                logger.log("error", "userController :: login", err);
                return res.status(response.STATUS_SERVER_ERROR).send(err)
            })
    }

    /**
    * get request error message
    *
    * @param data
    * @created_at 18th December 2021
    * @created_by Md Tanjin Alam
    */
    #getResult = (err) => {
        let result = {}, er_arr = err.array()
        for (let i = 0; i < er_arr.length; i++) {
            result[er_arr[i].param] = er_arr[i].msg
        }
        return result
    }

}

module.exports = userController