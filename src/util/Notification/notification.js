import { notification } from "antd"

export const notifiFunction = (type, message, description = '') => {
    notification[type]({ //action.typeNotification = success | warning | info | error,
        message: message,
        description: description
    })
}


// yield notifiFunction('success', 'Register Success !', `Register Successful !`)