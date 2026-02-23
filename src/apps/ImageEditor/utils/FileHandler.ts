import * as fs from '@dr.pogodin/react-native-fs'
import { Platform } from 'react-native'

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
