
import { useEffect } from 'react';
import { useUrlParams } from './useUrlParams';

export const useFormPrefill = (
  setFormData: (updater: (prev: any) => any) => void,
  formData: any
) => {
  const urlParams = useUrlParams();

  useEffect(() => {
    if (urlParams.name || urlParams.email || urlParams.phone) {
      console.log('🔄 Prefilling form with URL params:', urlParams);
      
      setFormData((prev: any) => ({
        ...prev,
        name: urlParams.name || prev.name,
        email: urlParams.email || prev.email,
        phone: urlParams.phone || prev.phone,
      }));
    }
  }, [urlParams, setFormData]);

  return urlParams;
};
