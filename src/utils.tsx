import {SortType, CITIES, REVIEWS_COUNT} from './const';
import {Offer, OfferFull, Offers, Reviews} from './types';

const toUpFirstLetter = (value: string) => value[0].toUpperCase() + value.slice(1);

const formatDate = (date: string): string => {
  const tempDate = new Date(Date.parse(date));
  return `${tempDate.toLocaleString('en-US', { month: 'long' })} ${tempDate.getFullYear()}`;
};

const showRating = (rating: number): string => `${Math.round(rating) * 20}%`;

const getCitySortOffers = (offers: Offer[], sortType: SortType, city: string): Offer[] => {
  switch(sortType) {
    case SortType.TOP_RATED_FIRST:
      return offers.filter((el) => el.city.name === city).sort((a, b) => b.rating - a.rating);
    case SortType.PRICE_LOW_TO_HIGH:
      return offers.filter((el) => el.city.name === city).sort((a, b) => a.price - b.price);
    case SortType.PRICE_HIGH_TO_LOW:
      return offers.filter((el) => el.city.name === city).sort((a, b) => b.price - a.price);
    case SortType.POPULAR:
      return offers.filter((el) => el.city.name === city);
    default:
      return offers;
  }
};

const getRandomCity = (): string => CITIES[Math.floor(Math.random() * CITIES.length)];

const getMapPoints = (offers: Offers, currentOffer?: OfferFull) => {
  const mapPoints = offers.map(({id, title, city, location}) => ({id, title, city, location}));

  if (currentOffer) {
    return mapPoints.concat({
      id: currentOffer.id,
      title: currentOffer.title,
      city: currentOffer.city,
      location: currentOffer.location
    });
  }

  return mapPoints;
};

const sortReviews = (reviews: Reviews): Reviews => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, REVIEWS_COUNT);

const changeIsFavorite = (id: string, isFavorite: boolean, offers: Offers): Offers => {
  offers.find((item, index) => {
    if (item.id === id) {
      const changedOffer = {...item, isFavorite: isFavorite};
      const changedOffers = offers.splice(index, 1, changedOffer);
      return changedOffers;
    }
  });
  return offers;
};

export { toUpFirstLetter, formatDate, showRating, getCitySortOffers, getRandomCity, getMapPoints, sortReviews, changeIsFavorite };
