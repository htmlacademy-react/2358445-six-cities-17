type MapProps = {
  page: string;
}

function Map({page}: MapProps): JSX.Element {
  return (
    <section className={`${page}__map map`}></section>
  );
}

export default Map;
