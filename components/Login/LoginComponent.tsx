import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { login } from './LoginAPI';
import { useAppDispatch } from '@/config/hook';
import { setUser } from '@/reducer/userSlice';

interface ILoginError {
    username: boolean,
    password: boolean,
}

const LoginComponent = () => {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ILoginError>({
        username: false,
        password: false
    })

    const handleLogin = useCallback(async () => {
        const newError: ILoginError = {
            username: false,
            password: false
        }
        if (!username) {
            newError.username = true
        }
        if (!password) {
            newError.password = true
        }

        if (!newError.username && !newError.password) {
            const data = await login({
                account: username,
                password: password,
            })
            if (data) {
                if (data.status === 200 && data.data.message === 'User not found') {
                    newError.username = true
                }
                if (data.status === 200 && data.data.message === 'Invalid password') {
                    newError.password = true
                }
                if (data.status === 200 && data.data.message === 'Login successful') {
                    dispatch(setUser(data.data.user))
                }
            }
        }

        setError(newError)
    }, [username, password]);

    const onChangeData = useCallback((key: string, value: string) => {
        switch (key) {
            case 'username':
                setError((preError) => {
                    const newError = {
                        ...preError,
                        username: false
                    }

                    return newError
                })
                setUsername(value)
                break
            case 'password':
                setError((preError) => {
                    const newError = {
                        ...preError,
                        password: false
                    }

                    return newError
                })
                setPassword(value)
                break
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Login</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => onChangeData('username', text)}
                    placeholder="Username"
                    autoCapitalize="none" // Prevent automatic capitalization
                    textContentType="username" // Set keyboard type for username
                />
                {
                    error.username
                        ?
                        <Text style={{ color: 'red', fontSize: 12, paddingBottom: 13, marginLeft: 6 }}>User name do not valid</Text>
                        :
                        undefined
                }
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => onChangeData('password', text)}
                    placeholder="Password"
                    secureTextEntry={true} // Hide password characters
                />
                {
                    error.password
                        ?
                        <Text style={{ color: 'red', fontSize: 12, paddingBottom: 13, marginLeft: 6 }}>Password do not valid</Text>
                        :
                        undefined
                }
                <Button mode='contained' onPress={handleLogin}>
                    Login
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Take all available space
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    message: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    form: {
        width: '80%',
    },
    input: {
        marginBottom: 10,
    },
});

export default LoginComponent;
