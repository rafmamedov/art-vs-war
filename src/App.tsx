import { NavBar } from './components/NavBar';
import { MainPage } from './pages/MainPage';
import './styles.scss'
import 'bulma/css/bulma.css';
import { Footer } from './components/Footer';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Catalog } from './pages/Catalog';
import { Fund } from './components/Fund';
import { AboutUs } from './components/AboutUs';
import { PaintingPage } from './pages/PaintingPage';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { AuthorPage } from './pages/AuthorPage';
import { Profile } from './pages/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';

Amplify.configure(awsExports);

const CREATEAUTHOR = 'https://www.albedosunrise.com/authors';

export const App = () => {
  const { user, route } = useAuthenticator((context) => [context.route]);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const isAuthentificated = route === 'authenticated';
  const location = useLocation();

  console.log();

  const createAuthor = async () => {
    if (route === 'confirmSignUp') {
      const body = {
        'id': user.username,
      }
      await axios.post(CREATEAUTHOR, body)
    }
  }

  useEffect(() => {
    if (isAuthentificated) {
      setIsAuthenticating(false);
      createAuthor();
    }

    location.pathname !== '/' && setIsAuthenticating(false);
  }, [isAuthentificated, location]);

  return (
    <>
      <NavBar
        onAuthenticating={setIsAuthenticating}
      />
      {isAuthenticating
        ? <Authenticator />
        : (
          <Routes>
            <Route
              path="/"
              element={
                <MainPage onAuthenticating={setIsAuthenticating} />
              }
            />

            <Route
              path="home"
              element={
                <Navigate to="/" replace />
              }
            />

              <Route
                path=":authorId"
                element={<AuthorPage />}
              />

              <Route
                path="profile"
                element={<Authenticator><Profile /></Authenticator>}
              />

              <Route
                path="author"
                element={<AuthorPage />}
              />

            <Route
              path="callback"
              element={<Authenticator><Profile /></Authenticator>}
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
        )}
      <Footer />
    </>
  );
}
