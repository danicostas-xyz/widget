import axios from 'axios';

let accessToken = "1000.e7e638e6b5a240345677d5c55250ecd2.baf4ffb1d9947e4b05fd44d882a99339";
const refreshToken = "1000.80ad8af013b6ca6aeecf6d2c3d159448.6c0e86c0a0f97b927ed13974986e0846";
const clientId = "1000.JMM0V3CZCDME4BDECWZEJ5S90W81HY";
const clientSecret = "2e8e16e2a2872b9eec0448613bc6144084635ac8eb";
const apiUrl = "https://creator.zoho.com/api/v2/pinout1/portal-de-propiedades/";

async function refreshAccessToken() {
    console.log('🔄 Refrescando el access token...');
    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                grant_type: 'refresh_token',
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken
            }
        });

        accessToken = response.data.access_token;
        console.log('✅ Nuevo access token obtenido:', accessToken);
    } catch (error) {
        console.error('❌ Error al refrescar el token:', error.response?.data || error.message);
    }
}

async function fetchZohoData(url) {

    try {
        const response = await axios.get(url, {
            headers: { 
                'Authorization': `Zoho-oauthtoken ${accessToken}` ,

            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('⚠️ Token expirado. Intentando refrescar...');
            await refreshAccessToken();
            return fetchZohoData(url); // Reintenta la solicitud con el nuevo token
        }
        throw error;
    }
}

export { fetchZohoData, refreshAccessToken };