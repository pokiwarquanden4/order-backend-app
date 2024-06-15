import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { faArrowLeft, faCamera, faEdit, faImage } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Button, Checkbox, Modal, Portal, TextInput } from 'react-native-paper';
import MenuTags from './MenuTags';
import DishTags from './DishTags';
import { IDish, IMenu } from '@/constants/types/MenuTypes';
import { useRouter } from 'expo-router';
import { createMenu } from './MenuAPI';
import axios from 'axios';

const CreateMenu = () => {
    const router = useRouter()
    const [selectedMenu, setSelectedMenu] = useState<IMenu | undefined>(undefined)

    //List
    const [menuList, setMenuList] = useState<IMenu[]>([])
    const [dishList, setDishList] = useState<IDish[]>([])

    //Data
    const [menuData, setMenuData] = useState<IMenu>({
        name: ''
    })

    const [modalMenu, setModalMenu] = useState(false)

    useEffect(() => {
        axios.get('/').then((r) => {
            console.log(r)
        })
    }, [])

    const onMenuData = useCallback(async (menu: IMenu) => {
        if (!menu.id) {
            const data = await createMenu(menu)

            console.log(data)

            setModalMenu(false)
            setMenuData({
                name: ''
            })
        }
    }, [])

    const redirectDishCreation = useCallback((id: string) => {
        router.push('/CreateDishRoute/' + id)
    }, [])

    return (
        <>
            <View style={{ paddingTop: 50, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Button icon='plus' mode='outlined' onPress={() => setModalMenu(true)}>Add Menu</Button>
            </View>
            <ScrollView style={{ height: 480 }}>
                <MenuTags setModalMenu={setModalMenu} setMenuData={setMenuData} selectedMenu={selectedMenu} onPress={redirectDishCreation}></MenuTags>
            </ScrollView>
            <Portal>
                <Modal visible={modalMenu} onDismiss={() => setModalMenu(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Menu Forms</Text>

                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Name"
                        value={menuData.name}
                        onChangeText={text => setMenuData((preData) => {
                            const newData = {
                                ...preData,
                                name: text,
                            }
                            return newData
                        })}
                    />

                    <Button mode='contained' onPress={() => {
                        onMenuData(menuData)
                    }}>
                        Finish
                    </Button>
                </Modal>
            </Portal>
        </>
    );
};

export default CreateMenu;
