export const formatCellId = (id: string) => {
  if (id.length === 4) return [+id.slice(0, 2), +id.slice(2)];
  if (id.length > 2 && id.startsWith("10"))
    return [+id.slice(0, 2), +id.slice(2)];
  if (id.length > 2 && !id.startsWith("10")) return [+id[0], +id.slice(1)];
  else return [+id[0], +id[1]];
};
