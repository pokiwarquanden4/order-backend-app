import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MoneyTags from '../Money/MoneyTags';
import { Button, Modal, Portal, TextInput } from 'react-native-paper';


const AboutYourJobCreation = ({ modal, setModal }: { modal: boolean, setModal: Dispatch<SetStateAction<boolean>> }) => {
    const [selectedData, setSelectedData] = useState({
        value: 'sdfsdfsdfsdf',
    })

    return (
        <>
            <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Job Description</Text>

            <TextInput
                style={{ height: 200, marginBottom: 20 }}
                label="Description"
                value={selectedData.value}
                multiline={true}
                onChangeText={text => setSelectedData({ value: text })}
            />

            <Button mode='contained' onPress={() => setModal(false)}>
                Finish
            </Button>
        </>
    );
};

const styles = StyleSheet.create({

})

export default AboutYourJobCreation
