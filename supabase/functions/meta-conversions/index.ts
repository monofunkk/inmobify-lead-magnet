
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConversionEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  user_data: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
    ct?: string;
    country?: string;
    external_id?: string;
    fbp?: string;
    fbc?: string;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data: {
    value?: number;
    currency?: string;
    content_category?: string;
    content_name?: string;
    content_type?: string;
    predicted_ltv?: number;
    income_type?: string;
    priority?: string;
    conversion_probability?: string;
    process_complexity?: string;
    total_applicants?: number;
  };
}

interface ConversionPayload {
  events: ConversionEvent[];
  test_event_code?: string;
}

const hashData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const getClientIP = (req: Request): string => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return '127.0.0.1'; // fallback
};

const enhanceEventWithServerData = async (event: ConversionEvent, req: Request): Promise<ConversionEvent> => {
  const clientIP = getClientIP(req);
  const userAgent = req.headers.get('user-agent') || '';
  
  // Hash the country parameter properly
  const hashedCountry = await hashData('cl');
  
  return {
    ...event,
    user_data: {
      ...event.user_data,
      client_ip_address: clientIP,
      client_user_agent: userAgent,
      country: hashedCountry // Now properly hashed
    }
  };
};

const sendToMetaAPI = async (payload: ConversionPayload, pixelId: string, accessToken: string) => {
  const apiUrl = `https://graph.facebook.com/v18.0/${pixelId}/events`;
  
  const requestBody = {
    data: payload.events,
    access_token: accessToken,
    partner_agent: 'broker_landing_supabase_v1.0',
    ...(payload.test_event_code && { test_event_code: payload.test_event_code })
  };
  
  console.log('📤 Sending to Meta CAPI:', {
    url: apiUrl,
    eventCount: payload.events.length,
    events: payload.events.map(e => ({
      event_name: e.event_name,
      event_id: e.event_id,
      value: e.custom_data.value,
      income_type: e.custom_data.income_type,
      country_hashed: e.user_data.country ? 'YES' : 'NO'
    }))
  });
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  
  const result = await response.json();
  
  if (!response.ok) {
    console.error('❌ Meta CAPI Error:', {
      status: response.status,
      statusText: response.statusText,
      error: result
    });
    throw new Error(`Meta API Error: ${response.status} - ${JSON.stringify(result)}`);
  }
  
  console.log('✅ Meta CAPI Success:', {
    events_received: result.events_received,
    messages: result.messages,
    fbtrace_id: result.fbtrace_id
  });
  
  return result;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const pixelId = Deno.env.get('META_PIXEL_ID');
    const accessToken = Deno.env.get('META_ACCESS_TOKEN');
    
    if (!pixelId || !accessToken) {
      console.error('❌ Missing Meta credentials');
      return new Response(
        JSON.stringify({ error: 'Meta credentials not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    const payload: ConversionPayload = await req.json();
    
    // Validate required fields
    if (!payload.events || !Array.isArray(payload.events) || payload.events.length === 0) {
      console.error('❌ Invalid payload: missing or empty events array');
      return new Response(
        JSON.stringify({ error: 'Invalid payload: events array is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Enhance events with server-side data and properly hash country
    const enhancedEvents = await Promise.all(
      payload.events.map(event => enhanceEventWithServerData(event, req))
    );
    
    const enhancedPayload = {
      ...payload,
      events: enhancedEvents
    };
    
    console.log('🔄 Processing Meta CAPI request:', {
      eventCount: enhancedEvents.length,
      clientIP: getClientIP(req),
      userAgent: req.headers.get('user-agent')?.substring(0, 50) + '...',
      pixelId: pixelId,
      countryHashed: enhancedEvents[0]?.user_data?.country ? 'YES' : 'NO'
    });
    
    // Send to Meta with retry logic
    let result;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        result = await sendToMetaAPI(enhancedPayload, pixelId, accessToken);
        break;
      } catch (error) {
        attempts++;
        console.warn(`⚠️ Meta CAPI attempt ${attempts} failed:`, error.message);
        
        if (attempts === maxAttempts) {
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        ...result,
        enhanced_events: enhancedEvents.length,
        server_timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('❌ Meta CAPI Edge Function Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
