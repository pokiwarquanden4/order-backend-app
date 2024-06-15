import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MoneyTags from './MoneyTags';
import { useRouter } from 'expo-router';


const Money = () => {
    const router = useRouter()

    return (
        <View style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 10, flexDirection: 'column', justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Money</Text>
            </View>
            <ScrollView>
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
        </View>
    );
};

const styles = StyleSheet.create({

})

export default Money
