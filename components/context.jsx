import React, { createContext, useState, useContext } from 'react';
import data from '../constants/constants';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState(data[0]);

  return (
    <FilterContext.Provider value={{ selectedFilter, setSelectedFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
