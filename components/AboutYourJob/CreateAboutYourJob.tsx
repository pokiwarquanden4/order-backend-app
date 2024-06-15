import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import UserTags from './UserTags';
import MoneyCreation from '../Money/MoneyCreation';
import { Button } from 'react-native-paper';
import AboutYourJobCreation from './AboutYourJobCreation';
import { useRouter } from 'expo-router';

const CreateAboutYourJob = () => {
    const router = useRouter()

    const redirectScheduleCreation = useCallback((id: string) => {
        router.push('/AboutYourJobCreationRoute/' + id)
    }, [])

    return (
        <>
            <View style={{ marginTop: 50, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create Job Description</Text>
            </View>
            <ScrollView>
                <UserTags onPress={redirectScheduleCreation}></UserTags>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({

});

export default CreateAboutYourJob;
