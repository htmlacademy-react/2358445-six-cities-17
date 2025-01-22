import {render, screen} from '@testing-library/react';
import {Offer} from '../../types';
import {makeFakeOffer, makeFakeOfferFull} from '../../mocks';
import {getMapPoints} from '../../utils';
import Map from '../../components/map/map';
import {withHistory} from '../../mock-component';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const mapContainerTestId = 'map-container';
    const page = 'offer';
    const offer = makeFakeOfferFull();
    const nearOffers = Array<Offer>(5).fill(makeFakeOffer());
    const offersForMap = getMapPoints(nearOffers, offer);


    render(<Map page={page} offers={offersForMap} selectedOffer={offer}/>);
    const mapContainer = screen.getByTestId(mapContainerTestId);

    expect(mapContainer).toBeInTheDocument();
  });

  it('should have correct number of markers on the main page', async () => {
    const mockOffers = Array<Offer>(12).fill(makeFakeOffer());
    const page = 'cities';

    const mockMapProps = {
      page: page,
      offers: mockOffers,
      selectedOffer: mockOffers[2],
    };

    const withHistoryComponent = withHistory(<Map {...mockMapProps} />);

    render(withHistoryComponent);
    await screen.findByTestId('map-container');

    const mapElement = screen.getByTestId('map-container');
    const markers = mapElement.querySelectorAll('.leaflet-marker-icon');
    expect(markers.length).toBe(mockOffers.length);
  });
});
