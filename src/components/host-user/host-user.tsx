import { User } from '../../types';
import cn from 'classnames';

type HostUserProps = {
  host: User;
}

function HostUser({host}: HostUserProps): JSX.Element {
  const proLabel = host.isPro ? <span className='offer__user-status'>Pro</span> : '';
  return (
    <div className='offer__host-user user'>
      <div className={cn('offer__avatar-wrapper', 'user__avatar-wrapper', {'offer__avatar-wrapper--pro': host.isPro})}>
        <img className='offer__avatar user__avatar' src={host.avatarUrl} width='74' height='74' alt='Host avatar' />
      </div>
      <span className='offer__user-name'>{host.name}</span>
      {proLabel}
    </div>
  );
}

export default HostUser;
