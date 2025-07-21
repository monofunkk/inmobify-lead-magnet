
import { useState, useEffect } from 'react';

export interface UrlParams {
  name?: string;
  email?: string;
  phone?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
}

export const useUrlParams = (): UrlParams => {
  const [params, setParams] = useState<UrlParams>({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const extractedParams: UrlParams = {
      name: urlParams.get('name') || undefined,
      email: urlParams.get('email') || undefined,
      phone: urlParams.get('phone') || undefined,
      utm_source: urlParams.get('utm_source') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
    };

    // Only set if there are actual parameters
    const hasParams = Object.values(extractedParams).some(value => value !== undefined);
    if (hasParams) {
      setParams(extractedParams);
      
      // Store in localStorage for persistence
      localStorage.setItem('metaAdParams', JSON.stringify(extractedParams));
    } else {
      // Check localStorage for persisted params
      const stored = localStorage.getItem('metaAdParams');
      if (stored) {
        try {
          setParams(JSON.parse(stored));
        } catch (e) {
          console.error('Error parsing stored params:', e);
        }
      }
    }
  }, []);

  return params;
};
