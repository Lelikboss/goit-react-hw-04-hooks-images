import { useState } from 'react';
import Searchbar from './Components/Searchbar';
import ImagesList from './Components/pixabayGallery';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const getSearchValue = searchValue => setSearchValue(searchValue);

  return (
    <div>
      <Searchbar getSearchValue={getSearchValue} />
      <ImagesList searchValue={searchValue} />
    </div>
  );
}
