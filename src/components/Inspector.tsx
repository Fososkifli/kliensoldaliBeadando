import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Info, Trash2 } from "lucide-react";
import { capitalize, type Table } from "../data/Table";
import { Separator } from "./ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface InspectorProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  selectedTable?: Table;
  onUpdateTable: (updatedTable: Table) => void;
  onCreateTable: (newTable: Table) => void;
  onDeleteTable: (id: number) => void;
}

const Inspector = ({ activeTab, onTabChange, selectedTable, onUpdateTable, onCreateTable, onDeleteTable }: InspectorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Table | null>(null);

  const initialNewTable: Table = {
    id: 0,
    name: "Új asztal",
    type: "foosball",
    category: "normal",
    color: "green",
    status: 10,
    is_locked: false,
    is_selected: false,
    position: { x: 50, y: 50 }
  };

  const [newTableData, setNewTableData] = useState<Table>(initialNewTable);

  useEffect(() => {
    setIsEditing(false);
    if (selectedTable) {
      setFormData({ ...selectedTable });
    }
  }, [selectedTable]);

  const handleSave = () => {
    if (formData) {
      onUpdateTable(formData);
      setIsEditing(false);
    }
  };

  const handleCreate = () => {
    onCreateTable({ ...newTableData, id: Date.now() });
    setNewTableData(initialNewTable);
    onTabChange("info");
  };

  return (
    <div className="h-full w-full p-4 rounded shadow-inner">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full h-12 grid grid-cols-2 p-1">
          <TabsTrigger value="new" className="h-full gap-2">
            <Plus className="w-4 h-4" />
            Új asztal
          </TabsTrigger>
          <TabsTrigger 
            value="info" 
            className="h-full gap-2"
            disabled={!selectedTable}
          >
            <Info className="w-4 h-4" />
            Asztal adatai
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-6 p-4 rounded shadow-sm border space-y-4">
          <h2 className="font-bold mb-2">Asztal hozzáadása</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Név</Label>
              <Input 
                value={newTableData.name} 
                onChange={(e) => setNewTableData({...newTableData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Típus</Label>
              <Select value={newTableData.type} onValueChange={(val) => setNewTableData({...newTableData, type: val as any})}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="snooker">Snooker</SelectItem>
                  <SelectItem value="air-hockey">Air Hockey</SelectItem>
                  <SelectItem value="foosball">Csocsó</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Kategória</Label>
              <Select value={newTableData.category} onValueChange={(val) => setNewTableData({...newTableData, category: val as any})}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kids">Gyerek</SelectItem>
                  <SelectItem value="normal">Normál</SelectItem>
                  <SelectItem value="competition">Verseny</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Szín</Label>
              <Select value={newTableData.color} onValueChange={(val) => setNewTableData({...newTableData, color: val as any})}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">Piros</SelectItem>
                  <SelectItem value="green">Zöld</SelectItem>
                  <SelectItem value="blue">Kék</SelectItem>
                  <SelectItem value="yellow">Sárga</SelectItem>
                  <SelectItem value="white">Fehér</SelectItem>
                  <SelectItem value="brown">Barna</SelectItem>
                  <SelectItem value="purple">Lila</SelectItem>
                  <SelectItem value="black">Fekete</SelectItem>
                  <SelectItem value="grey">Szürke</SelectItem>
                  <SelectItem value="orange">Narancs</SelectItem>
                  <SelectItem value="magenta">Magenta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Állapot</Label>
                <span className="font-bold text-sm">{newTableData.status} / 10</span>
              </div>
              <Slider 
                value={[newTableData.status]} 
                onValueChange={(val) => setNewTableData({...newTableData, status: val[0]})} 
                min={1} 
                max={10} 
                step={1} 
              />
              <div className="flex justify-between text-chart-4 text-xs">
                <Label>Rossz</Label>
                <Label>Kiváló</Label>
              </div>
            </div>

            <Button onClick={handleCreate} className="w-full bg-chart-4 text-foreground hover:bg-chart-5">
              Asztal létrehozása
            </Button>
          </div>
        </TabsContent>
        
        {selectedTable && formData && (
          <TabsContent value="info" className="mt-6 p-4 rounded shadow-sm border">
            {!isEditing ? (
              <div id="adatok">
                <span className="font-bold">{selectedTable.name}</span>
                <Separator className="mt-2 mb-2"/>
                
                <div className="space-y-2">
                  <div className="flex justify-between mt-2">
                    <span className="text-chart-4">Típus</span>
                    <span>{capitalize(selectedTable.type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chart-4">Kategória</span>
                    <span>{capitalize(selectedTable.category)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chart-4">Szín</span>
                    <span>{capitalize(selectedTable.color)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-chart-4">Pozíció</span>
                    <span>{Math.round(selectedTable.position.x)}, {Math.round(selectedTable.position.y)}</span>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <span className="text-chart-4">Állapot</span>
                    <span>{selectedTable.status} / 10</span>
                  </div>
                  <Slider key={`view-${selectedTable.id}`} disabled value={[selectedTable.status]} max={10} step={1} className="mt-2 mb-2" />
                  <div className="flex justify-between text-chart-4 text-xs">
                    <Label>Rossz</Label>
                    <Label>Kiváló</Label>
                  </div>

                  <div className="mt-6 mb-2 flex gap-2 items-center">
                    <Checkbox disabled checked={selectedTable.is_locked} />
                    <Label>Rögzített</Label>
                    <span className="text-chart-4 text-xs">(nem mozgatható)</span>
                  </div>
                </div>

                <Separator className="mt-4 mb-4" />
                
                <div className="space-y-2">
                  <Button onClick={() => setIsEditing(true)} className="w-full bg-chart-5 text-foreground hover:bg-chart-5/90">
                    Asztal módosítása
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onDeleteTable(selectedTable.id)}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Asztal törlése
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Név</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="space-y-1.5">
                  <Label>Típus</Label>
                  <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val as any})}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="snooker">Snooker</SelectItem>
                      <SelectItem value="air-hockey">Air Hockey</SelectItem>
                      <SelectItem value="foosball">Csocsó</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Kategória</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val as any})}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kids">Gyerek</SelectItem>
                      <SelectItem value="normal">Normál</SelectItem>
                      <SelectItem value="competition">Verseny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Szín</Label>
                  <Select value={formData.color} onValueChange={(val) => setFormData({...formData, color: val as any})}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Piros</SelectItem>
                      <SelectItem value="green">Zöld</SelectItem>
                      <SelectItem value="blue">Kék</SelectItem>
                      <SelectItem value="yellow">Sárga</SelectItem>
                      <SelectItem value="white">Fehér</SelectItem>
                      <SelectItem value="brown">Barna</SelectItem>
                      <SelectItem value="purple">Lila</SelectItem>
                      <SelectItem value="black">Fekete</SelectItem>
                      <SelectItem value="grey">Szürke</SelectItem>
                      <SelectItem value="orange">Narancs</SelectItem>
                      <SelectItem value="magenta">Magenta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center"><Label>Állapot</Label><span className="font-bold text-sm">{formData.status} / 10</span></div>
                  <Slider value={[formData.status]} onValueChange={(val) => setFormData({...formData, status: val[0]})} min={1} max={10} step={1} />
                  <div className="flex justify-between text-chart-4 text-xs">
                    <Label>Rossz</Label>
                    <Label>Kiváló</Label>
                  </div>
                </div>

                <div className="flex gap-2 items-center pt-2">
                  <Checkbox id="edit-locked" checked={formData.is_locked} onCheckedChange={(val) => setFormData({...formData, is_locked: !!val})} />
                  <Label htmlFor="edit-locked">Rögzített</Label>
                </div>

                <div className="pt-4 space-y-2">
                  <Button onClick={handleSave} className="w-full bg-[#0f172a] text-white hover:bg-[#1e293b]">Mentés</Button>
                  <Button variant="ghost" onClick={() => setIsEditing(false)} className="w-full">Mégse</Button>
                </div>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Inspector;