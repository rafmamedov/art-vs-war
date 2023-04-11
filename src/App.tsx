import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { MainPage } from './pages/MainPage';
import { Painting} from './types/painting';
import axios from 'axios';
import './styles.scss'
import 'bulma/css/bulma.css';
import { Footer } from './components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Catalog } from './pages/Catalog';
import { JoinUs } from './components/JoinUs';
import { Fund } from './components/Fund';
import { AboutUs } from './components/AboutUs';
import { PaintingPage } from './pages/PaintingPage';

const URL = 'https://www.albedosunrise.com/paintings';
const UPLOAD = 'https://www.albedosunrise.com/images/getUrl?extension=jpeg';
const SEARCH = 'https://www.albedosunrise.com/paintings/search?';

export const App: React.FC= () => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [selectedImage, setSelectedImage] = useState<FileList | null>(null);
  const [sortBy, setSortBy] = useState('');

  // const imageData: Picture = {
  //   id: 0,
  //   title: 'Test Image',
  //   price: 1000,
  //   author: {
  //     id: 0,
  //     name: 'Taras Shevchenko',
  //     country: 'Ukraine',
  //     city: 'Kyiv',
  //     shortStory: 'Super cool picture',
  //   },
  //   description: 'Picture',
  //   style: {
  //     id: 0,
  //     name: 'Contemporary',
  //   },
  //   medium: {
  //     id: 0,
  //     name: 'Acryl',
  //   },
  //   support: {
  //     id: 0,
  //     name: 'Paper',
  //   },
  //   height: 100,
  //   width: 50,
  //   imageUrl: 'https://dwlkukrr7iwjb.cloudfront.net/Flowers.jpg',
  // }

  const getAllPaintingsFromServer = async () => {
    axios.get(URL)
      .then((response) => {
        setPaintings(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getAllPaintingsFromServer();
  }, []);

  const getFilteredPaintings = async (filters: string = '') => {
    sortBy.length > 0
      ? await axios.get(SEARCH + filters + '&' + sortBy)
          .then((response) => {
            setPaintings(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
      : await axios.get(SEARCH + filters)
          .then((response) => {
            setPaintings(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const onFileUpload = async () => {
    console.log('onFileUpload');
    axios.get(UPLOAD)
    .then((response) => {
      const {
        imagePutUrl,
        imageFileName,
      } = response.data;

      selectedImage && axios.put(imagePutUrl, selectedImage[0])
        .then(response => {
          console.log('save image request', response);

          const imageDataPost = {
            title: 'Test Image',
            price: 1000,
            authorId: 1,
            description: 'Picture',
            yearOfCreation: 2020,
            createdAt: new Date(),
            height: 100,
            width: 50,
            styleId: 1,
            mediumId: 1,
            supportId: 1,
            imageFileName: imageFileName,
          };

          axios.post(URL, imageDataPost)
            .then(response => console.log('post other fields', response))
            .catch(error => console.log('error', error));
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((error) => {
      console.log(error);
    })
  }


  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(event.target.files);
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<MainPage getAll={getAllPaintingsFromServer} paintings={paintings} />}
        />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />

        <Route
          path="gallery"
          element={
            <Catalog
              sortBy={sortBy}
              search={SEARCH}
              setSortBy={setSortBy}
              paintings={paintings}
              setPaintings={setPaintings}
              getFiltered={getFilteredPaintings}
            />
          }
        />

        <Route path="authors" element={<JoinUs />} />
        <Route path="united24" element={<Fund getAll={getAllPaintingsFromServer} />} />
        <Route path="about" element={<AboutUs getAll={getAllPaintingsFromServer} />} />
        <Route path="painting" element={<PaintingPage />} />
      </Routes>
      <Footer />
    </>
  );
}