export interface Product {
    id: number,
    name: string,
    price: number,
    emoji: string,
}

export interface CartItem extends Product {
    quantity: number
}

export const products:Product[] = [
  { id: 1, name: 'Mechanical Keyboard', price: 29900, emoji: '⌨️' },
  { id: 2, name: 'Wireless Mouse', price: 12900, emoji: '🖱️' },
  { id: 3, name: 'USB-C Hub', price: 8900, emoji: '🔌' },
  { id: 4, name: 'Monitor Stand', price: 15900, emoji: '🖥️' },
  { id: 5, name: 'Webcam HD', price: 19900, emoji: '📷' },
  { id: 6, name: 'LED Desk Lamp', price: 6900, emoji: '💡' },
]
 