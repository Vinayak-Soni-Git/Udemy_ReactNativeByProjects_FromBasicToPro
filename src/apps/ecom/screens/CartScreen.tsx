import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props{

}

const CartScreen:FC<Props> = () =>{
    return <View style={styles.container} >
        <Text>CartScreen</Text>
    </View>
}

const styles = StyleSheet.create({
    container:{

    }
})

export default CartScreen
