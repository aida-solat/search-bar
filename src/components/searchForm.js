import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';

function SearchForm() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    console.log('Current search results:', searchResults);
  }, [searchResults]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === '') {
      setSearchResults([]);
      setSearchPerformed(false);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setSearchPerformed(true);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data = await response.json();
      console.log('Data from API:', data);
      setSearchResults(data);
    } catch (error) {
      console.log('Failed to fetch search results:', error);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search...'
          required
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button
          type='submit'
          className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Search
        </button>
      </div>
      <div>
        {searchResults.length > 0 && searchPerformed && (
          <div className='overflow-x-auto mt-4'>
            <Table>
              <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Body</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {searchResults.map((result) => {
                  console.log('result:', result);
                  const escapeRegExp = (string) => {
                    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                  };

                  const searchInputEscaped = escapeRegExp(searchInput);

                  const titleParts = result.title.split(
                    new RegExp(`\\b(${searchInputEscaped})\\b`, 'gi'),
                  );
                  const bodyParts = result.body.split(
                    new RegExp(`\\b(${searchInputEscaped})\\b`, 'gi'),
                  );

                  return (
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                        {titleParts.map((part, index) =>
                          part.toLowerCase() === searchInput.toLowerCase() ? (
                            <mark
                              key={index}
                              style={{
                                backgroundColor: 'yellow',
                                fontWeight: 'bold',
                              }}
                            >
                              {part}
                            </mark>
                          ) : (
                            part
                          ),
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {bodyParts.map((part, index) =>
                          part.toLowerCase() === searchInput.toLowerCase() ? (
                            <mark
                              key={index}
                              style={{
                                backgroundColor: 'yellow',
                                fontWeight: 'bold',
                              }}
                            >
                              {part}
                            </mark>
                          ) : (
                            part
                          ),
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
