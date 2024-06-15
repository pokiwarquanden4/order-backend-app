import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import MoneyTags from './MoneyTags';
import { Avatar, Button, Modal, Portal, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const MoneyCreation = () => {
    const router = useRouter()
    const [selectedData, setSelectedData] = useState({
        value: 0,
        note: ''
    })
    const [modal, setModal] = useState(false)

    const onUpdateData = (value: string | number, key: string) => {
        setSelectedData((preData) => {
            const newData = { ...preData }

            switch (key) {
                case 'note':
                    newData.note = value as string
                    break
                case 'value':
                    newData.value = value as number
                    break
            }

            return newData
        })
    }

    return (
        <>
            <View style={{ paddingHorizontal: 10, paddingTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Button icon='plus' mode='outlined' onPress={() => setModal(true)}>Add Payment</Button>
            </View>
            <ScrollView style={{ height: 460 }}>
                <MoneyTags flag={true}></MoneyTags>
                <MoneyTags flag={false}></MoneyTags>
                <MoneyTags flag={true}></MoneyTags>
                <MoneyTags flag={false}></MoneyTags>
                <MoneyTags flag={true}></MoneyTags>
                <MoneyTags flag={false}></MoneyTags>
                <MoneyTags flag={true}></MoneyTags>
                <MoneyTags flag={false}></MoneyTags>
                <MoneyTags flag={true}></MoneyTags>
                <MoneyTags flag={false}></MoneyTags>
                <MoneyTags flag={true}></MoneyTags>
                <MoneyTags flag={false}></MoneyTags>
                <MoneyTags flag={true}></MoneyTags>
                <MoneyTags flag={false}></MoneyTags>
                <MoneyTags flag={true}></MoneyTags>
                <MoneyTags flag={false}></MoneyTags>
            </ScrollView>
            <Portal>
                <Modal visible={modal} onDismiss={() => setModal(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Edit Your Information</Text>

                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Note"
                        value={selectedData.note}
                        onChangeText={text => onUpdateData(text, 'note')}
                    />

                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Value"
                        value={String(selectedData.value)}
                        onChangeText={text => onUpdateData(text, 'value')}
                        keyboardType="numeric"
                    />

                    <Button mode='contained' onPress={() => setModal(false)}>
                        Finish
                    </Button>
                </Modal>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({

})

export default MoneyCreation
