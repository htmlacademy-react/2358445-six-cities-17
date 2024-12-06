import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types';
import {useEffect, useRef} from 'react';
import useMap from '../hooks/use-map/use-map';
import {urlMarkerDefault, urlMarkerCurrent} from '../../const';

type MapProps = {
  page: string;
  offers: Offer[];
  selectedOffer: Offer | null;
}

const defaultMapIcon = new Icon({
  iconUrl: urlMarkerDefault,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentMapIcon = new Icon({
  iconUrl: urlMarkerCurrent,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({page, offers, selectedOffer}: MapProps): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && point === selectedOffer
              ? currentMapIcon
              : defaultMapIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <section className={`${page}__map map`} ref={mapRef}></section>;
}

export default Map;