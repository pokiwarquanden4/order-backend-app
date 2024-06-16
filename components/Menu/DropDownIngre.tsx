
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IDish, IIngredient } from '@/constants/types/MenuTypes';
import { Portal, Modal, TextInput, Button } from 'react-native-paper';

const DropDownIngre = ({ dishData, setDishData, ingredientList }: { dishData: IDish, setDishData: Dispatch<SetStateAction<IDish>>, ingredientList: IIngredient[] }) => {
    const [modal, setModal] = useState<boolean>(false)
    const [selectedIngre, setSelectedIngre] = useState<IIngredient>({
        name: '',
        type: true,
        number: 0,
    })

    const onDeleteIngre = useCallback((id: string) => {
        setDishData((preDishData) => {
            const newData = { ...preDishData }

            newData.ingredient = newData.ingredient.filter((ingre) => ingre._id !== id)

            return newData
        })
    }, [])

    const onUpdateIngre = useCallback((id: string, newNumber: number) => {
        setDishData((preDishData) => {
            const newData = { ...preDishData }

            const selectedIngre = newData.ingredient.find((ingre) => ingre._id === id)

            if (selectedIngre) selectedIngre.number = newNumber

            return newData
        })
        setModal(false)
    }, [])

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
                        value: data._id
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
                        const newIngredient = !preData.ingredient.find(data => data._id === item.value) && ingredientList.find((data) => {
                            return data._id === item.value
                        })

                        const newData = {
                            ...preData,
                            ingredient: !newIngredient ? preData.ingredient : [...preData.ingredient, { ...newIngredient, number: 0 } as IIngredient]
                        }

                        return newData
                    });
                }}
            />
            {
                dishData.ingredient.length
                    ?
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
                                        <Text style={{ marginRight: 10 }}>{item.type ? `${item.number}` : `${item.number}(g)`}</Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedIngre(item)
                                                setModal(true)
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: 10, color: 'green' }}></FontAwesomeIcon>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                onDeleteIngre(item._id || '')
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faDeleteLeft}
                                                style={{ color: 'red' }}
                                            ></FontAwesomeIcon>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                    :
                    undefined
            }

            <Portal>
                <Modal visible={modal} onDismiss={() => setModal(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    {/* <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Ingredient Forms</Text> */}

                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Number"
                        keyboardType='numeric'
                        value={String(selectedIngre.number)}
                        onChangeText={text => setSelectedIngre((preData) => {
                            const newData = {
                                ...preData,
                                number: Number(text),
                            }
                            return newData
                        })}
                    />

                    <Button mode='contained'
                        onPress={() => onUpdateIngre(selectedIngre._id as string, selectedIngre.number)}>
                        Finish
                    </Button>
                </Modal>
            </Portal>
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
