function getResponseMessage(statusCode) {
    switch (statusCode) {
        case 200:
            return "OK";

        case 401:
            return "Unauthorized";

        case 403:
            return "Forbidden";

        case 404:
            return "Not Found"
    
        default:
            return "Internal Server Error";
    }
}

export function createResponse(statusCode, message = "", data = null) {
    return {
        status: statusCode,
        message: message ? message : getResponseMessage(statusCode),
        data: data ? data : null
    }
}