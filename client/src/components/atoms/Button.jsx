import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const baseStyle = "px-5 py-2.5 rounded-lg font-medium flex justify-center items-center gap-2 shadow-sm transition-all active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    accent: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-900 text-white hover:bg-black",
    outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-500 hover:text-gray-800 bg-transparent shadow-none"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
