let map;
let iitMarker;
let iitInfoWindow;

function initMap() {

  const chicago = { lat: 41.8781, lng: -87.6298 };
  const iit = { lat: 41.8349, lng: -87.6270 };


  map = new google.maps.Map(document.getElementById('map'), {
    center: chicago,
    zoom: 12
  });

  iitMarker = new google.maps.Marker({
    position: iit,
    map: map,
    title: "Illinois Institute of Technology",
    icon: {
      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red pin
      scaledSize: new google.maps.Size(40, 40) // Larger size
      }
  });

  iitInfoWindow = new google.maps.InfoWindow({
  content: `
    <div style="padding: 10px;">
      <h3 style="margin: 0; color: #CC0000;">Illinois Institute of Technology</h3>
      <p style="margin: 5px 0;">10 W 35th St, Chicago, IL 60616</p>
      <a href="https://www.iit.edu" target="_blank" style="color: #CC0000;">Visit Website</a>
    </div>
  `
  });

  iitMarker.addListener("click", () => {
    iitInfoWindow.open(map, iitMarker);
  });

  document.getElementById("goToIIT").addEventListener("click", () => {
    map.panTo(iit);
    map.setZoom(16);
    iitInfoWindow.open(map, iitMarker);
  });

}

window.addEventListener('load', initMap);