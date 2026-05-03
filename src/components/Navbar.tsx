import { useRef } from "react";
import { Separator } from "@/components/ui/separator"
import { RotateCcw } from 'lucide-react';

interface NavbarProps {
  onUpdateSize: (w: number, h: number) => void;
  onReset: () => void;
}

const Navbar = ({ onUpdateSize, onReset }: NavbarProps) => {
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);

  const handleApply = () => {
    const w = Number(widthRef.current?.value);
    const h = Number(heightRef.current?.value);
    if (!isNaN(w) && !isNaN(h)) {
      onUpdateSize(w, h);
    }
  };

  const handleResetClick = () => {
    onReset();
    
    if (widthRef.current) widthRef.current.value = "780";
    if (heightRef.current) heightRef.current.value = "500";
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-background ml-4 mr-4">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        
        <div className="flex items-center gap-6">
          <span className="font-semibold text-foreground">Roomlie</span>

          <Separator orientation="vertical"  />

          <div className="flex items-center gap-4 text-chart-4">
            <span>Terem mérete:</span>

            <div className="flex items-center gap-2">
              <input
                ref={widthRef}
                type="number"
                className="w-20 rounded border px-2 py-1 text-chart-2"
                defaultValue="780"
              />
              <span>x</span>
              <input
                ref={heightRef}
                type="number"
                className="w-20 rounded border px-2 py-1 text-chart-2"
                defaultValue="500"
              />
            </div>
            
            <button 
              onClick={handleApply}
              className="rounded bg-chart-5 px-3 py-1 text-chart-2 hover:bg-foreground hover:text-background"
            >
              Alkalmaz
            </button>
          </div>
        </div>

        <button 
          onClick={handleResetClick}
          className="rounded bg-background px-3 py-1 text-chart-4 hover:bg-foreground hover:text-background flex items-center gap-1"
        >
          <RotateCcw />Alaphelyzetbe
        </button>

      </div>
    </header>
  );
};

export default Navbar;