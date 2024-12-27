import {NEARBY_COUNT, Page} from '../../const';
import {useAppSelector} from '../../hooks';
import {selectNearByOffers} from '../../store/selectors';
import CardsList from '../cards-list/cards-list';

function NearByOffers(): JSX.Element {
  const offers = useAppSelector(selectNearByOffers);
  const nearOffers = offers.slice(0, NEARBY_COUNT);
  return (
    <div className='container'>
      <section className='near-places places'>
        <h2 className='near-places__title'>Other places in the neighbourhood</h2>
        <CardsList
          offers={nearOffers}
          page={Page.NearPlaces}
        />
      </section>
    </div>
  );
}

export default NearByOffers;
