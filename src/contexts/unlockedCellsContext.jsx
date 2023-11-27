/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from 'react';

const UnlockedCellsContext = createContext();

export function UnlockedCellsProvider({ children }) {
  const [unlockedCells, setUnlockedCells] = useState([]);

  return (
    <UnlockedCellsContext.Provider value={{ unlockedCells, setUnlockedCells }}>
      {children}
    </UnlockedCellsContext.Provider>
  );
}

export function useUnlockedCells() {
  return useContext(UnlockedCellsContext);
}