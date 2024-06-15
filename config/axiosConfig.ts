import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { trackPromise } from "react-promise-tracker";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleAxiosRequest = async (config: InternalAxiosRequestConfig) => {
    try {
        const token = await AsyncStorage.getItem('token') || await AsyncStorage.getItem('refresh_token');
        if (token) {
            config.headers['Authorization'] = "Bearer " + token;
        }
    } catch (error) {
        console.error('Error retrieving token from AsyncStorage', error);
    }
    return config;
}

export const handleAxiosResponse = async (response: any) => {
    if (response.data.accessToken && response.status === 200) {
        try {
            await AsyncStorage.setItem('token', response.data.accessToken);
            const decodedAccessToken: any = jwtDecode(response.data.accessToken);
            const accessTokenExpiry = new Date(Number(decodedAccessToken.exp) * 1000).toISOString();
            await AsyncStorage.setItem('token_expiry', accessTokenExpiry);
        } catch (error) {
            console.error('Error saving access token to AsyncStorage', error);
        }
    }
    if (response.data.refreshToken && response.status === 200) {
        try {
            await AsyncStorage.setItem('refresh_token', response.data.refreshToken);
            const decodedRefreshToken: any = jwtDecode(response.data.refreshToken);
            const refreshTokenExpiry = new Date(Number(decodedRefreshToken.exp) * 1000).toISOString();
            await AsyncStorage.setItem('refresh_token_expiry', refreshTokenExpiry);
        } catch (error) {
            console.error('Error saving refresh token to AsyncStorage', error);
        }
    }
    return response;
}

export const sendRequest = async (url: string, { payload, method }: { payload?: any, method: string }, loading: boolean = true) => {
    const request = axios({
        method,
        url,
        data: payload,
    }).then((results) => {
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
