import { FC, ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
    data: any[]
    color?: string
    renderText(item: any): ReactNode
    style?: StyleProp<ViewStyle>
}

const BulletList: FC<Props> = ({ data, color='white', renderText, style }) => {
    return <View style={styles.container}>
        {data.map((item, index)=>{
            return <View style={styles.listItem} key={index} >
                <View style={[styles.bullet, {backgroundColor:color}]} />
                {renderText(item)}
            </View>
        })}
    </View>
}

const styles = StyleSheet.create({
    container: {},
    bullet:{
        width:6,
        height:6,
        borderRadius:3,
    },
    listItem:{
        flexDirection:'row',
        alignItems:'center',
        gap:8,
    }
})

export default BulletList
