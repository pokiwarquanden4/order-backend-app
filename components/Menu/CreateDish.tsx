import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCamera, faEdit, faImage } from '@fortawesome/free-solid-svg-icons'
import { Avatar, Button, Checkbox, Modal, Portal, TextInput } from 'react-native-paper'
import DishTags from './DishTags'
import { IDish, IIngredient } from '@/constants/types/MenuTypes'
import * as ImagePicker from 'expo-image-picker'
import DropDownIngre from './DropDownIngre'
import { getDishes } from './MenuAPI'

export default function CreateDish() {
    const router = useRouter()
    const { CreateDishRoute } = useLocalSearchParams()
    const [dishList, setDishList] = useState<IDish[]>([])
    const [modalDish, setModalDish] = useState(false)
    const [uploadImgModal, setUploadImgModal] = useState(false)
    const [ingredientList, setIngredientList] = useState<IIngredient[]>([
        {
            _id: '1',
            name: 'Tomato',
            type: true,
            number: 5,
        },
        {
            _id: '2',
            name: 'Chicken Breast',
            type: false,
            number: 2,
        },
        {
            _id: '3',
            name: 'Olive Oil',
            type: false,
            number: 1,
        },
        {
            _id: '4',
            name: 'Basil',
            type: true,
            number: 10,
        },
        {
            _id: '5',
            name: 'Garlic',
            type: true,
            number: 3,
        }
    ])

    const [dishData, setDishData] = useState<IDish>({
        id: '',
        name: '',
        menu: '',
        imgUrl: '',
        ingredient: [],
        ingredientConsumer: [],
        recommend: false,
        description: '',
        price: 0,
    })

    const uploadImage = async (mode: string) => {
        try {
            let result

            switch (mode) {
                case 'gallery':
                    await ImagePicker.requestCameraPermissionsAsync()
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    })
                    break
                default:
                    await ImagePicker.requestCameraPermissionsAsync()

                    result = await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    })
                    break
            }

            if (result && !result.canceled) {
                await saveImg(result.assets[0].uri)
                setUploadImgModal(false)
            }
        } catch {

        }
    }

    const saveImg = async (image: any) => {
        try {
            setDishData(preData => {
                const newData = {
                    ...preData,
                    imgUrl: image
                }
                return newData
            })
        } catch {

        }
    }

    useEffect(() => {
        const async = async () => {
            const data = await getDishes(CreateDishRoute as string)
            data && setDishList(data.data.dishes)
        }

        async()
    }, [])

    const onOpenDishModal = useCallback((dish: IDish) => {
        setDishData(dish)
        setModalDish(true)
    }, [])

    return (
        <>
            <View style={{ paddingTop: 50, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    router.back()
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="red" />
                </TouchableOpacity>
                <Button icon='plus' mode='outlined' onPress={() =>
                    onOpenDishModal({
                        id: '',
                        name: '',
                        menu: '',
                        imgUrl: '',
                        ingredient: [],
                        ingredientConsumer: [],
                        recommend: false,
                        description: '',
                        price: 0,
                    })}>Add Dish</Button>
            </View>
            <ScrollView>
                {dishList.map((dish) => {
                    return <DishTags data={dish} onClickDish={onOpenDishModal}></DishTags>
                })}
            </ScrollView>

            <Portal>
                <Modal
                    visible={modalDish} onDismiss={() => setModalDish(false)}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        padding: 20,
                        maxHeight: '80%',
                    }}
                >
                    <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Dish Forms</Text>
                    <ScrollView>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20
                        }}>
                            <View style={{
                                position: 'relative',
                            }}>
                                <Avatar.Image size={150} source={{ uri: dishData.imgUrl || "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/lentkdau/mauthietkenhahangdep/2.jpg" }} />
                                <TouchableOpacity
                                    onPress={() => setUploadImgModal(true)}
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: '#fff',
                                        borderRadius: 20,
                                        height: 40,
                                        width: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 2,
                                        elevation: 5,
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TextInput
                            style={{ marginBottom: 10 }}
                            label="Name"
                            value={dishData.name}
                            onChangeText={text => setDishData((preData) => {
                                const newData = {
                                    ...preData,
                                    name: text,
                                }
                                return newData
                            })}
                        />

                        <TextInput
                            style={{ marginBottom: 10 }}
                            label="Price"
                            keyboardType='numeric'
                            value={String(dishData.price)}
                            onChangeText={text => setDishData((preData) => {
                                const newData = {
                                    ...preData,
                                    price: Number(text),
                                }
                                return newData
                            })}
                        />

                        <TextInput
                            style={{ marginBottom: 10 }}
                            label="Description"
                            value={dishData.description}
                            onChangeText={text => setDishData((preData) => {
                                const newData = {
                                    ...preData,
                                    description: text,
                                }
                                return newData
                            })}
                        />

                        <DropDownIngre
                            dishData={dishData}
                            ingredientList={ingredientList}
                            setDishData={setDishData}
                        ></DropDownIngre>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
                            <Text>Recommend: </Text>
                            <Checkbox
                                status={dishData.recommend ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setDishData(preData => {
                                        const newData = {
                                            ...preData,
                                            recommend: !preData.recommend
                                        }
                                        return newData
                                    })
                                }}
                            />
                        </View>
                    </ScrollView>

                    <Button mode='contained' onPress={() => setModalDish(false)}>
                        Finish
                    </Button>
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={uploadImgModal} onDismiss={() => setUploadImgModal(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => uploadImage('gallery')}
                            style={{
                                marginRight: 40,
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                height: 100,
                                width: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                            }}>
                            <FontAwesomeIcon icon={faImage} size={40}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => uploadImage('camera')}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                height: 100,
                                width: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                            }}>
                            <FontAwesomeIcon icon={faCamera} size={40}></FontAwesomeIcon>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
        </>
    )
}