import React, {useState, useEffect} from "../web_modules/react.js";
import "./App.css.proxy.js";
import {useLocalStorage} from "./hooks.js";
function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
const toRad = function(x) {
  return x * Math.PI / 180;
};
function App2({}) {
  const [currentPosition, setPosition] = useState({});
  const [latitude, setLatitude] = useLocalStorage("referenceLatitude", 0);
  const [longitude, setLongitude] = useLocalStorage("referenceLongitude", 0);
  useEffect(() => {
    navigator.geolocation.watchPosition(function(position) {
      console.log(position);
      setPosition(position);
    });
  });
  let distance = void 0;
  if (latitude !== 0 && longitude !== 0 && currentPosition?.coords) {
    distance = calculateDistance(latitude, longitude, currentPosition.coords.latitude, currentPosition.coords.longitude);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "App-header"
  }, "Pr\xE9cision :", " ", currentPosition?.coords && /* @__PURE__ */ React.createElement(React.Fragment, null, Math.round(currentPosition.coords.accuracy), "m", /* @__PURE__ */ React.createElement("a", {
    href: `https://www.google.com/maps/search/?api=1&query=${currentPosition.coords.latitude},${currentPosition.coords.longitude}`
  }, "position")), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      if (currentPosition.coords !== void 0) {
        setLatitude(currentPosition.coords.latitude);
        setLongitude(currentPosition.coords.longitude);
      }
    }
  }, "Sauvegarder"), distance !== void 0 && /* @__PURE__ */ React.createElement("p", null, " distance : ", Math.round(distance * 1e3), "m")));
}
export default App2;
