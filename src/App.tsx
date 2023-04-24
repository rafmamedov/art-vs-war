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
import { About } from './pages/About';
import { Authors } from './pages/Authors';

Amplify.configure(awsExports);

export const App = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const isAuthentificated = route === 'authenticated';

  useEffect(() => {
    if (isAuthentificated) {
      setIsAuthenticating(false);
    }
  }, [route, isAuthentificated]);

  useEffect(() => {
    document.body.scrollTo(0, 0);
  });

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
