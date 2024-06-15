import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Button, DataTable, Divider, Menu, Modal, Portal } from 'react-native-paper';

export type StatusVal = "Pending" | "Progress" | "Completed" | "Cancelled"

export interface CellData {
    id: number;
    name: string;
    quantity: number;
    table: number;
    note?: string;
    status: "Pending" | "Progress" | "Completed" | "Cancelled";
}

export const statusList = ["Pending", "Progress", "Completed", "Cancelled"]

const TableCell = ({ data, setData }: { data: CellData, setData: Dispatch<SetStateAction<CellData[]>> }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [nameModalVisible, setNameModalVisible] = React.useState(false)
    const [option, setOption] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = React.useState<StatusVal>(data.status);

    useEffect(() => {
        setData((pre) => {
            const newData = pre.map((item) => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        status: selectedStatus
                    }
                }
                return item
            })
            return newData
        })
    }, [selectedStatus])

    return (
        <View>
            <DataTable.Row key={data.id}>
                <DataTable.Cell onPress={() => setNameModalVisible(true)}>{data.name}</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center' }}>{data.quantity}</DataTable.Cell>
                <DataTable.Cell>
                    <EvilIcons name='comment' onPress={() => {
                        setIsModalVisible(true)
                    }} size={32} color='#ff0000'></EvilIcons>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center' }}>{data.table}</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center' }}>
                    <Menu
                        visible={option}
                        onDismiss={() => setOption(false)}
                        anchor={<Button style={{ width: 100 }} onPress={() => setOption(true)}>{selectedStatus}</Button>}>
                        {statusList.map((item: string) => {
                            return <Menu.Item onPress={() => {
                                setOption(false)
                                setSelectedStatus(item as StatusVal)
                            }} title={item} />
                        })}
                    </Menu>
                </DataTable.Cell>
            </DataTable.Row>
            <Portal>
                <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <View>
                        <Text>{data.note}</Text>
                    </View>
                </Modal>
            </Portal>
            <Portal>
                <Modal visible={nameModalVisible} onDismiss={() => setNameModalVisible(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <View>
                        <Text>{data.name}</Text>
                    </View>
                </Modal>
            </Portal>

        </View>
    )
}

const styles = StyleSheet.create({
})

export default TableCell