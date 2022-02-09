const response = require("../../config/ResponseStatus");
const text = require("../../config/TextString");
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
/**
 * load all userData
 *
 * @type {object}
 * @files userScheme,SampleData
 *
 *
 */
 const  userData = require('../data/userData').userList

class UserService {
    /**
     * login user
     *
     * @params phone,password
     * @return {Promise<Object>}
     */
    login = async (req) => {
        let output = { status: null, msg: null, token: null, data: null ,token : null};
        let result = null
        const { email, password } = req.body;
        
        userData.map(user=>{
            if(user.email == email && user.password == password){
                result = user
                console.log("USER",user)
            }
        })
        
        if (result) {
            //generating unique ID
            const userUUID = uuid.v4()
            //creating signed jwt token
            const token = jwt.sign({ userAccess: userUUID }, process.env.JWT_SECRET, { expiresIn: "2h", })
            
            //preparing response
            output.data = result
            output.status = response.STATUS_OK;
            output.msg = text.Successful_Login;
            output.token = token
        } else {
            output.msg = text.Incorrect_Password;
            output.status = response.STATUS_UNAUTHORIZED;
        }

        return output;
    };
}

module.exports = UserService;
