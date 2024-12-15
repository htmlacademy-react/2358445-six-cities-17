import cn from 'classnames';
import {useAppDispatch} from '../../hooks';
import {changeCity, getOffers} from '../../store/action';
import {MouseEvent} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';

type LocationItemLinkProps = {
  isTab?: boolean;
  text: string;
  isActive?: boolean;
}

function LocationItemLink({isTab, text, isActive}: LocationItemLinkProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNeedNavigate = useLocation().pathname !== '/';

  const handleListCitiesItemClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (isNeedNavigate) {
      navigate(AppRoute.Main);
    }
    if (evt.currentTarget.textContent) {
      dispatch(changeCity(evt.currentTarget.textContent));
      dispatch(getOffers());
    }
  };
  return (
    <a href='#' onClick={handleListCitiesItemClick} className={cn('locations__item-link', {'tabs__item': isTab}, {'tabs__item--active': isActive})}>
      <span>{text}</span>
    </a>
  );
}

export default LocationItemLink;
