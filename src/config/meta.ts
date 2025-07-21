
// Meta Pixel Configuration
export const META_CONFIG = {
  // Your actual Meta Pixel ID
  PIXEL_ID: '711342000470591',
  
  // Your actual Access Token with ads_management permissions
  ACCESS_TOKEN: 'EAAKt1ZCpUIw4BPPiAgIISLE9ZAqZC7feVZCwDpRmb6cZA6WIPiuSlZBqBQ9bPOkeZA3QQIEqmrd29uMeTTrZBwg2sSgKVpPHljNqquxQZC3EELqoLJrmEhkW4OZCIsFbJ6xOMY2GMQqwruegubO65MtkJu09Eygqipl7K9oZA5ZC6D2bFwH0gfly4wHL7a6LKZCQZAJKFOZBgZDZD',
  
  // API Version
  API_VERSION: 'v18.0',
  
  // Production mode
  TEST_MODE: false
};

console.log('📊 Meta Pixel Configuration:', {
  pixelId: META_CONFIG.PIXEL_ID,
  testMode: META_CONFIG.TEST_MODE,
  needsSetup: false
});
