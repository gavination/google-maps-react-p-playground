'use client'
import styles from "./page.module.css";
import {APIProvider, Map, useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react";

// setting default destination
const destPosition = {lat: 33.79600528728229, lng: -84.4143086055784};


function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const [position, setPosition] = useState({lat: 33.918769234925996, lng: -84.34226161672078});


  // get current location 
  useEffect(() => {
  navigator.geolocation.getCurrentPosition((pos) => {
     console.log("New Latitude: ", pos.coords.latitude);
     console.log("New Longitude: ", pos.coords.longitude);
 
     setPosition({
       lat: pos.coords.latitude,
       lng: pos.coords.longitude
     });
 });
 }, []);

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
  }, [routesLibrary, map, position]);

  // Use directions service
  useEffect(() => {
    console.log("Current position?", position);
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: position,
        destination: destPosition,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, position]);

  if (!leg) return null;

  return (
    <div className="directions">
        <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
        </div>
      </div>

    <div className={styles.center}>

    </div>
    <APIProvider apiKey={"your api key here"}>
      <Map
      style={{width: '50vw', height: '50vh'}}
      defaultZoom={16}
      gestureHandling={'greedy'}
      disableDefaultUI={true}>
        <Directions/>
      </Map>
    </APIProvider>
    </main>
  );
}
