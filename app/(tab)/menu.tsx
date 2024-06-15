import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function menu() {
    const router = useRouter()

    return (
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            <View style={{ marginTop: 50 }}>
                <Text style={styles.header}>Hello Quang</Text>
                <Text style={styles.subHeader}>This is your infomation</Text>
            </View>
            <View style={{ paddingBottom: 10 }}>
                <Button
                    onPress={() => {
                        router.navigate('/menuRoute/menuRoute')
                    }}
                    contentStyle={styles.button} icon="human" mode="outlined">
                    Your Profile
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>
                <Button
                    onPress={() => {
                        router.navigate('/ScheduleRoute/ScheduleRoute')
                    }}
                    contentStyle={styles.button} icon="clock" mode="outlined" >
                    Timekeeping
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>
                <Button
                    onPress={() => {
                        router.navigate('/MoneyRoute/MoneyRoute')
                    }}
                    contentStyle={styles.button} icon="cash" mode="outlined">
                    Money
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>

                <Button
                    onPress={() => {
                        router.navigate('/AboutYourJobRoute/AboutYourJobRoute')
                    }}
                    contentStyle={styles.button} icon="table" mode="outlined">
                    About Your Jobs
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>

                <Button
                    onPress={() => {
                        router.navigate('/CreateAccountRoute/CreateAccountRoute')
                    }}
                    contentStyle={styles.button} icon="table" mode="outlined" >
                    Create new account
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>

                <Button
                    onPress={() => {
                        router.navigate('/CreateScheduleRoute/CreateScheduleRoute')
                    }}
                    contentStyle={styles.button} icon="table" mode="outlined" >
                    Create new schedule
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>

                <Button
                    onPress={() => {
                        router.navigate('/CreateMoneyRoute/CreateMoneyRoute')
                    }}
                    contentStyle={styles.button} icon="table" mode="outlined" >
                    Create money
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>

                <Button
                    onPress={() => {
                        router.navigate('/CreateJobDesRoute/CreateJobDesRoute')
                    }}
                    contentStyle={styles.button} icon="table" mode="outlined" >
                    Create Job Description
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>

                <Button
                    onPress={() => {
                        router.navigate('/CreateMenuRoute/CreateMenuRoute')
                    }}
                    contentStyle={styles.button} icon="table" mode="outlined">
                    Create Menu
                </Button>
            </View>
            <View style={{ paddingBottom: 10 }}>

                <Button contentStyle={styles.button} icon="exit-to-app" mode="outlined">
                    Log out
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold', // Make the text bold
        color: '#333', // Dark text color
        textAlign: 'center', // Center the text horizontally
        paddingBottom: 8
    },
    subHeader: {
        fontSize: 13,
        fontWeight: 'light',
        textAlign: 'center', // Center the text horizontally
        paddingBottom: 15
    },
    button: {
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align content vertically in the center
        justifyContent: 'flex-start', // Move content to the right end
    },
});