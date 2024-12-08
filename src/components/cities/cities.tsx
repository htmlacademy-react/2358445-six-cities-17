
import LocationItemLink from '../../components/location-item-link/location-item-link';
import {MouseEvent} from 'react';

type CitiesProps = {
  cities: string[];
  onCityClick: (city: string | null) => void;
  activeCity: string | null;
}

function Cities({cities, onCityClick, activeCity}: CitiesProps): JSX.Element {
  const handleListCitiesItemClick = (evt: MouseEvent<HTMLElement>) => onCityClick(evt.currentTarget.textContent);
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
