import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Portal, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter } from 'expo-router';

export const genders = ["Male", 'Female', 'Others']

const ProfilePage = () => {
    const router = useRouter()
    const [saveAlertModal, setSaveAlertModal] = useState<boolean>(false)
    const isChanged = useRef<boolean>(false)

    const [modal, setModal] = useState<boolean>(false)
    const [user, setUser] = useState({
        account: 'johndoe123',
        phoneNumber: '+1234567890',
        email: 'johndoe@example.com',
        address: '123 Main Street, Anytown, CA 12345',
        name: 'John Doe',
        gender: 'Male', // Or 'Female', 'Non-binary', etc.
    })

    const updateUser = useCallback((value: string, role: string) => {
        isChanged.current = true

        switch (role) {
            case 'account':
                setUser(user => {
                    return {
                        ...user,
                        account: value
                    }
                })
                break
            case 'phoneNumber':
                setUser(user => {
                    return {
                        ...user,
                        phoneNumber: value
                    }
                })
                break
            case 'email':
                setUser(user => {
                    return {
                        ...user,
                        email: value
                    }
                })
                break
            case 'address':
                setUser(user => {
                    return {
                        ...user,
                        address: value
                    }
                })
                break
            case 'name':
                setUser(user => {
                    return {
                        ...user,
                        name: value
                    }
                })
                break
            case 'gender':
                setUser(user => {
                    return {
                        ...user,
                        gender: value
                    }
                })
                break
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <View style={styles.nameAndEdit}>
                    <Text style={styles.name}>{user.name}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => setModal(true)}>
                        <FontAwesomeIcon icon={faEdit} size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.details}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Account</Text>
                    <Text style={styles.detailInfo}>{user.account}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Phone Number</Text>
                    <Text style={styles.detailInfo}>{user.phoneNumber}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Email</Text>
                    <Text style={styles.detailInfo}>{user.email}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Address</Text>
                    <Text style={styles.detailInfo}>{user.address}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Gender</Text>
                    <Text style={styles.detailInfo}>{user.gender}</Text>
                </View>
            </View>
            <Portal>
                <Modal visible={modal} onDismiss={() => setModal(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Edit Your Information</Text>
                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Account"
                        value={user.account}
                        onChangeText={text => updateUser(text, 'account')}
                    />
                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Phone Number"
                        value={user.phoneNumber}
                        onChangeText={text => updateUser(text, 'phoneNumber')}
                    />
                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Email"
                        value={user.email}
                        onChangeText={text => updateUser(text, 'email')}
                    />
                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Address"
                        value={user.address}
                        onChangeText={text => updateUser(text, 'address')}
                    />
                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Name"
                        value={user.name}
                        onChangeText={text => updateUser(text, 'name')}
                    />
                    <RNPickerSelect
                        value={user.gender}
                        onValueChange={(value) => updateUser(value, 'gender')}
                        items={[
                            { label: genders[0], value: genders[0] },
                            { label: genders[1], value: genders[1] },
                            { label: genders[2], value: genders[2] },
                        ]}
                    />

                    <Button mode='contained' onPress={() => setModal(false)}>
                        Finish
                    </Button>
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={saveAlertModal} onDismiss={() => setSaveAlertModal(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <View >
                        <Text style={styles.saveFonts}>Are you want to save?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Button style={{ marginRight: 40 }} mode='outlined'
                            // onPress={() => setPage(undefined)}
                            >Cancel</Button>
                            <Button mode='contained'
                            // onPress={() => setPage(undefined)}
                            >Confirm</Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        padding: 20,
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
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
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
    editButton: {
        backgroundColor: '#3498db', // Edit button color
        padding: 5,
        borderRadius: 5,
        marginLeft: 10, // Add some margin from name
    },
    details: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 20,
    },
    detailRow: {
        marginBottom: 20,
    },
    detailLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 100, // Space
    },
    detailInfo: {
        fontSize: 15,
    },
    saveFonts: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20
    }
})

export default ProfilePage
