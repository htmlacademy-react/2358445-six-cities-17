import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types';
import {useEffect, useRef} from 'react';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import useMap from '../../hooks/use-map/use-map';
import {useAppSelector} from '../../hooks';

type MapProps = {
  page: string;
  selectedOffer: Offer | null;
}

const defaultMapIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentMapIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({page, selectedOffer}: MapProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const city = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView({lat: city.location.latitude, lng: city.location.longitude}, city.location.zoom);
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .bindPopup(point.title)
          .setIcon(
            selectedOffer && point === selectedOffer
              ? currentMapIcon
              : defaultMapIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, city]);

  return <section className={`${page}__map map`} ref={mapRef}></section>;
}

export default Map;
