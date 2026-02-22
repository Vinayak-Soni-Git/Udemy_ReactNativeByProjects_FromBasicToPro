import * as fs from '@dr.pogodin/react-native-fs'
import { Platform } from 'react-native'

export const saveImageToLocalDirectory = async (uri:string) => {

    let filePath = ''
    let uniqueFileName = `Pic_Editor_${Date.now()}.png`
    const androidLocalImageDir = `${fs.ExternalDirectoryPath}/Pictures `
    try{
        if(Platform.OS === 'ios'){
            const isDirExists = await fs.exists(fs.DocumentDirectoryPath)
            if(!isDirExists){
                await fs.mkdir(fs.DocumentDirectoryPath)
            }
            filePath = `${fs.DocumentDirectoryPath}/${uniqueFileName}}`
        }
        if(Platform.OS === 'android'){
            const isDirExists = await fs.exists(androidLocalImageDir)
            if(!isDirExists){
                await fs.mkdir(androidLocalImageDir)
            }
            filePath = `${androidLocalImageDir}/${uniqueFileName}`
        }
        await fs.copyFile(uri, filePath)
    }catch(error){

    }
}
