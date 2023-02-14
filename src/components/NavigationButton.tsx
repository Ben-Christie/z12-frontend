// import classNames so that I can pass a ternary operator within the className parameter
import classNames from 'classnames';

import { useNavigate } from 'react-router';

import { Page } from '../utilities/app-routes';

interface Props {
  page: Page;
}


function NavigationButton({page}: Props) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(page.path)}
      className={classNames(
        'flex',
        'justify-center',
        'items-center',
        'text-white',
        'text-xl',
        'cursor-pointer',
        { 'px-12': !['Login/Register', 'Logout'].includes(page.pageTitle) },
        'hover:text-orange-400',
        'hover:font-extrabold'

      )
    }
    >
      {page.pageTitle}
    </div>
  );
}

export default NavigationButton;
