import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const MoneyTags = ({ flag }: { flag: Boolean }) => {
    return (
        <>
            <View style={{
                backgroundColor: !flag ? '#F7CAC9' : '#C2F0C2', // Beautiful light green
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginBottom: 10
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>12/3/2024:00:001</Text>
                    <Text style={{ marginLeft: 15, color: 'green', fontWeight: 'bold' }}>+100.000</Text>
                </View>
                <Text>Tien thuong OT vao ngay hom nay</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({

})

export default MoneyTags
