import { useRouter } from 'expo-router';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')
    const router = useRouter()

    const handleLogin = () => {
        // Replace this with your actual login logic
        console.log('Username:', username);
        console.log('Password:', password);
        // Handle successful or failed login (e.g., navigate to a different screen)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Create new account</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    autoCapitalize="none" // Prevent automatic capitalization
                    textContentType="username" // Set keyboard type for username
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={true} // Hide password characters
                />
                <RNPickerSelect
                    onValueChange={(value) => setRole(value)}
                    items={[
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                    ]}
                />
                <Button mode='contained' style={{ marginBottom: 10 }} onPress={handleLogin}>Create</Button>
                <Button mode='outlined' onPress={() =>
                    router.back()
                }>Cancel</Button>
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
        fontSize: 20,
        marginBottom: 20,
    },
    form: {
        width: '80%',
    },
    input: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});

export default CreateAccount;
