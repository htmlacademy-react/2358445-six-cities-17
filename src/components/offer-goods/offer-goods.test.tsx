import {render, screen} from '@testing-library/react';
import OfferGoods from './offer-goods';

describe('Component: OfferGoods', () => {
  it('should render correctly', () => {
    const goods = ['Heating', 'Towels', 'Washing machine', 'Laptop friendly workspace'];
    const offerGoodsContainerTestId = 'offer-goods-container';
    const goodValueTestId = 'good-value';

    render(<OfferGoods goods={goods} />);
    const offerGoodsContainer = screen.getByTestId(offerGoodsContainerTestId);
    const goodValues = screen.getAllByTestId(goodValueTestId);

    expect(offerGoodsContainer).toBeInTheDocument();
    expect(screen.getByText(/s inside/i)).toBeInTheDocument();
    expect(goodValues.length).toBe(goods.length);
  });
});
