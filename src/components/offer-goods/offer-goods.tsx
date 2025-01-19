import {memo} from 'react';

type OfferGoodsProps = {
  goods: string[];
}

function OfferGoods({ goods }: OfferGoodsProps): JSX.Element {
  const goodsList = goods.map((good) => (
    <li className='offer__inside-item' key={good} data-testid='good-value'>{good}</li>
  ));
  return (
    <div className='offer__inside' data-testid='offer-goods-container'>
      <h2 className='offer__inside-title'>What&apos;s inside</h2>
      <ul className='offer__inside-list'>
        {goodsList}
      </ul>
    </div>
  );
}

export default memo(OfferGoods);
