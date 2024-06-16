import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IIngredient } from '@/constants/types/MenuTypes';


const IngreTags = ({ data, onOpenEdit, onDelete }: { onDelete: (_id: string) => void, onOpenEdit: (data: IIngredient) => void, data: IIngredient }) => {
    return (
        <TouchableOpacity>
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
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold', fontSize: 17 }}>{data.name}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        style={{ paddingRight: 10 }}>
                        <FontAwesomeIcon icon={faPlus} style={{ color: 'green' }}></FontAwesomeIcon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onOpenEdit({
                                name: data.name,
                                type: data.type,
                                number: data.number,
                            })
                        }}
                        style={{ paddingRight: 10 }}>
                        <FontAwesomeIcon icon={faEdit} style={{ marginLeft: 10, color: 'red' }}></FontAwesomeIcon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onDelete(data._id || '')
                        }}
                        style={{ paddingRight: 10 }}>
                        <FontAwesomeIcon icon={faTrashCan} style={{ marginLeft: 10, color: 'red' }}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

})

export default IngreTags
