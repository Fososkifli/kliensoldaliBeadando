import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import { products, type Product } from "../data/products"

interface CartContextType {
  cartItems: Product[]
  addToCart: (id: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  function addToCart(id: number): void {
    const product = products.find((x) => x.id === id)
    if (!product) return

    setCartItems((state) => [...state, product])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart csak CartProvideren belül használható")
  }

  return context
}
