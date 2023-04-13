import { NavBar } from './components/NavBar';
import { MainPage } from './pages/MainPage';
import './styles.scss'
import 'bulma/css/bulma.css';
import { Footer } from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Catalog } from './pages/Catalog';
import { JoinUs } from './components/JoinUs';
import { Fund } from './components/Fund';
import { AboutUs } from './components/AboutUs';
import { PaintingPage } from './pages/PaintingPage';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);


  // const UPLOAD = 'https://www.albedosunrise.com/images/getUrl?extension=jpeg';
  // const [selectedImage, setSelectedImage] = useState<FileList | null>(null);

  // const onFileUpload = async () => {
  //   console.log('onFileUpload');
  //   axios.get(UPLOAD)
  //   .then((response) => {
  //     const {
  //       imagePutUrl,
  //       imageFileName,
  //     } = response.data;

  //     selectedImage && axios.put(imagePutUrl, selectedImage[0])
  //       .then(response => {
  //         console.log('save image request', response);

  //         const imageDataPost = {
  //           title: 'Test Image',
  //           price: 1000,
  //           authorId: 1,
  //           description: 'Picture',
  //           yearOfCreation: 2020,
  //           createdAt: new Date(),
  //           height: 100,
  //           width: 50,
  //           styleId: 1,
  //           mediumId: 1,
  //           supportId: 1,
  //           imageFileName: imageFileName,
  //         };

  //         axios.post(URL, imageDataPost)
  //           .then(response => console.log('post other fields', response))
  //           .catch(error => console.log('error', error));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }

  // const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedImage(event.target.files);
  // }

export const App = () => {
  const { route, signOut, toSignIn, toSignUp } = useAuthenticator((context) => [context.route]);
  // Use the value of route to decide which page to render
  const isAuthentificated = route === 'authenticated';

  return (
    <>
      <NavBar
        signIn={toSignIn}
        signOut={signOut}
        signUp={toSignUp}
        isAuthentificated={isAuthentificated}
      />

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
          element={<Authenticator ><MainPage /></Authenticator>}
        />
        <Route
          path="authors"
          element={<JoinUs />}
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
