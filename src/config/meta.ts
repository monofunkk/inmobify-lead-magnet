
// Meta Pixel Configuration using Supabase Secrets
export const META_CONFIG = {
  // These values are now handled by Supabase Secrets and Edge Functions
  // No hardcoded credentials in the frontend anymore
  
  // API Version
  API_VERSION: 'v18.0',
  
  // Test mode for debugging (set to true for testing)
  TEST_MODE: false,
  
  // Edge Function endpoint
  EDGE_FUNCTION_URL: 'https://eqyvioihzaptrjsxkbua.supabase.co/functions/v1/meta-conversions'
};

console.log('📊 Meta Configuration:', {
  apiVersion: META_CONFIG.API_VERSION,
  testMode: META_CONFIG.TEST_MODE,
  edgeFunction: META_CONFIG.EDGE_FUNCTION_URL,
  securityImproved: true
});
