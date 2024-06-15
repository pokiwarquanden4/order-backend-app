import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const UserTags = ({ setSelectedUser }: { setSelectedUser: Dispatch<SetStateAction<string | undefined>> }) => {
    return (
        <TouchableOpacity onPress={() => setSelectedUser('true')}>
            <View style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Tran Minh Quang</Text>
                    </View>
                    <View>
                        <Text style={{}}>pokiwarquanden4</Text>
                    </View>
                </View>
                <View style={{ paddingRight: 10 }}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginLeft: 10, color: 'green' }}></FontAwesomeIcon>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

})

export default UserTags
