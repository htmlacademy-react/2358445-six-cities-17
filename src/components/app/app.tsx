import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  countPlaces: number;
}

function App({countPlaces}: AppProps): JSX.Element {
  return (
    <MainPage countPlaces={countPlaces}/>
  );
}

export default App;
