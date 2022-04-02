
import {validationResponse} from "./interface"

 export  function dataIsValid(data: any): validationResponse {
    const response = { success: "", error: "" }

    if (!Array.isArray(data)) {
        return { ...response, error: "Must be array of objects" }
    }
    for (let item of data) {
        if (keyNotPresent('user', item) || keyNotPresent('amount', item)) {
            return { ...response, error: "user or amount is missing" }
        }

        if (typeof item.user !== "string" || typeof item.amount !== "number") {
            return { ...response, error: "invalid type for user or amount" }
        }
    }
    return { ...response, success: "data is valid" }
}


function keyNotPresent(key: string, obj: any) {
    return !(key in obj);
}

// export default {dataIsValid}