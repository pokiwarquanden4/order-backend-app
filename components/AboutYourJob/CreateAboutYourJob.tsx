import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import UserTags from './UserTags';
import MoneyCreation from '../Money/MoneyCreation';
import { Button } from 'react-native-paper';
import AboutYourJobCreation from './AboutYourJobCreation';

const CreateAboutYourJob = ({ setPage }: { setPage: Dispatch<SetStateAction<string | undefined>> }) => {
    const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined)
    const [modal, setModal] = useState(false)

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    if (!selectedUser) {
                        setPage(undefined)
                    } else {
                        setSelectedUser(undefined)
                    }
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create Job Description</Text>
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
                        <AboutYourJobCreation modal={modal} setModal={setModal}></AboutYourJobCreation>
                    </View>
            }
        </>
    );
};

const styles = StyleSheet.create({

});

export default CreateAboutYourJob;
