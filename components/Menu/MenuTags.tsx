import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IMenu } from '@/constants/types/MenuTypes';


const MenuTags = ({ setModalMenu, onPress, selectedMenu, setMenuData }: { setModalMenu: Dispatch<SetStateAction<boolean>>, setMenuData: Dispatch<SetStateAction<IMenu>>, selectedMenu: IMenu | undefined, onPress: (id: string) => void }) => {
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
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Chicken</Text>
                    </View>
                    <View>
                        <Text style={{}}>Com ga xao nam chien gion</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        onPress={() => onPress('id')}
                        style={{ paddingRight: 10 }}>
                        <FontAwesomeIcon icon={faPlus} style={{ color: 'green' }}></FontAwesomeIcon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setModalMenu(true)
                            setMenuData({
                                id: 'dsfsdf',
                                name: selectedMenu ? selectedMenu?.name : '',
                            })
                        }
                        }
                        style={{ paddingRight: 10 }}>
                        <FontAwesomeIcon icon={faEdit} style={{ marginLeft: 10, color: 'red' }}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

})

export default MenuTags
