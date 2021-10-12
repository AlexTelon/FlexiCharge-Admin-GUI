import { TileLayer, Popup, MapContainer, Marker } from 'react-leaflet';
import { chargerStationCollection } from '@/remote-access';
import { ChargerStation } from '@/remote-access/types';
import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, List, ListItem, LinearProgress, ListItemText } from '@material-ui/core';
import { Helmet } from 'react-helmet';

interface ChargerStationMapState {
  loaded?: boolean
  stations: ChargerStation[]
  error?: boolean
  errorMessage?: string
}

const ChargerStationMap = (props: any) => {
  const [state, setState] = useState<ChargerStationMapState>({
    loaded: false,
    stations: []
  });
  const [reloaded, setReload] = useState<boolean>(false);

  const loadStations = () => {
    setState({
      ...state,
      loaded: false
    });
    chargerStationCollection.getAllChargerStations().then((stations) => {
      setState({
        loaded: true,
        stations
      });
      setReload(false);
    }).catch((_) => {
      setState({
        loaded: true,
        error: true,
        errorMessage: 'Failed to load',
        stations: []
      });
      setReload(false);
    });
  };

  useEffect(() => {
    loadStations();

    // Leaflet style overrides
    const mapStyle = document.createElement('style');
    mapStyle.innerText = `
      #charger-station-map .leaflet-popup-content p {
        margin: 0;
      }
    `;

    document.head.appendChild(mapStyle);
  }, [reloaded]);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" 
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" 
          crossOrigin="" 
        />
      </Helmet>
      <Card
        {...props}
      >
        {!state.loaded &&
        <LinearProgress />
        }
        <CardContent>
          <MapContainer 
            id="charger-station-map"
            center={[57.78088050269488, 14.161473514345374]} 
            zoom={13} 
            style={{ height: 432, width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {state.stations.map(station => (
              <Marker
                key={station.chargePointID}
                position={[
                  station.location[0],
                  station.location[1]
                ]}
              >
                <Popup>
                  <Typography>
                    {station.name}
                  </Typography>
                  <List dense={true}>
                    <ListItem>
                      <ListItemText
                        primary={station.chargePointID}
                        secondary="Station ID"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`${station.location[0]}, ${station.location[1]}`}
                        secondary="Longitude, Latitude"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`SEK ${station.price / 100}`}
                        secondary="Price"
                      />
                    </ListItem>
                  </List>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>
    </>);
};

export default ChargerStationMap;