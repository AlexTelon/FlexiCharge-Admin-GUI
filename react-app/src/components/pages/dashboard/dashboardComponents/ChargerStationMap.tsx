import { MapContainer, Marker } from 'react-leaflet';
import { chargerStationCollection } from '@/remote-access';
import { ChargerStation } from '@/remote-access/types';
import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';

interface ChargerStationMapState {
  loaded?: boolean
  stations: ChargerStation[]
  error?: boolean
  errorMessage?: string
}

const ChargerStationMap = () => {
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
  }, [reloaded]);
  
  return (
    <>
      {!state.loaded &&
        <LinearProgress />
      }
      <MapContainer loaded={state.loaded} center={[45.4, -75.7]} zoom={12}>
        {state.stations.map(station => (
          <Marker
            key={station.chargePointID}
            position={[
              station.location[1],
              station.location[0]
            ]}
          />
        ))}
      </MapContainer>
    </>);
};

export default ChargerStationMap;