import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Portal, TextInput } from 'react-native-paper';
import { IIngredient } from '@/constants/types/MenuTypes';
import { useRouter } from 'expo-router';
import { createIngre, deleteIngre, editIngre, getIngre } from './IngreAPI';
import IngreTags from './IngreTags';

const CreateIngre = () => {
    const router = useRouter()

    //List
    const [ingreList, setIngreList] = useState<IIngredient[]>([])

    //Data
    const [ingreData, setIngreData] = useState<IIngredient>({
        name: '',
        type: true,
        number: 0,
    })

    const [modalMenu, setModalMenu] = useState(false)

    const onIngreData = useCallback(async (ingre: IIngredient) => {
        if (!ingre._id) {
            const data = await createIngre(ingre)
            if (data) {
                setIngreList([...ingreList, { ...data.data.ingredient }])
            }
        } else {
            const data = await editIngre(ingre)
            if (data) {
                const newMenu = data.data.ingre as IIngredient
                const newIngreList = [...ingreList]

                newIngreList.forEach(ingre => {
                    if (ingre._id === newMenu._id) {
                        ingre.name = newMenu.name
                    }
                })

                setIngreList(newIngreList)
            }
        }

        setModalMenu(false)
        setIngreData({
            name: '',
            type: true,
            number: 0,
        })
    }, [ingreList])

    const onOpenEdit = useCallback((ingre: IIngredient) => {
        setIngreData(ingre)
        setModalMenu(true)
    }, [])

    const onDelete = useCallback(async (_id: string) => {
        const data = await deleteIngre(_id)

        if (data && data.status === 200) {
            const newData = ingreList.filter(ingre => ingre._id !== _id)

            setIngreList(newData)
        }
    }, [ingreList])

    useEffect(() => {
        const sync = async () => {
            const data = await getIngre()

            if (data) setIngreList(data.data.ingredient)
        }
        sync()
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
                        name: '',
                        type: true,
                        number: 0,
                    })
                }}>Add Menu</Button>
            </View>
            <ScrollView>
                {
                    ingreList.map((ingre) => {
                        return <IngreTags key={ingre._id} onDelete={onDelete} onOpenEdit={onOpenEdit} data={ingre}></IngreTags>
                    })
                }
            </ScrollView>
            <Portal>
                <Modal visible={modalMenu} onDismiss={() => setModalMenu(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Ingredient Forms</Text>

                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Name"
                        value={ingreData.name}
                        onChangeText={text => setIngreData((preData) => {
                            const newData = {
                                ...preData,
                                name: text,
                            }
                            return newData
                        })}
                    />

                    <Button mode='contained'
                        onPress={() => {
                            onIngreData(ingreData)
                        }}>
                        Finish
                    </Button>
                </Modal>
            </Portal>
        </>
    );
};

export default CreateIngre;
