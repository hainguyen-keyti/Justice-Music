export function getHeaders() {
    var token = localStorage.getItem('accessToken')
    
    var headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'x-access-token': token
    }
    return headers;
}