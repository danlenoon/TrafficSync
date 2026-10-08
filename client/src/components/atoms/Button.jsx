import React, { useContext } from 'react';
import { SimulationContext } from '../../SimulationContext';

export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const { glassClarity } = useContext(SimulationContext);
  const baseStyle = "px-6 py-3 rounded-full font-bold flex justify-center items-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-blue-500/25",
    accent: "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-green-500/25",
    secondary: "bg-gray-900 text-white hover:bg-black shadow-gray-900/25",
    outline: "border text-gray-800 hover:bg-white/90 shadow-md",
    ghost: "text-gray-700 hover:text-gray-900 bg-transparent shadow-none hover:bg-white/40"
  };

  const dynamicStyle = variant === 'outline' ? {
    backgroundColor: 'var(--input-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    borderColor: 'var(--glass-border)',
    fontFamily: 'Arial, sans-serif'
  } : {
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      style={dynamicStyle}
      {...props}
    >
      {children}
    </button>
  );
}
