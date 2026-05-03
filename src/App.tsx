import { useState } from "react";
import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import Inspector from "./components/Inspector";
import { tables as initialTables, type Table } from "./data/Table"; 
import Summary from "./components/Summary";

const DEFAULT_WIDTH = 780;
const DEFAULT_HEIGHT = 500;

export function App() {
  const [roomSize, setRoomSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [liveTables, setLiveTables] = useState<Table[]>(initialTables);
  const [activeTab, setActiveTab] = useState("new");

  const handleReset = () => {
    setRoomSize({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
    setLiveTables(initialTables);
  };

  const handleMoveTable = (id: number, x: number, y: number) => {
    setLiveTables((current) =>
      current.map((t) => (t.id === id ? { ...t, position: { x, y } } : t))
    );
  };

  const handleSelectTable = (id: number) => {
    setLiveTables(current => {
      const newTables = current.map(t => {
        if (t.id === id) {
          const newState = !t.is_selected;
          if (newState) setActiveTab("info");
          else setActiveTab("new");
          
          return { ...t, is_selected: newState };
        }
        return { ...t, is_selected: false };
      });
      return newTables;
    });
  };

  const handleUpdateTable = (updatedTable: Table) => {
  setLiveTables(current => 
    current.map(t => t.id === updatedTable.id ? updatedTable : t)
  );
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onUpdateSize={(w: number, h: number) => setRoomSize({ width: w, height: h })} 
        onReset={handleReset}
      />
      
      <main className="mx-auto px-4 py-8 h-[calc(100vh-4rem)]">
        <div className="mx-auto flex h-full px-4 gap-6">
          <div id="leftMain">
            <div id="tables">
              <Canvas 
                width={roomSize.width} 
                height={roomSize.height} 
                tables={liveTables}
                onMoveTable={handleMoveTable}
                onSelectTable={handleSelectTable}
              />
            </div>
            <div id="osszesito">
              <Summary 
                tables={liveTables}
              />
            </div>
          </div>
          <div id="rightMain" className="w-full h-full">
            <div id="inspector"> 
              <Inspector 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                selectedTable={liveTables.find(t => t.is_selected)} 
                onUpdateTable={handleUpdateTable}
                onCreateTable={(newTable) => setLiveTables(current => [...current, newTable])}
                onDeleteTable={(id) => setLiveTables(current => current.filter(t => t.id !== id))}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;