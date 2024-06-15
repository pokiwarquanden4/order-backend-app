import React, { useCallback, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Button, Modal, Portal, TextInput } from 'react-native-paper';

const items = {
    '2024-05-12': [{ date: '2024-05-12', name: undefined, data: undefined }],
    '2024-05-13': [{ date: '2024-05-13', name: 'Meeting 2', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ' }],
    '2024-05-14': [{ date: '2024-05-14', name: 'Meeting 3', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ' }],
    '2024-05-15': [{ date: '2024-05-15', name: 'Meeting 4', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ' }],
    '2024-05-16': [{ date: '2024-05-16', name: 'Meeting 5', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ' }],
    '2024-05-17': [{ date: '2024-05-17', name: 'Meeting 6', data: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ' }]
}

function ScheduleCreation() {
    const [data, setData] = useState(items)
    const [date, setDate] = useState(new Date());
    const [selectedData, setSelectedData] = useState()
    const [modal, setModal] = useState(false)

    onDayPress = (date) => {
        setDate(new Date(date.year, date.month - 1, date.day));
    };

    onDayChange = (date) => {
        setDate(new Date(date.year, date.month - 1, date.day));
    };

    const updateData = useCallback((text, key) => {
        setSelectedData((preData) => {
            const newData = { ...preData }
            newData[key] = text

            return newData
        })
    }, [])

    const getStringDate = useCallback((date) => {
        const currentDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })

        if (!currentDate) return undefined

        // Split the string into an array of components
        const parts = currentDate.split("/");

        // Ensure correct order (year last) and padding for single-digit values
        const formattedDate = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;

        return formattedDate
    }, [])

    const getWeekDays = (selectedDate) => {
        // 1. Get the day of the week (0-6) for the selected date, with 0 being Sunday
        const weekday = selectedDate.getDay()

        // 2. Calculate the offset to get the previous Monday
        const previousMonday = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - weekday);

        // 3. Create an array to store the week's dates (excluding current Sunday)
        const weekDays = [];

        // 4. Iterate through 6 days (excluding Sunday) and add them to the array
        for (let i = 0; i <= 6; i++) {
            const day = new Date(previousMonday.getTime() + i * 24 * 60 * 60 * 1000); // Add one day for each iteration
            weekDays.push(day);
        }

        // 5. Return the array of week days (excluding current Sunday)
        return weekDays;
    };

    const getOthersDate = useCallback(() => {
        const allDates = getWeekDays(date)
        const results = {}

        allDates.forEach((date) => {
            results[getStringDate(date)] = [{ date: getStringDate(date), name: undefined, data: undefined }]
        })

        return results
    }, [date])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Agenda
                    items={{
                        ...getOthersDate(),
                        ...items
                    }}
                    onDayPress={onDayPress}
                    onDayChange={onDayChange}
                    renderItem={(item, isFirst) => {
                        const press = () => {
                            setSelectedData(item)
                            setModal(true)
                        }

                        return (
                            item.data
                                ?
                                <TouchableOpacity style={styles.item} onPress={press}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                    <Text style={styles.itemText}>{item.data}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{
                                    marginRight: 10,
                                    marginTop: 25,
                                    backgroundColor: 'lightblue',
                                    flex: 1,
                                    borderRadius: 5,
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} onPress={press}>
                                    <Text style={{ color: 'gray' }}>No data...</Text>
                                </TouchableOpacity>
                        )
                    }}
                />
            </SafeAreaView>

            <Portal>
                <Modal visible={modal} onDismiss={() => setModal(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Edit Your Information</Text>
                    <View>
                        <TextInput
                            style={{ marginBottom: 10 }}
                            label="Header"
                            value={selectedData ? selectedData.name : ''}
                            onChangeText={text => updateData(text, 'name')}
                        />
                        <TextInput
                            style={{ marginBottom: 10 }}
                            label="Details"
                            value={selectedData ? selectedData.data : ''}
                            multiline={true} // Allow multiple lines
                            onChangeText={text => updateData(text, 'data')}
                        />
                    </View>
                    <Button mode='contained'
                        style={{ marginBottom: 10 }}
                        onPress={() => {
                            setModal(false)
                        }}>
                        Finish
                    </Button>
                    <Button mode='outlined' onPress={() => setModal(false)}>
                        Cancel
                    </Button>
                </Modal>
            </Portal>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: 500
    },
    item: {
        backgroundColor: 'lightblue',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 25,
        paddingBottom: 20
    },
    itemText: {
        color: 'black',
        fontSize: 16,
    }
});

export default ScheduleCreation;