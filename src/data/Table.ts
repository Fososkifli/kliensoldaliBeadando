import tablesJson from "./tables.json";

export type TableType = "foosball" | "snooker" | "air-hockey";

export type Category = "kids" | "normal" | "competition";

export interface Table {
    id: number;
    type: TableType;
    name: string;
    category: Category;
    color: string;
    status: number;
    position: { x: number; y: number };
    is_locked: boolean;
    is_selected: boolean;
}

export const tables = tablesJson as Table[];

export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

tables.map(t => {
    t.name = capitalize(t.type.replace('-', ' '));
});