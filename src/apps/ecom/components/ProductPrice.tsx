import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    mrp?: string
    sale?: string
}

const ProductPrice: FC<Props> = ({mrp, sale}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.priceLabel}>Price: </Text>
            <Text style={styles.mrp}>{mrp}</Text>
            <Text style={styles.salePrice}>
                {sale}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 20,
    },
    priceLabel: {
        fontSize: 20,
    },
    mrp: {
        fontStyle: 'italic',
        textDecorationLine: 'line-through',
        fontSize: 20,
    },
    salePrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default ProductPrice
