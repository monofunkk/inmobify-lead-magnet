
// This file is now deprecated - functionality moved to Supabase Edge Function
// All CAPI functionality is now handled by: supabase/functions/meta-conversions/index.ts

// Legacy mock function for reference (no longer used)
export const mockConversionsAPI = async (eventPayload: any) => {
  console.warn('⚠️ mockConversionsAPI is deprecated - use Supabase Edge Function instead');
  return {
    events_received: 1,
    messages: ['Mock response - use Edge Function for real implementation'],
    fbtrace_id: 'mock_trace_id_deprecated'
  };
};

// Documentation for the new implementation
export const IMPLEMENTATION_NOTES = {
  newEndpoint: 'supabase/functions/meta-conversions/index.ts',
  security: 'Secrets stored in Supabase, not in code',
  features: [
    'Real IP address capture',
    'Server-side User Agent',
    'Retry logic with exponential backoff',
    'Proper error handling and logging',
    'CORS support',
    'TypeScript interfaces',
    'Dual tracking (Pixel + CAPI)'
  ],
  usage: 'Automatically called by src/services/metaPixel.ts'
};
