import * as fs from '@dr.pogodin/react-native-fs'
import { Platform } from 'react-native'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'

const androidLocalImageDir = `${fs.ExternalDirectoryPath}/Pictures`
export const saveImageToLocalDirectory = async (uri: string) => {
    let filePath = ''
    let uniqueFileName = `Pic_Editor_${Date.now()}.png`
    try {
        if (Platform.OS === 'ios') {
            const isDirExists = await fs.exists(fs.DocumentDirectoryPath)
            if (!isDirExists) {
                await fs.mkdir(fs.DocumentDirectoryPath)
            }
            filePath = `${fs.DocumentDirectoryPath}/${uniqueFileName}}`
        }
        if (Platform.OS === 'android') {
            const isDirExists = await fs.exists(androidLocalImageDir)
            if (!isDirExists) {
                await fs.mkdir(androidLocalImageDir)
            }
            filePath = `${androidLocalImageDir}/${uniqueFileName}`
        }
        await fs.copyFile(uri, filePath)
    } catch (error) {
        console.log(error)
    }
}

export type LocalImage = {
    name: string
    path: string
    size: number
}

export const getLocalImages = async (): Promise<LocalImage[]> => {
    const dirPath =
        Platform.OS === 'ios' ? fs.DocumentDirectoryPath : androidLocalImageDir
    const isDirExists = await fs.exists(dirPath)
    if (!isDirExists) {
        return []
    }
    const resource = await fs.readDir(dirPath)
    return resource.map(({ name, path, size }) => {
        return {
            name,
            path: path.startsWith('file://') ? path : `file://${path}`,
            size,
        }
    })
}

export const removeFile = async (path: string) => {
    try {
        await fs.unlink(path)
    } catch (error) {
        console.log('Error removing file', error)
    }
}
const saveBase64ImageToAndroidDevice = async (base64Data: string) => {
    const uniqueFileName = `PicEditor-${Date.now()}.jpg`
    // let filePath = `${fs.PicturesDirectoryPath}/${uniqueFileName}`
    let filePath = `${fs.CachesDirectoryPath}/${uniqueFileName}`
    if (!filePath.startsWith('file:')) {
        filePath = `file://${filePath}`
    }
    await fs.writeFile(filePath, base64Data, 'base64')
    await CameraRoll.saveAsset(filePath, { type: 'photo' })
    await fs.unlink(filePath)
}

const saveBase64ImageToIosDevice = async (base64Data: string) => {
    const uniqueFileName = `PicEditor-${Date.now()}.jpg`
    let filePath = `${fs.CachesDirectoryPath}/${uniqueFileName}`
    await fs.writeFile(filePath, base64Data, 'base64')
    if(!await fs.exists(filePath)) return console.log("File doesn't exists")
    if (!filePath.startsWith('file:')) {
        filePath = `file://${filePath}`
    }
    await CameraRoll.saveAsset(filePath, {type:'photo'})
    await fs.unlink(filePath)
}

export const saveBase64ImageToDevice = (content: string) => {
    const base64Data = content.replace(/^data:image\/\w+;base64,/, '')
    if (Platform.OS === 'android') {
        saveBase64ImageToAndroidDevice(base64Data)
    }
    if (Platform.OS === 'ios') {
        saveBase64ImageToIosDevice(base64Data)
    }
}
