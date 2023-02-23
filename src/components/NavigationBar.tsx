import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import NavigationButton from './NavigationButton';
import { getRouteByTitle, Page } from '../utilities/app-routes';

function NavigationBar() {
  const [centerButtons, setCenterButtons] = useState<Page[]>([]);
  const [rightSideButtons, setRightSideButtons] = useState<Page[]>([getRouteByTitle('Login/Register')]);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path !== '/') {
      if (['/login', '/register', '/user-details', '/athlete-details', '/payments'].includes(path)) {
        setCenterButtons([]);
        setRightSideButtons([]);
      } else {
        setCenterButtons([getRouteByTitle('My Dashboard'), getRouteByTitle('Events'), getRouteByTitle('Contact Us')]);
        setRightSideButtons([getRouteByTitle('Logout')]);
      }
    } else {
      setCenterButtons([]);
      setRightSideButtons([getRouteByTitle('Login/Register')]);
    }


  }, [location.pathname]);

  return (
    <div
      id="navigation-container"
      className="font-open-sans flex bg-z12-gray items-center h-10% grid-cols-3"
    >
      <div
        id="company-name"
        className="w-1/4 mx-5 flex items-center justify-start"
      >
        <div id="logo-placeholder" className="text-xl text-orange-400 font-bold">Z12 Performance</div>
      </div>

      <div
        id="center-buttons"
        className="w-2/4 flex justify-center items-center"
      >
        {centerButtons.map((page, index) => {
          return <NavigationButton key={index} page={page} />;
        })}
      </div>

      <div
        id="right-side-buttons"
        className="w-1/4 mx-5 flex items-center justify-end"
      >
        {rightSideButtons.map((page, index) => {
          return <NavigationButton key={index} page={page} />;
        })}
      </div>
    </div>
  );
}

export default NavigationBar;
