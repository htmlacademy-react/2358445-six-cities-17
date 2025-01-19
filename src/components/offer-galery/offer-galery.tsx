import {memo} from 'react';
import {GALERY_IMAGES_COUNT} from '../../const';

type OfferGaleryProps = {
  images: string[];
}

function OfferGalery({images}: OfferGaleryProps): JSX.Element {
  const galeryList = images.slice(0, GALERY_IMAGES_COUNT).map((image) => (
    <div className='offer__image-wrapper' key={`image_${image}`} data-testid='offer-image'><img className='offer__image' src={image} alt='Photo studio' /></div>
  ));
  return (
    <div className='offer__gallery-container container' data-testid='offer-galery-container'>
      <div className='offer__gallery'>
        {galeryList}
      </div>
    </div>
  );
}

export default memo(OfferGalery);
