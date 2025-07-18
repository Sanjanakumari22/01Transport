let scriptLoadingPromise;

export function loadGoogleMaps(apiKey) {
  if (!scriptLoadingPromise) {
    scriptLoadingPromise = new Promise((resolve, reject) => {
      const existingScript = document.getElementById('google-maps');
      if (existingScript) {
        resolve(window.google);
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-maps';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlNPB21MTMfA-a4IktkCjAbJk4Nld0f4M&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve(window.google);
      };

      script.onerror = (err) => reject(err);

      document.body.appendChild(script);
    });
  }

  return scriptLoadingPromise;
}
