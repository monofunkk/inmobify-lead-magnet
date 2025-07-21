import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface PhoneInputProps extends React.ComponentProps<typeof Input> {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      
      // Remove any non-digit characters except + at the beginning
      inputValue = inputValue.replace(/[^\d+]/g, '');
      
      // If it starts with +56, keep it as is
      if (inputValue.startsWith('+56')) {
        onChange(inputValue);
        return;
      }
      
      // If it starts with 56, add the +
      if (inputValue.startsWith('56')) {
        onChange(`+${inputValue}`);
        return;
      }
      
      // If it starts with 9 (Chilean mobile), add +56
      if (inputValue.startsWith('9')) {
        onChange(`+56${inputValue}`);
        return;
      }
      
      // If it's just digits and not starting with the above, add +56
      if (inputValue.length > 0 && !inputValue.startsWith('+')) {
        onChange(`+56${inputValue}`);
        return;
      }
      
      // If empty or just +, allow it
      if (inputValue === '' || inputValue === '+') {
        onChange(inputValue);
        return;
      }
      
      onChange(inputValue);
    };

    const displayValue = value || '';

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 z-10">
          <span className="text-lg">🇨🇱</span>
          <span className="text-sm text-muted-foreground">+56</span>
        </div>
        <Input
          ref={ref}
          type="tel"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          className={cn("pl-20", className)}
          placeholder="9 1234 5678"
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
