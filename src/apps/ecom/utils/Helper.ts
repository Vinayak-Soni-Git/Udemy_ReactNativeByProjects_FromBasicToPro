export const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    })
    return formatter.format(price)
}
