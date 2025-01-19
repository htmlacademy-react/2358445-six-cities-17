import {render, screen} from '@testing-library/react';
import OfferGalery from './offer-galery';
import {makeFakeImagesData} from '../../mocks';
import {GALERY_IMAGES_COUNT} from '../../const';

describe('Component: OfferGalery', () => {
  it('should render correctly', () => {
    const images = makeFakeImagesData();
    const offerGaleryContainerTestId = 'offer-galery-container';
    const offerImageTestId = 'offer-image';

    render(<OfferGalery images={images} />);
    const offerGaleryContainer = screen.getByTestId(offerGaleryContainerTestId);
    const offerImages = screen.getAllByTestId(offerImageTestId);

    expect(offerGaleryContainer).toBeInTheDocument();
    expect(offerImages.length).toBe(GALERY_IMAGES_COUNT);
  });
});
