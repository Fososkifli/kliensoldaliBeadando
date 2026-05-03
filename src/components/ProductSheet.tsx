import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/context/CartContext"

const ProductSheet = () => {
      const { cartItems } = useCart();
    
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <ShoppingCart />
          Kosár ({cartItems.length})
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Kosár összesítő</SheetTitle>
          <SheetDescription>
            Itt találod a kosárba rakott elemeket.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {cartItems.map((p, index) => {
            return (
              <div
                key={"product-total-" + index}
                className="flex w-full items-center justify-between gap-4"
              >
                <h4 className="text-lg">{p.name}</h4>
                <p className="font-bold">{p.price} Ft</p>
              </div>
            )
          })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Kosár bezárása</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ProductSheet
