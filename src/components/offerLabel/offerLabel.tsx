type OfferLabelProps = {
  text?: string;
  page?: 'offer' | 'place-card';
};

function OfferLabel({ text = 'Premium', page = 'place-card' }: OfferLabelProps): JSX.Element {
  return (
    <div className={`${page}__mark`}>
      <span>{text}</span>
    </div>
  );
}

export default OfferLabel;
