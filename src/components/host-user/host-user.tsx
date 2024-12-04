import { User } from '../../const';

type HostUserProps = {
  host: User;
}

function HostUser({host}: HostUserProps): JSX.Element {
  const proLabel = host.isPro ? <span className='offer__user-status'>Pro</span> : '';
  return (
    <div className='offer__host-user user'>
      <div className={`offer__avatar-wrapper${host.isPro && ' offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
        <img className='offer__avatar user__avatar' src={host.avatarUrl} width='74' height='74' alt='Host avatar' />
      </div>
      <span className='offer__user-name'>{host.name}</span>
      {proLabel}
    </div>
  );
}

export default HostUser;
