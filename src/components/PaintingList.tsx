import React from 'react';
import { PaintingCard } from './PaintingCard';
import { Painting } from '../types/painting';

type Props = {
  paintings: Painting[];
};

export const PaintingList: React.FC<Props> = ({ paintings }) => {
  return (
    <section id="gallery" className="section collection">
      <div className="container collection-list">
        {paintings.map(painting => (
            <PaintingCard
              key={painting.id}
              painting={painting}
            />
        ))}
      </div>
    </section>
  );
};

// import React from "react";

// const ProductList = ({ products }) => {
//   return (
//     <div className="product-list">
//       {products.map((product) => (
//         <div key={product.id} className="product-card">
//           <img src={product.image} alt={product.name} />
//           <h3>{product.name}</h3>
//           <p>{product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;

