import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';
export const genders = ["Male", 'Female', 'Others']

const JobDescriptions = () => {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <View style={styles.nameAndEdit}>
                    <Text style={styles.name}>Job Descriptions</Text>
                </View>
            </View>
            <View style={styles.details}>
                <Text>
                    sdfsdfsdfsdfsdffffffffffffffffffffffffffsdfsdfsdfsdfsdfsdfsdf
                    sdfsdfsdfsdfsdffffffffffffffffffffffffffsdfsdfsdfsdfsdfsdfsdfsdf
                    {"\n"}
                    {"\n"}
                    sdfsdfdsfsdf
                    sdfsdfsdfsdf
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 50,
        backgroundColor: '#f5f5f5', // Light background color
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10, // Add margin from the edge
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    nameAndEdit: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align edit button to the right
    },
    details: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 20,
    },
})

export default JobDescriptions
