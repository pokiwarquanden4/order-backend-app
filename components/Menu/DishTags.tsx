import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IDish } from '@/constants/types/MenuTypes';


const DishTags = ({ onClickDish, data }: { data: IDish, onClickDish: (dish: IDish) => void }) => {
    return (
        <TouchableOpacity
            onPress={() => onClickDish(data)}
        >
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
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{data.name}</Text>
                    </View>
                    <View>
                        <Text style={{}}>{data.description}</Text>
                    </View>
                </View>
                <View style={{ paddingRight: 10 }}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginLeft: 10, color: 'green' }}></FontAwesomeIcon>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

})

export default DishTags
