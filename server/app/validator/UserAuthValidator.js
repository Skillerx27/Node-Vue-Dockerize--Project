const { body } = require('express-validator')

exports.login_validator = () => {
    return [
        body( 'email', 'Phone number is missing').notEmpty(),
        body( 'password', 'Password is missing').notEmpty(),
    ]
}
