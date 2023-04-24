import React, { SetStateAction } from 'react';

type Props = {
  sortBy: string;
  setSortBy: React.Dispatch<SetStateAction<string>>;
  perPage: number;
  handlePerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SortDropdown: React.FC<Props> = ({
  sortBy,
  setSortBy,
  perPage,
  handlePerPageChange,
}) => {
  const sortByDateAsc = 'sortBy=entityCreatedAt:ASC';
  const sortByDateDesc = 'sortBy=entityCreatedAt:DESC';
  const sortByPriceAsc = 'sortBy=price:ASC;entityCreatedAt:DESC';
  const sortByPriceDesc = 'sortBy=price:DESC;entityCreatedAt:DESC';

  return (
    <div className="sorting">
      <div className="sorting-container">
        <div className="sorting-title">Sorting:</div>
        <select
          className="sortby dropdown"
          onChange={(event) => setSortBy(event.target.value)}
          value={sortBy}
        >
          <option value={sortByDateDesc}>Newest</option>
          <option value={sortByDateAsc}>Oldest</option>
          <option value={sortByPriceAsc}>Cheapest</option>
          <option value={sortByPriceDesc}>Most expensive</option>
        </select>
      </div>
      <div className="sorting-container">
        <div className="sorting-title">Per page:</div>
        <select
          className="perpage dropdown"
          onChange={handlePerPageChange}
          value={perPage}
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
        </select>
      </div>
    </div>
  );
};
