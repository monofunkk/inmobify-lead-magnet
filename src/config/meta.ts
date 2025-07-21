
// Meta Pixel Configuration
// Replace these values with your actual Meta Business Manager credentials

export const META_CONFIG = {
  // Replace with your actual Meta Pixel ID from Business Manager
  PIXEL_ID: 'YOUR_PIXEL_ID',
  
  // Replace with your actual Access Token with ads_management permissions
  ACCESS_TOKEN: 'YOUR_ACCESS_TOKEN',
  
  // API Version
  API_VERSION: 'v18.0',
  
  // Test Mode (set to false in production)
  TEST_MODE: true
};

// Instructions for setup:
// 1. Go to Meta Business Manager (business.facebook.com)
// 2. Navigate to Events Manager
// 3. Create or select your Pixel
// 4. Copy the Pixel ID and replace YOUR_PIXEL_ID
// 5. Generate an Access Token with ads_management permissions
// 6. Replace YOUR_ACCESS_TOKEN with your actual token
// 7. Set TEST_MODE to false when ready for production

console.log('📊 Meta Pixel Configuration:', {
  pixelId: META_CONFIG.PIXEL_ID,
  testMode: META_CONFIG.TEST_MODE,
  needsSetup: META_CONFIG.PIXEL_ID === 'YOUR_PIXEL_ID'
});
