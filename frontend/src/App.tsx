import { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routeNames } from './utils/routes';

const TicketsPage = lazy(() => import('./pages/tickets'));
const UpdateTicketPage = lazy(() => import('./pages/tickets/update'));

export default function App(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path={routeNames.tickets} element={<TicketsPage />} />
            <Route path={routeNames.editTicket} element={<UpdateTicketPage />} />
            <Route
              path="*"
              element={<Navigate to={routeNames.tickets} replace={true} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
