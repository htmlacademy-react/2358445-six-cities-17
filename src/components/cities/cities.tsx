
import LocationItemLink from '../../components/location-item-link/location-item-link';
import {Location} from '../../const';

type CitiesProps = {
  locations: Array<Location>;
}

function Cities({locations}: CitiesProps): JSX.Element {
  const cities = locations &&
    locations.map(({id, name, path})=>
      <li className='locations__item' key={id}><LocationItemLink text={name} location={path} isTab isActive={name === 'Amsterdam'}/></li>
    );
  return (
    <>
      <h1 className='visually-hidden'>Cities</h1>
      <div className='tabs'>
        <section className='locations container'>
          <ul className='locations__list tabs__list'>
            {cities}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Cities;
