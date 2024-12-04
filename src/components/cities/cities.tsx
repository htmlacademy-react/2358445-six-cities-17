
import LocationItemLink from '../../components/location-item-link/location-item-link';
import {City} from '../../const';

type CitiesProps = {
  cities: Array<City>;
}

function Cities({cities}: CitiesProps): JSX.Element {
  const citiesUl = cities &&
    cities.map(({id, name})=>
      <li className='locations__item' key={id}><LocationItemLink text={name} isTab isActive={name === 'Paris'}/></li>
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
