export const loadMapApi = () => {
  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBGde4ydbdGOcKMdN6J9wB82ZS8oiKfp8s&libraries=geometry,places&language=pl&region=NO&v=quarterly`;
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapScript = document.createElement("script");
  googleMapScript.src = mapsURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;
  window.document.body.appendChild(googleMapScript);

  return googleMapScript;
};
