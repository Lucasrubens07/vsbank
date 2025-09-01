import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  fullWidth?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  fullWidth = false,
  variant = 'default',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = 'block w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-white text-gray-900 placeholder-gray-400';
  
  const variantClasses = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-400 bg-white hover:border-gray-400',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-400 bg-white hover:border-green-400',
    warning: 'border-orange-300 focus:border-orange-500 focus:ring-orange-400 bg-white hover:border-orange-400',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-400 bg-white hover:border-red-400'
  };

  const inputClasses = [
    baseClasses,
    variantClasses[variant],
    error ? 'border-red-500 focus:border-red-400 focus:ring-red-400' : '',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    fullWidth ? 'w-full' : '',
    'space-y-1'
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          id={inputId}
          className={`${inputClasses} ${LeftIcon ? 'pl-10' : ''} ${RightIcon ? 'pr-10' : ''}`}
          {...props}
        />
        
        {RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <RightIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input; 