import jwtDecode from 'jwt-decode';

export const tokenHelper = {
    getAuthHeader,
    isTokenExpired,
    getUserInfo
}

function getAuthHeader() {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function isTokenExpired(token: string) {
    let userExpired = false;
    if (token && Object.keys(token).length !== 0) {
        const decoded: any = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
            userExpired = true;
        }
    } else {
        userExpired = true;
    }

    return userExpired;
}

function getUserInfo(token: string): any {
    const decoded: any = jwtDecode(token);
    return decoded;
}