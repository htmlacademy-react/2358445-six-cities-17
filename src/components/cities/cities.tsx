
import LocationItemLink from '../../components/location-item-link/location-item-link';

type CitiesProps = {
  cities: string[];
}

function Cities({cities}: CitiesProps): JSX.Element {
  const citiesUl = cities &&
    cities.map((city)=>
      <li className='locations__item' key={city}><LocationItemLink text={city} isTab isActive={city === 'Paris'}/></li>
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
