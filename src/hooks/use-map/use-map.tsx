import {useEffect, useState, useRef, MutableRefObject} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../../types';
import {MapAttribution} from '../../const';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City, shouldScrollOnZoom: boolean = true): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom,
        scrollWheelZoom: shouldScrollOnZoom
      });

      const layer = new TileLayer(MapAttribution.TileLayer, {attribution: MapAttribution.Copyright});

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
