import { createContext, useContext, useState } from 'react';

const ActiveSectionContext = createContext();

export function ActiveSectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <ActiveSectionContext.Provider value={{ 
      activeSection, 
      setActiveSection, 
      hoveredProject, 
      setHoveredProject 
    }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}


