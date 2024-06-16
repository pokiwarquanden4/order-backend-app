import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { faArrowLeft, faCamera, faEdit, faImage } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Button, Checkbox, Modal, Portal, TextInput } from 'react-native-paper';
import MenuTags from './MenuTags';
import DishTags from './DishTags';
import { IDish, IMenu } from '@/constants/types/MenuTypes';
import { useRouter } from 'expo-router';
import { createMenu, deleteMenu, editMenu, getMenu } from './MenuAPI';

const CreateMenu = () => {
    const router = useRouter()

    //List
    const [menuList, setMenuList] = useState<IMenu[]>([])

    //Data
    const [menuData, setMenuData] = useState<IMenu>({
        name: ''
    })

    const [modalMenu, setModalMenu] = useState(false)

    const onMenuData = useCallback(async (menu: IMenu) => {
        if (!menu._id) {
            const data = await createMenu(menu)
            if (data) {
                setMenuList([...menuList, { ...data.data.menu }])
            }
        } else {
            const data = await editMenu(menu)
            if (data) {
                const newMenu = data.data.menu as IMenu
                const newMenuList = [...menuList]

                newMenuList.forEach(menu => {
                    if (menu._id === newMenu._id) {
                        menu.name = newMenu.name
                    }
                })

                setMenuList(newMenuList)
            }
        }

        setModalMenu(false)
        setMenuData({
            name: ''
        })
    }, [menuList])

    const onOpenEdit = useCallback((menu: IMenu) => {
        setMenuData({
            name: ''
        })
        setModalMenu(true)
    }, [])

    const onDeleteMenu = useCallback(async (_id: string) => {
        const data = await deleteMenu(_id)

        if (data && data.status === 200) {
            const newData = menuList.filter(menu => menu._id !== _id)

            setMenuList(newData)
        }
    }, [menuList])

    useEffect(() => {
        const sync = async () => {
            const data = await getMenu()

            if (data) setMenuList(data.data.menu)
        }
        sync()
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
                <Button icon='plus' mode='outlined' onPress={() => {
                    onOpenEdit({
                        name: ''
                    })
                }}>Add Menu</Button>
            </View>
            <ScrollView>
                {
                    menuList.map((menu) => {
                        return <MenuTags key={menu._id} onDeleteMenu={onDeleteMenu} onOpenEdit={onOpenEdit} data={menu} onPress={redirectDishCreation}></MenuTags>
                    })
                }
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

                    <Button mode='contained'
                        onPress={() => {
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
