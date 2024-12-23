import '../../pages/loading-page/loading-page.css';

function LoadingPage(): JSX.Element {
  return (
    <div className='loader'>
      <div className='loader-inner'>
        <div className='loader-line-wrap'>
          <div className='loader-line'></div>
        </div>
        <div className='loader-line-wrap'>
          <div className='loader-line'></div>
        </div>
        <div className='loader-line-wrap'>
          <div className='loader-line'></div>
        </div>
        <div className='loader-line-wrap'>
          <div className='loader-line'></div>
        </div>
        <div className='loader-line-wrap'>
          <div className='loader-line'></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
