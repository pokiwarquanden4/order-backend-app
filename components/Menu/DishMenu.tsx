import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import UserTags from '../AboutYourJob/UserTags';
import { Button } from 'react-native-paper';

const DishMenu = () => {
    const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined)
    const [modal, setModal] = useState(false)

    return (
        <>
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
                        {/* <MoneyCreation modal={modal} setModal={setModal}></MoneyCreation> */}
                    </View>
            }
        </>
    );
};

const styles = StyleSheet.create({

});

export default DishMenu;
