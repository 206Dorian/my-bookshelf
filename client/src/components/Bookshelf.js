import React from 'react'
import TopShelf from './TopShelf'
import './Bookshelf.css'
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../utils/queries'; // Define your GraphQL query

const Bookshelf = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { books } = data; // Assuming your GraphQL query returns an array of books


  return (
    <div id='bookshelfContainer'>
<div id='bookshelf'>
    {/*  this is an idea about how to structure the shelf, things to consider:
    1 how do we want to populate the shelves? should the entires have an number 1-100? each shelf should hold 1-25.
    */}

    <TopShelf/>
    {/*
        <TopShelf books={books.slice(0, 25)} />
        <SecondShelf books={books.slice(25, 50)} />
        <ThirdShelf books={books.slice(50, 75)} />
         <FourthShelf books={books.slice(75, 100)} />
    */}



</div>

    </div>
  )
}

export default Bookshelf



