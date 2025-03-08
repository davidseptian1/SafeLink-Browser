// Menyediakan log untuk ekstensi yang terpasang
chrome.runtime.onInstalled.addListener(() => {
    console.log("SafeLink Blocker Extension Installed.");
  });
  
  // Fungsi untuk memeriksa keamanan URL menggunakan Google Safe Browsing API
  const checkLinkSecurity = async (url) => {
    const apiKey = "AIzaSyD_OuJcd359HTghD7E65mWSs-FyVVWEe3I";  // Ganti dengan API Key Anda
    const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
  
    const requestData = {
      client: {
        clientId: "safeLinkBlocker",
        clientVersion: "1.0"
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "POTENTIALLY_HARMFUL_APPLICATION", "UNWANTED_SOFTWARE"],
        platformTypes: ["ANY_PLATFORM"],
        urlData: [
          { url: url }
        ]
      }
    };
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });
  
    const data = await response.json();
    if (data.matches && data.matches.length > 0) {
      return false;  // Link tidak aman
    }
    return true;  // Link aman
  };
  