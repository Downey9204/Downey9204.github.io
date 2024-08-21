import { Route, Routes } from 'react-router-dom';

import Layout from '@layouts/Layout';
import routes from '@routes/routes';

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {
          /** Routes */
          routes.map((route, i) => (
            <Route key={i} {...route} />
          ))
        }
      </Route>
    </Routes>
  );
};

export default AppRoutes;
