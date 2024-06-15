
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IDish, IIngredient } from '@/constants/types/MenuTypes';

const DropDownIngre = ({ dishData, setDishData, ingredientList }: { dishData: IDish, setDishData: Dispatch<SetStateAction<IDish>>, ingredientList: IIngredient[] }) => {

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={ingredientList.map((data) => {
                    return {
                        label: data.name,
                        value: data.id
                    }
                })}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select item'}
                searchPlaceholder="Search..."
                value={''}
                onChange={item => {
                    setDishData((preData) => {
                        const newIngredient = !preData.ingredient.find(data => data.id === item.value) && ingredientList.find((data) => {
                            return data.id === item.value
                        })

                        const newData = {
                            ...preData,
                            ingredient: !newIngredient ? preData.ingredient : [...preData.ingredient, newIngredient as IIngredient]
                        }

                        return newData
                    });
                }}
            />
            <View style={{
                marginTop: 8,
                padding: 8,
                borderWidth: 2,
                borderColor: 'lightgrey',
                borderRadius: 10,
                borderStyle: 'solid',
            }}>
                {
                    dishData.ingredient.map((item) => {
                        return <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Text>{item.name}</Text>
                            <View
                                style={{ flexDirection: 'row', alignItems: 'center', }}
                            >
                                <Text style={{ marginRight: 10 }}>8(g)</Text>
                                <FontAwesomeIcon icon={faEdit} style={{ marginRight: 10, color: 'green' }}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faDeleteLeft} style={{ color: 'red' }}></FontAwesomeIcon>
                            </View>
                        </View>
                    })
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default DropDownIngre
