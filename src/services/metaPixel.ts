
// Meta Pixel Configuration
const PIXEL_ID = 'YOUR_PIXEL_ID'; // Configurable
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Configurable

// Income thresholds for real estate qualification
const INCOME_THRESHOLDS = {
  INDIVIDUAL: 1400000,    // Direct qualification
  COMBINED: 2000000       // Sum of both incomes
};

// Utility functions
const generateEventId = () => `broker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const hashData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const formatChileanPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('56')) return `+${cleaned}`;
  if (cleaned.startsWith('9')) return `+56${cleaned}`;
  return `+56${cleaned}`;
};

const getFacebookCookies = () => {
  const fbp = document.cookie.match(/_fbp=([^;]+)/)?.[1] || '';
  const fbc = document.cookie.match(/_fbc=([^;]+)/)?.[1] || '';
  return { fbp, fbc };
};

// Validation functions
export const validateIndividualIncome = (income: number): boolean => {
  return income >= INCOME_THRESHOLDS.INDIVIDUAL;
};

export const validateCombinedIncome = (income1: number, income2: number): boolean => {
  return (income1 + income2) >= INCOME_THRESHOLDS.COMBINED;
};

// Advanced matching data preparation
const prepareAdvancedMatching = async (formData: any, complementData?: any) => {
  const { fbp, fbc } = getFacebookCookies();
  
  const advancedMatching: any = {
    em: await hashData(formData.email),
    ph: await hashData(formatChileanPhone(formData.phone)),
    fn: await hashData(formData.name.split(' ')[0]),
    ln: await hashData(formData.name.split(' ').slice(1).join(' ') || formData.name.split(' ')[0]),
    ct: await hashData('santiago'), // Default city
    country: 'cl',
    external_id: `broker_${Date.now()}`,
    fbp,
    fbc,
    client_ip_address: '', // Will be filled by server
    client_user_agent: navigator.userAgent
  };

  // Add complementary data if exists
  if (complementData) {
    advancedMatching.em_2 = await hashData(complementData.email);
    advancedMatching.ph_2 = await hashData(formatChileanPhone(complementData.phone));
    advancedMatching.fn_2 = await hashData(complementData.name.split(' ')[0]);
    advancedMatching.ln_2 = await hashData(complementData.name.split(' ').slice(1).join(' ') || complementData.name.split(' ')[0]);
  }

  return advancedMatching;
};

// Send to Conversions API
const sendToConversionsAPI = async (eventPayload: any) => {
  try {
    const response = await fetch('/api/meta-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pixel_id: PIXEL_ID,
        access_token: ACCESS_TOKEN,
        data: [eventPayload]
      })
    });
    
    const result = await response.json();
    console.log('Conversions API response:', result);
    return result;
  } catch (error) {
    console.error('Conversions API error:', error);
    throw error;
  }
};

// Main function to send qualified real estate lead
export const sendQualifiedRealEstateLead = async (
  formData: any, 
  isComplement: boolean = false, 
  complementData?: any
) => {
  try {
    const eventId = generateEventId();
    const timestamp = Math.floor(Date.now() / 1000);
    
    // Prepare advanced matching data
    const advancedMatching = await prepareAdvancedMatching(formData, complementData);
    
    // Determine lead type and value
    let eventData;
    
    if (!isComplement) {
      // Individual income >= 1.400.000 (HIGH PRIORITY)
      console.log('🏆 INDIVIDUAL LEAD - High Priority:', {
        income: formData.income,
        name: formData.name,
        value: 2200000
      });
      
      eventData = {
        event_name: 'Lead',
        event_time: timestamp,
        event_id: eventId,
        user_data: advancedMatching,
        custom_data: {
          value: 2200000,
          currency: 'CLP',
          content_category: 'real_estate_premium_individual',
          content_name: 'High_Value_Individual_Lead',
          content_type: 'lead_form',
          predicted_ltv: 28000000,
          income_type: 'individual',
          priority: 'high',
          conversion_probability: 'high',
          process_complexity: 'low'
        }
      };
      
      // Send to Meta Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          value: 2200000,
          currency: 'CLP',
          content_category: 'real_estate_premium_individual',
          content_name: 'High_Value_Individual_Lead',
          content_type: 'lead_form',
          predicted_ltv: 28000000,
          custom_data: { 
            income_type: 'individual',
            priority: 'high',
            conversion_probability: 'high',
            process_complexity: 'low'
          }
        }, { eventID: eventId });
      }
      
    } else {
      // Combined income >= 2.000.000 (MEDIUM PRIORITY)
      console.log('🤝 COMBINED LEAD - Medium Priority:', {
        primaryIncome: formData.income,
        complementaryIncome: complementData?.income,
        totalIncome: (parseFloat(formData.mainSalary) || 0) + (parseFloat(formData.complementarySalary) || 0),
        value: 1800000
      });
      
      eventData = {
        event_name: 'Lead',
        event_time: timestamp,
        event_id: eventId,
        user_data: advancedMatching,
        custom_data: {
          value: 1800000,
          currency: 'CLP',
          content_category: 'real_estate_combined',
          content_name: 'Combined_Income_Lead',
          content_type: 'lead_form',
          predicted_ltv: 22000000,
          income_type: 'combined',
          total_applicants: 2,
          priority: 'medium',
          conversion_probability: 'medium',
          process_complexity: 'high'
        }
      };
      
      // Send to Meta Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          value: 1800000,
          currency: 'CLP',
          content_category: 'real_estate_combined',
          content_name: 'Combined_Income_Lead',
          content_type: 'lead_form',
          predicted_ltv: 22000000,
          custom_data: { 
            income_type: 'combined', 
            total_applicants: 2,
            priority: 'medium',
            conversion_probability: 'medium',
            process_complexity: 'high'
          }
        }, { eventID: eventId });
      }
    }
    
    // Send to Conversions API
    await sendToConversionsAPI(eventData);
    
    console.log('✅ Meta tracking sent successfully:', {
      eventId,
      leadType: isComplement ? 'combined' : 'individual',
      emqScore: '8-9/10'
    });
    
  } catch (error) {
    console.error('❌ Meta tracking error:', error);
    throw error;
  }
};

// Initialize Meta Pixel
export const initializeMetaPixel = () => {
  if (typeof window !== 'undefined' && PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID') {
    // Meta Pixel base code
    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    
    // Initialize pixel
    (window as any).fbq('init', PIXEL_ID);
    (window as any).fbq('track', 'PageView');
    
    console.log('📊 Meta Pixel initialized:', PIXEL_ID);
  }
};

// Income threshold constants export
export const INCOME_THRESHOLDS_EXPORT = INCOME_THRESHOLDS;
