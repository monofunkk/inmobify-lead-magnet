
import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface PhoneInputProps extends Omit<React.ComponentProps<typeof Input>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      
      // Remove any non-digit characters
      inputValue = inputValue.replace(/\D/g, '');
      
      // If it starts with 56, remove it since we'll add +56 automatically
      if (inputValue.startsWith('56')) {
        inputValue = inputValue.slice(2);
      }
      
      // If it doesn't start with 9, and it's not empty, add 9
      if (inputValue.length > 0 && !inputValue.startsWith('9')) {
        inputValue = '9' + inputValue;
      }
      
      // Build the full phone number with +56
      const fullPhoneNumber = inputValue ? `+56${inputValue}` : '';
      
      onChange(fullPhoneNumber);
    };

    // Extract just the number part after +56 for display
    const displayValue = value.startsWith('+56') ? value.slice(3) : value;

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
