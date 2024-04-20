import './App.css';
import LoginScreen from './screens/login_screen';
import {UserContext,UserProvider} from './context/UserContext';
import Dashboard from './screens/dashboard';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import EventScreen from './screens/events_screen';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen />,
      errorElement: <h1>404</h1>,

    },
    {
      path: "/home",
      element: <Dashboard />,
    },
    {
      path: "/event/:eventId",
      element:<EventScreen />
    }
  ]);
  return (

      <UserProvider>
        <div className="App">
        <RouterProvider router={router} />
        </div>
      </UserProvider>

  );
}

export default App;
