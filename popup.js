// Mengambil URL dari tab yang sedang aktif
chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const currentTab = tabs[0];
    const url = currentTab.url;
    const statusDiv = document.getElementById('status');
    const resultDiv = document.getElementById('result');
  
    statusDiv.textContent = 'Memeriksa link...';
    
    // Panggil fungsi checkLinkSecurity untuk memeriksa keamanan URL
    const isSafe = await checkLinkSecurity(url);
    
    if (isSafe) {
      statusDiv.textContent = 'Link aman!';
      resultDiv.textContent = 'Tidak ada ancaman terdeteksi pada URL ini.';
    } else {
      statusDiv.textContent = 'Link tidak aman!';
      resultDiv.textContent = 'Terdeteksi ancaman (misalnya, malware, phishing).';
    }
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
    console.log("Google Safe Browsing Response:", data);  // Cetak respons JSON
  
    if (data.matches && data.matches.length > 0) {
      const threat = data.matches[0];
      const threatType = threat.threatType;
  
      return {
        isSafe: false,
        threatDetails: `Ancaman terdeteksi: ${threatType}`
      };
    }
  
    return {
      isSafe: true,
      threatDetails: 'Tidak ada ancaman terdeteksi pada URL ini.'
    };
  };
  