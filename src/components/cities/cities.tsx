
import LocationItemLink from '../../components/location-item-link/location-item-link';
import {MouseEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity, getOffers} from '../../store/action';

type CitiesProps = {
  cities: string[];
}

function Cities({cities}: CitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);
  const handleListCitiesItemClick = (evt: MouseEvent<HTMLElement>) => {
    if (evt.currentTarget.textContent) {
      dispatch(changeCity(evt.currentTarget.textContent));
      dispatch(getOffers());
    }
  };
  const citiesUl = cities &&
    cities.map((city)=>
      <li className='locations__item' key={city} onClick={handleListCitiesItemClick}><LocationItemLink text={city} isTab isActive={city === activeCity}/></li>
    );
  return (
    <>
      <h1 className='visually-hidden'>Cities</h1>
      <div className='tabs'>
        <section className='locations container'>
          <ul className='locations__list tabs__list'>
            {citiesUl}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Cities;
