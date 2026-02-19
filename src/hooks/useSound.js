import Sound from 'react-native-sound'

Sound.setCategory('Playback')

let clickSound = null

export default function useClickSound(fileName) {
    if (!clickSound) {
        clickSound = new Sound(fileName, Sound.MAIN_BUNDLE, error => {
            if (error) {
                console.log('Failed to load sound', error)
            }
        })
    }

    return () => {
        if (clickSound) {
            clickSound.stop(() => {
                clickSound.play()
            })
        }
    }
}
