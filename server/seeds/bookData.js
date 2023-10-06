const bookData = [
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
  {
    title: '1984',
    author: 'George Orwell',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Odyssey',
    author: 'Homer',
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
  },
  {
    title: 'The Stranger',
    author: 'Albert Camus',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
  },
  {
    title: 'The Shining',
    author: 'Stephen King',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
  },
  {
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
  },
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
  },
  {
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
  },
  {
    title: 'The Scarlet Letter',
    author: 'Nathaniel Hawthorne',
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
  },
  {
    title: 'Dracula',
    author: 'Bram Stoker',
  },
  {
    title: 'The Grapes of Wrath',
    author: 'John Steinbeck',
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Sun Also Rises',
    author: 'Ernest Hemingway',
  },
  {
    title: 'Heart of Darkness',
    author: 'Joseph Conrad',
  },
  {
    title: "The Handmaid's Tale",
    author: 'Margaret Atwood',
  },
  {
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemingway',
  },
  {
    title: 'The Wind in the Willows',
    author: 'Kenneth Grahame',
  },
  {
    title: 'The Master and Margarita',
    author: 'Mikhail Bulgakov',
  },
  {
    title: 'The Silmarillion',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
  },
  {
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
  },
  {
    title: 'The Outsiders',
    author: 'S.E. Hinton',
  },
  {
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
  },
  {
    title: 'The Lord of the Flies',
    author: 'William Golding',
  },
  {
    title: 'The Call of the Wild',
    author: 'Jack London',
  },
  {
    title: 'The Jungle',
    author: 'Upton Sinclair',
  },
  {
    title: 'The Hound of the Baskervilles',
    author: 'Arthur Conan Doyle',
  },
  {
    title: 'The War of the Worlds',
    author: 'H.G. Wells',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
  {
    title: '1984',
    author: 'George Orwell',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Odyssey',
    author: 'Homer',
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
  },
  {
    title: 'The Stranger',
    author: 'Albert Camus',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
  },
  {
    title: 'The Shining',
    author: 'Stephen King',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
  },
  {
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
  },
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
  },
  {
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
  },
  {
    title: 'The Scarlet Letter',
    author: 'Nathaniel Hawthorne',
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
  },
  {
    title: 'Dracula',
    author: 'Bram Stoker',
  },
  {
    title: 'The Grapes of Wrath',
    author: 'John Steinbeck',
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Sun Also Rises',
    author: 'Ernest Hemingway',
  },
  {
    title: 'Heart of Darkness',
    author: 'Joseph Conrad',
  },
  {
    title: "The Handmaid's Tale",
    author: 'Margaret Atwood',
  },
  {
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemingway',
  },
  {
    title: 'The Wind in the Willows',
    author: 'Kenneth Grahame',
  },
  {
    title: 'The Master and Margarita',
    author: 'Mikhail Bulgakov',
  },
  {
    title: 'The Silmarillion',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
  },
  {
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
  },
  {
    title: 'The Outsiders',
    author: 'S.E. Hinton',
  },
  {
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
  },
  {
    title: 'The Lord of the Flies',
    author: 'William Golding',
  },
  {
    title: 'The Call of the Wild',
    author: 'Jack London',
  },
  {
    title: 'The Jungle',
    author: 'Upton Sinclair',
  },
  {
    title: 'The Hound of the Baskervilles',
    author: 'Arthur Conan Doyle',
  },
  {
    title: 'The War of the Worlds',
    author: 'H.G. Wells',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
  {
    title: '1984',
    author: 'George Orwell',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'The Odyssey',
    author: 'Homer',
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
  },
  {
    title: 'The Stranger',
    author: 'Albert Camus',
  },
];

function generatePlacement() {
  return Math.floor(Math.random() * 100) + 1;
}

// Format the bookData array with placement
const formattedBookData = bookData.map((book, index) => ({
  title: book.title,
  author: book.author,
  placement: generatePlacement(), // Generate random placement
}));
