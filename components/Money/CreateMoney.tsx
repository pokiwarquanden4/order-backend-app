import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MoneyCreation from './MoneyCreation';
import { Button } from 'react-native-paper';
import UserTags from '../AboutYourJob/UserTags';
import { useRouter } from 'expo-router';

const CreateMoney = () => {
    const router = useRouter()
    const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined)
    const [modal, setModal] = useState(false)

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                {!selectedUser
                    ?
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create Payment</Text>
                    :
                    <Button icon='plus' mode='outlined' onPress={() => setModal(true)}>Add Payment</Button>
                }
            </View>
            {
                !selectedUser
                    ?
                    <ScrollView style={{ height: 480 }}>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                        <UserTags setSelectedUser={setSelectedUser}></UserTags>
                    </ScrollView>
                    :
                    <View>
                        <MoneyCreation modal={modal} setModal={setModal}></MoneyCreation>
                    </View>
            }
        </>
    );
};

const styles = StyleSheet.create({

});

export default CreateMoney;
