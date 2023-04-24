import { NavBar } from './components/NavBar';
import { MainPage } from './pages/MainPage';
import './styles.scss'
import { Footer } from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Catalog } from './pages/Catalog';
import { Fund } from './components/Fund';
import { PaintingPage } from './pages/PaintingPage';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { AuthorPage } from './pages/AuthorPage';
import { Profile } from './pages/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { About } from './pages/About';
import { Authors } from './pages/Authors';

Amplify.configure(awsExports);

const CREATEAUTHOR = 'https://www.albedosunrise.com/authors';

export const App = () => {
  const { user, route } = useAuthenticator((context) => [context.route]);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const isAuthentificated = route === 'authenticated';

  const createAuthor = async () => {
    const body = {
      'id': user.username,
    }

    await axios.post(CREATEAUTHOR, body)
  }

  useEffect(() => {
    if (isAuthentificated) {
      setIsAuthenticating(false);
    }

    if (route === 'confirmSignUp') {
      createAuthor();
    }

    if ((user && user.username?.includes('google'))
      || (user && user.username?.includes('facebook'))) {
        createAuthor()
      }
  }, [route]);

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
                path="authors"
                element={<Authors />}
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
                <About />
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
