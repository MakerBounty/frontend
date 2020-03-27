


export default function () {
    if (typeof window === "undefined")
        return;
    
    window.localStorage.removeItem("userData");
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}