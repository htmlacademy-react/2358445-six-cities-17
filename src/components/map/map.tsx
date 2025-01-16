import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types';
import {memo, useEffect, useRef} from 'react';
import {UrlMarker} from '../../const';
import useMap from '../../hooks/use-map/use-map';

type MapProps = {
  page: string;
  offers: Omit<Offer, 'type' | 'price' | 'previewImage' | 'isFavorite' | 'isPremium' | 'rating'>[];
  selectedOffer: Offer | null;
}

const defaultMapIcon = new Icon({
  iconUrl: UrlMarker.Default,
  iconSize: [28, 40],
  iconAnchor: [16, 40]
});

const currentMapIcon = new Icon({
  iconUrl: UrlMarker.Current,
  iconSize: [28, 40],
  iconAnchor: [16, 40]
});

function Map({page, offers, selectedOffer}: MapProps): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef(null);
  const shouldScrollOnZoom = (page !== 'offer');
  const map = useMap(mapRef, city, shouldScrollOnZoom);

  useEffect(() => {
    if (map) {
      map.setView({lat: city.location.latitude, lng: city.location.longitude}, city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .bindPopup(point.title)
          .setIcon(
            selectedOffer && point.id === selectedOffer.id
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

  return <section className={`${page}__map map`} ref={mapRef} data-testid='map-container'></section>;
}

export default memo(Map);
