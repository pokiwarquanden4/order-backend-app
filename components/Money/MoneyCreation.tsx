import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MoneyTags from './MoneyTags';
import { Avatar, Button, Modal, Portal, TextInput } from 'react-native-paper';


const MoneyCreation = ({ modal, setModal }: { modal: boolean, setModal: Dispatch<SetStateAction<boolean>> }) => {
    const [selectedData, setSelectedData] = useState({
        value: 0,
        note: ''
    })

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
