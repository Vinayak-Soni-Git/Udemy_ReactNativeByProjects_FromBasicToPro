import { useState } from 'react'
import { View, StyleSheet, Dimensions, Text, Platform } from 'react-native'
import CalculatorButton from './components/CalculatorButton'

const { width } = Dimensions.get('screen')
const btnRatio = 4
const btnGap = 5
const horizontalPadding = 5
const btnWidth = (width - btnGap * btnRatio) / btnRatio - horizontalPadding

const buttons = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '.']

const evaluateExpression = (nums: string[]) => {
    const stack: number[] = []
    let currentNumber = 0
    let currentOperator = '+'

    for (let i = 0; i <= nums.length; i++) {
        const char = nums[i]
        if (!isNaN(Number(char))) {
            currentNumber = parseFloat(char)
        }
        if (isNaN(Number(char)) || i === nums.length) {
            switch (currentOperator) {
                case '+':
                    stack.push(currentNumber)
                    break
                case '-':
                    stack.push(-currentNumber)
                    break
                case '*':
                    const multiplication = (stack.pop() || 1) * currentNumber
                    stack.push(multiplication)
                    break
                case '/':
                    const division = (stack.pop() || 1) / currentNumber
                    stack.push(division)
                    break
            }
            currentOperator = char
            currentNumber = 0
        }
    }
    return stack.reduce((acc, currentValue) => acc + currentValue, 0)
}

export default function CalculatorApp() {
    const [currentNumbers, setCurrentNumbers] = useState<string[]>([])
    const [finalResult, setFinalResult] = useState(0)

    const handleButtonPress = (value: string) => {
        const lastItem = currentNumbers[currentNumbers.length - 1] || ''
        const operators = ['+', '-', '/', '*']
        if (operators.includes(lastItem) && operators.includes(value)) {
            currentNumbers.pop()
            setCurrentNumbers([...currentNumbers, value])
        }

        if (lastItem.endsWith('.') && operators.includes(value)) {
            setCurrentNumbers([...currentNumbers.slice(0, -1), lastItem+'0', value])
        }

        if (value === '.') {
            if (lastItem && lastItem.includes('.')) {
                return
            }
            if (!lastItem || isNaN(Number(lastItem))) {
                setCurrentNumbers([...currentNumbers, '0.'])
                return
            }
            setCurrentNumbers([...currentNumbers.slice(0, -1), lastItem + '.'])
            return
        }
        if (!isNaN(Number(value))) {
            if (lastItem && !isNaN(Number(lastItem))) {
                setCurrentNumbers([
                    ...currentNumbers.slice(0, -1),
                    lastItem + value,
                ])
            } else {
                setCurrentNumbers([...currentNumbers, value])
            }
        } else {
            setCurrentNumbers([...currentNumbers, value])
        }
    }

    const handleDelButtonPress = () => {
        const oldItems = [...currentNumbers]
        oldItems.pop()
        setCurrentNumbers([...oldItems])
    }

    const resetCalculation = () => {
        setCurrentNumbers([])
    }

    return (
        <View style={styles.container}>
            <View style={styles.resultsContainer}>
                <Text style={styles.result}>{finalResult}</Text>
                <Text style={styles.calculation}>
                    {currentNumbers.join('')}
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <CalculatorButton
                    title={'AC'}
                    onPress={resetCalculation}
                    style={styles.calculatorButton}
                />
                <CalculatorButton
                    title={'*'}
                    onPress={() => handleButtonPress('*')}
                    style={styles.calculatorButton}
                />
                <CalculatorButton
                    title={'/'}
                    onPress={() => handleButtonPress('/')}
                    style={styles.calculatorButton}
                />
                <CalculatorButton
                    title={'DEL'}
                    onPress={handleDelButtonPress}
                    style={styles.calculatorButton}
                />

                {buttons.map(btn => {
                    return (
                        <CalculatorButton
                            key={btn}
                            onPress={() => handleButtonPress(btn)}
                            title={btn}
                            style={styles.calculatorButton}
                        />
                    )
                })}
                <CalculatorButton
                    title={'0'}
                    style={[styles.calculatorButton, styles.zero]}
                />
                <CalculatorButton
                    title={'='}
                    onPress={() => {
                        const result = evaluateExpression(currentNumbers)
                        setFinalResult(result)
                    }}
                    style={styles.calculatorButton}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        paddingBottom: 40,
    },
    resultsContainer: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 10,
    },
    buttonsContainer: {
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: btnGap,
        paddingHorizontal: horizontalPadding,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'flex-end',
        paddingBottom: 1,
    },
    calculatorButton: {
        width: btnWidth,
        height: 80,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 7,
    },
    zero: {
        width: btnWidth * 3 + horizontalPadding + btnGap,
    },
    result: {
        fontWeight: '700',
        fontFamily:'Orbitron-ExtraBold',
        fontSize: 35,
        color: 'black',
    },
    calculation: {
        fontWeight: '700',
        fontSize: 30,
        color: 'black',
        opacity: 0.5,
    },
})
