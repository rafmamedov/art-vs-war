import { NavBar } from './components/NavBar';
import { MainPage } from './pages/MainPage';
import './styles.scss'
import 'bulma/css/bulma.css';
import { Footer } from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Catalog } from './pages/Catalog';
import { Fund } from './components/Fund';
import { AboutUs } from './components/AboutUs';
import { PaintingPage } from './pages/PaintingPage';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { AuthorPage } from './pages/AuthorPage';
import { Profile } from './pages/Profile';

Amplify.configure(awsExports);

export const App = () => {
  // Auth.currentSession()
  // .then(data => {
  //   const accessToken = data.getAccessToken();
  // })

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage />
          }
        />

        <Route
          path="home"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="authenticator"
          element={<Authenticator><MainPage /></Authenticator>}
        />

        <Route
          path="author"
          element={<AuthorPage />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        <Route
          path="united24"
          element={
            <Fund />
          }
        />
        <Route
          path="about"
          element={
            <AboutUs />
          }
        />
        <Route path="gallery">
          <Route
            index
            element={<Catalog />}
          />
        <Route
          path=":paintingId"
          element={<PaintingPage />}
        />
        </Route>
        <Route
          path="*"
          element={
            <h1 className="title">Page not found</h1>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
