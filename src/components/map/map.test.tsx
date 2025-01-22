import {render, screen} from '@testing-library/react';
import { Offer } from '../../types';
import { makeFakeOffer, makeFakeOfferFull } from '../../mocks';
import { getMapPoints } from '../../utils';
import Map from '../../components/map/map';

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
});
