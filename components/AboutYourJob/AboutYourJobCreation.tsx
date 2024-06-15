import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import MoneyTags from '../Money/MoneyTags';
import { Button, Modal, Portal, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const AboutYourJobCreation = () => {
    const router = useRouter()
    const [modal, setModal] = useState(false)
    const [selectedData, setSelectedData] = useState({
        value: 'sdfsdfsdfsdf',
    })

    return (
        <>
            <View style={{ marginTop: 50, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Job Description</Text>
            </View>

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
