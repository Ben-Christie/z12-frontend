export interface Page {
  pageTitle: string;
  path: string;
}

const AppRoutes: Page[] = [
  {
    pageTitle: 'Login/Register',
    path: '/login',
  },
  {
    pageTitle: 'Login',
    path: '/login',
  },
  {
    pageTitle: 'Register',
    path: '/register',
  },
  {
    pageTitle: 'User Details',
    path: '/user-details',
  },
  {
    pageTitle: 'My Dashboard',
    path: '/my-dashboard'
  },
  {
    pageTitle: 'Events',
    path: '/events'
  },
  {
    pageTitle: 'Contact Us',
    path: '/contact-us'
  },
  {
    pageTitle: 'Logout',
    path: '/'
  },
  {
    pageTitle: 'Landing Page',
    path: '/'
  }
]

// function allows us to get the correct route to navigate to based on the name (title) of the route
// if route doesn't exist return to the landing page and output error message to console for debugging
export const getRouteByTitle = (title: string): Page => {
  const route = AppRoutes.find(route => route.pageTitle === title);

  if(route) {
    return route;
  } else {
    console.log('Error: {route} route not found');

    return getRouteByTitle('Landing Page')
  }
}