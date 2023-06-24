export const parseJwt = (token) => {
    try {
        // split token at . and access payload
        const base64Url = token.split('.')[1];
        // In Base64Url, the + and / characters are replaced by - and _
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        // atob decodes Base64 to a regular string. We then split to array of chars,
            // each char converts to ASCII via charCodeAt, convert that to hex string
                // prefix hex string with 00, keep last 2 chars to ensure 2 dig number
                // prefix whole string with % for decodeURIcomponent compatibility
                // join back to single string, then decodeURIcomponent converts back to regular string
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
return JSON.parse(jsonPayload);
    } catch (err) {
        console.error("Invalid Token",err);
        return null;
    }
};