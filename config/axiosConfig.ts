import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { trackPromise } from "react-promise-tracker";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TokenData {
    token: string;
    Expiry: string;
}

const isTokenExpired = (expiry: string): boolean => {
    const expiryDate = new Date(expiry);
    const currentDate = new Date();
    return currentDate >= expiryDate;
};

export const deleteTokens = async () => {
    try {
        await AsyncStorage.multiRemove(['token', 'refresh_token']);
        console.log('Tokens deleted successfully');
    } catch (error) {
        console.error('Error deleting tokens:', error);
    }
};

export const getToken = async () => {
    const tokenData = await AsyncStorage.getItem('token');
    const refreshTokenData = await AsyncStorage.getItem('refresh_token');

    if (tokenData) {
        const { token, Expiry }: TokenData = JSON.parse(tokenData);
        if (!isTokenExpired(Expiry)) {
            return token;
        } else if (refreshTokenData) {
            const { token: refreshToken, Expiry: refreshExpiry }: TokenData = JSON.parse(refreshTokenData);
            if (!isTokenExpired(refreshExpiry)) {
                return refreshToken;
            }
        }
    }
}

export const handleAxiosResponse = async (response: any) => {
    if (response.data.accessToken && response.status === 200) {
        try {
            const decodedAccessToken: any = jwtDecode(response.data.accessToken);
            const accessTokenExpiry = new Date(Number(decodedAccessToken.exp) * 1000).toISOString();

            const data = {
                token: response.data.accessToken,
                Expiry: accessTokenExpiry
            }

            await AsyncStorage.setItem('token', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving access token to AsyncStorage', error);
        }
    }
    if (response.data.refreshToken && response.status === 200) {
        try {
            const decodedAccessToken: any = jwtDecode(response.data.refreshToken);
            const accessTokenExpiry = new Date(Number(decodedAccessToken.exp) * 1000).toISOString();

            const data = {
                token: response.data.refreshToken,
                Expiry: accessTokenExpiry
            }

            await AsyncStorage.setItem('refresh_token', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving refresh token to AsyncStorage', error);
        }
    }
    return response;
}

export const sendRequest = async (url: string, { payload, method }: { payload?: any, method: string }, loading: boolean = true) => {
    const token = await getToken()

    const request = axios({
        method,
        url,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((results) => {
        handleAxiosResponse(results)

        return {
            status: results.status,
            data: results.data
        }
    }).catch((error) => {
        console.log(error)
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log({
                    status: axiosError.response.status,
                    data: axiosError.response.data
                })
            } else if (axiosError.request) {
                // The request was made but no response was received
                console.log('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error setting up the request:', axiosError.message);
            }
        }
    })

    return loading ? trackPromise(request) : request

};
