import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MoneyCreation from './MoneyCreation';
import { Button } from 'react-native-paper';
import UserTags from '../AboutYourJob/UserTags';
import { useRouter } from 'expo-router';

const CreateMoney = () => {
    const router = useRouter()
    const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined)

    const redirectMoneyCreation = useCallback((id: string) => {
        router.push('/MoneyCreationRoute/' + id)
    }, [])

    return (
        <>
            <View style={{ paddingHorizontal: 10, paddingTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create Payment</Text>
            </View>
            <ScrollView>
                <UserTags onPress={redirectMoneyCreation}></UserTags>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({

});

export default CreateMoney;
