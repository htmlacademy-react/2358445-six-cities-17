import {memo} from 'react';
import {Page} from '../../const';

type OfferLabelProps = {
  text?: string;
  page?: Page.Offer | Page.PlaceCard;
};

function OfferLabel({ text = 'Premium', page = Page.PlaceCard }: OfferLabelProps): JSX.Element {
  return (
    <div className={`${page}__mark`}>
      <span>{text}</span>
    </div>
  );
}

export default memo(OfferLabel);
