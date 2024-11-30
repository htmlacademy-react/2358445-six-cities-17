type OfferGaleryProps = {
  images: string[];
}

function OfferGalery({images}: OfferGaleryProps): JSX.Element {
  const galeryList = images.map((image) => (
    <div className='offer__image-wrapper' key={image}><img className='offer__image' src={image} alt='Photo studio' /></div>
  ));
  return (
    <div className='offer__gallery-container container'>
      <div className='offer__gallery'>
        {galeryList}
      </div>
    </div>
  );
}

export default OfferGalery;
