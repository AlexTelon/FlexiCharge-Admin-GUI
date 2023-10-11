import { TileLayer, Popup, MapContainer, Marker } from 'react-leaflet';
import { manageChargerPoint } from '@/remote-access';
import { ChargePoint } from '@/remote-access/types';
import React, { useState, useEffect } from 'react';
import {
  Typography, Card, CardContent, List, ListItem,
  LinearProgress, ListItemText, Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronRight } from '@material-ui/icons';
import { LeafletMouseEvent, Map } from 'leaflet';

interface ChargerPointMapState {
  loaded?: boolean
  chargePoints: ChargePoint[]
  error?: boolean
  errorMessage?: string
}

interface ChargerPointMapProps {
  fetchChargePoints?: boolean
  enableAddMarker?: boolean
  onMapClick?: (lat: number, lon: number) => void
  hideTitleAndLoading?: boolean
}

const ChargerPointMap = ({ fetchChargePoints = true, enableAddMarker = true, onMapClick, hideTitleAndLoading = false, ...rest }: ChargerPointMapProps) => {
  const [state, setState] = useState<ChargerPointMapState>({
    loaded: false,
    chargePoints: []
  });
  const [reloaded, setReload] = useState<boolean>(false);
  const [clickedMarker, setClickedMarker] = useState<[number, number] | null>(null);

  const loadChargerPoints = async () => {
    setState(prevState => ({ ...prevState, loaded: false }));
    try {
      const chargePoints = await manageChargerPoint.getAllChargerPoints();
      setState({
        loaded: true,
        chargePoints,
        error: false,
        errorMessage: ''
      });
    } catch (error) {
      setState({
        loaded: true,
        chargePoints: [],
        error: true,
        errorMessage: 'Failed to load'
      });
    }
    setReload(false);
  };

  useEffect(() => {
    if (fetchChargePoints) {
      loadChargerPoints();
    }

    // Leaflet style overrides
    const mapStyle = document.createElement('style');
    mapStyle.innerText = `
      #charger-point-map .leaflet-popup-content p {
        margin: 0;
      }
    `;
    document.head.appendChild(mapStyle);

    return () => {
      document.head.removeChild(mapStyle);
    };
  }, [reloaded]);

  const handleMapClick = (e: LeafletMouseEvent) => {
    if (enableAddMarker) {
      const { lat, lng } = e.latlng;
      setClickedMarker([lat, lng]);
      console.log(`Marker added at latitude: ${lat}, longitude: ${lng}`);
      onMapClick?.(lat, lng);
    }
  };

  return (
    <>
      <Helmet>
        <link rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" 
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" 
          crossOrigin="" 
        />
      </Helmet>
      <Card {...rest}>
        {!hideTitleAndLoading && !state.loaded &&
          <LinearProgress />
        }
        <CardContent>
          {!hideTitleAndLoading && (
            <Typography variant="h6" gutterBottom>Charge-points Map</Typography>
          )}
          <MapContainer 
            id="charger-point-map"
            center={[57.78088050269488, 14.161473514345374]} 
            zoom={13} 
            minZoom={5}
            maxZoom={25}
            maxBounds={[[-90, -180], [90, 180]]}
            style={{ height: 510, width: '100%' }}
            whenCreated={(mapInstance: Map) => {
              console.log('Map instance created!');
              mapInstance.on('click', handleMapClick);
            }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {state.chargePoints.map(point => (
              <Marker
                key={point.chargePointID}
                position={[
                  point.location[0],
                  point.location[1]
                ]}
              >
                <Popup>
                  <Typography>
                    {point.name}
                  </Typography>
                  <List dense={true}>
                    <ListItem>
                      <ListItemText
                        primary={point.chargePointID}
                        secondary="Station ID"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`${point.location[0]}, ${point.location[1]}`}
                        secondary="Latitude, Longitude"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`SEK ${point.price / 100}`}
                        secondary="Price"
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        component={Link}
                        to={`/dashboard/chargers/${point.chargePointID}`}
                        variant="text"
                        color="primary"
                        endIcon={<ChevronRight />}
                      >
                          Go to Chargers
                      </Button>
                    </ListItem>
                  </List>
                </Popup>
              </Marker>
            ))}
            {enableAddMarker && clickedMarker && <Marker position={clickedMarker} />}
          </MapContainer>
        </CardContent>
      </Card>
    </>);
};

export default ChargerPointMap;