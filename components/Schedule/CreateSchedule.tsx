import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ScheduleCreation from './ScheduleCreation'
import UserTags from '../AboutYourJob/UserTags';
import { useRouter } from 'expo-router';

const CreateSchedule = () => {
    const router = useRouter()
    const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined)

    const redirectScheduleCreation = useCallback((id: string) => {
        router.push('/ScheduleCreationRoute/' + id)
    }, [])

    return (
        <View style={{ marginTop: 50 }}>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create Schedule</Text>
            </View>
            <ScrollView style={{ marginBottom: 50 }}>
                <UserTags onPress={redirectScheduleCreation}></UserTags>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CreateSchedule;
