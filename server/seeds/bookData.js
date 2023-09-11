const bookData = [
    {
        count: '1',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
    },
    {
        count: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
    },
    {
        count: '3',
        title: '1984',
        author: 'George Orwell',
    },
    {
        count: '4',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
    },
    {
        count: '5',
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
    },
    {
        count: '6',
        title: 'Brave New World',
        author: 'Aldous Huxley',
    },
    {
        count: '7',
        title: 'Moby-Dick',
        author: 'Herman Melville',
    },
    {
        count: '8',
        title: 'War and Peace',
        author: 'Leo Tolstoy',
    },
    {
        count: '9',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '10',
        title: 'The Odyssey',
        author: 'Homer',
    },
    {
        count: '11',
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
    },
    {
        count: '12',
        title: 'The Stranger',
        author: 'Albert Camus',
    },
    {
        count: '13',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '14',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
    },
    {
        count: '15',
        title: 'The Shining',
        author: 'Stephen King',
    },
    {
        count: '16',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
    },
    {
        count: '17',
        title: 'The Brothers Karamazov',
        author: 'Fyodor Dostoevsky',
    },
    {
        count: '18',
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
    },
    {
        count: '19',
        title: 'The Count of Monte Cristo',
        author: 'Alexandre Dumas',
    },
    {
        count: '20',
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
    },
    {
        count: '21',
        title: 'The Picture of Dorian Gray',
        author: 'Oscar Wilde',
    },
    {
        count: '22',
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
    },
    {
        count: '23',
        title: 'The Scarlet Letter',
        author: 'Nathaniel Hawthorne',
    },
    {
        count: '24',
        title: 'Frankenstein',
        author: 'Mary Shelley',
    },
    {
        count: '25',
        title: 'Dracula',
        author: 'Bram Stoker',
    },
    {
        count: '26',
        title: 'The Grapes of Wrath',
        author: 'John Steinbeck',
    },
    {
        count: '27',
        title: 'The Road',
        author: 'Cormac McCarthy',
    },
    {
        count: '28',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '29',
        title: 'The Sun Also Rises',
        author: 'Ernest Hemingway',
    },
    {
        count: '30',
        title: 'Heart of Darkness',
        author: 'Joseph Conrad',
    },
    {
        count: '31',
        title: 'The Handmaid\'s Tale',
        author: 'Margaret Atwood',
    },
    {
        count: '32',
        title: 'The Old Man and the Sea',
        author: 'Ernest Hemingway',
    },
    {
        count: '33',
        title: 'The Wind in the Willows',
        author: 'Kenneth Grahame',
    },
    {
        count: '34',
        title: 'The Master and Margarita',
        author: 'Mikhail Bulgakov',
    },
    {
        count: '35',
        title: 'The Silmarillion',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '36',
        title: 'The Chronicles of Narnia',
        author: 'C.S. Lewis',
    },
    {
        count: '37',
        title: 'The Metamorphosis',
        author: 'Franz Kafka',
    },
    {
        count: '38',
        title: 'The Outsiders',
        author: 'S.E. Hinton',
    },
    {
        count: '39',
        title: 'The Secret Garden',
        author: 'Frances Hodgson Burnett',
    },
    {
        count: '40',
        title: 'The Lord of the Flies',
        author: 'William Golding',
    },
    {
        count: '41',
        title: 'The Call of the Wild',
        author: 'Jack London',
    },
    {
        count: '42',
        title: 'The Jungle',
        author: 'Upton Sinclair',
    },
    {
        count: '43',
        title: 'The Hound of the Baskervilles',
        author: 'Arthur Conan Doyle',
    },
    {
        count: '44',
        title: 'The War of the Worlds',
        author: 'H.G. Wells',
    },
    {
        count: '45',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
    },
    {
        count: '46',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
    },
    {
        count: '47',
        title: '1984',
        author: 'George Orwell',
    },
    {
        count: '48',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
    },
    {
        count: '49',
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
    },
    {
        count: '50',
        title: 'Brave New World',
        author: 'Aldous Huxley',
    },
    {
        count: '51',
        title: 'Moby-Dick',
        author: 'Herman Melville',
    },
    {
        count: '52',
        title: 'War and Peace',
        author: 'Leo Tolstoy',
    },
    {
        count: '53',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '54',
        title: 'The Odyssey',
        author: 'Homer',
    },
    {
        count: '55',
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
    },
    {
        count: '56',
        title: 'The Stranger',
        author: 'Albert Camus',
    },
    {
        count: '57',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '58',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
    },
    {
        count: '59',
        title: 'The Shining',
        author: 'Stephen King',
    },
    {
        count: '60',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
    },
    {
        count: '61',
        title: 'The Brothers Karamazov',
        author: 'Fyodor Dostoevsky',
    },
    {
        count: '62',
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
    },
    {
        count: '63',
        title: 'The Count of Monte Cristo',
        author: 'Alexandre Dumas',
    },
    {
        count: '64',
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
    },
    {
        count: '65',
        title: 'The Picture of Dorian Gray',
        author: 'Oscar Wilde',
    },
    {
        count: '66',
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
    },
    {
        count: '67',
        title: 'The Scarlet Letter',
        author: 'Nathaniel Hawthorne',
    },
    {
        count: '68',
        title: 'Frankenstein',
        author: 'Mary Shelley',
    },
    {
        count: '69',
        title: 'Dracula',
        author: 'Bram Stoker',
    },
    {
        count: '70',
        title: 'The Grapes of Wrath',
        author: 'John Steinbeck',
    },
    {
        count: '71',
        title: 'The Road',
        author: 'Cormac McCarthy',
    },
    {
        count: '72',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '73',
        title: 'The Sun Also Rises',
        author: 'Ernest Hemingway',
    },
    {
        count: '74',
        title: 'Heart of Darkness',
        author: 'Joseph Conrad',
    },
    {
        count: '75',
        title: 'The Handmaid\'s Tale',
        author: 'Margaret Atwood',
    },
    {
        count: '76',
        title: 'The Old Man and the Sea',
        author: 'Ernest Hemingway',
    },
    {
        count: '77',
        title: 'The Wind in the Willows',
        author: 'Kenneth Grahame',
    },
    {
        count: '78',
        title: 'The Master and Margarita',
        author: 'Mikhail Bulgakov',
    },
    {
        count: '79',
        title: 'The Silmarillion',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '80',
        title: 'The Chronicles of Narnia',
        author: 'C.S. Lewis',
    },
    {
        count: '81',
        title: 'The Metamorphosis',
        author: 'Franz Kafka',
    },
    {
        count: '82',
        title: 'The Outsiders',
        author: 'S.E. Hinton',
    },
    {
        count: '83',
        title: 'The Secret Garden',
        author: 'Frances Hodgson Burnett',
    },
    {
        count: '84',
        title: 'The Lord of the Flies',
        author: 'William Golding',
    },
    {
        count: '85',
        title: 'The Call of the Wild',
        author: 'Jack London',
    },
    {
        count: '86',
        title: 'The Jungle',
        author: 'Upton Sinclair',
    },
    {
        count: '87',
        title: 'The Hound of the Baskervilles',
        author: 'Arthur Conan Doyle',
    },
    {
        count: '88',
        title: 'The War of the Worlds',
        author: 'H.G. Wells',
    },
    {
        count: '89',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
    },
    {
        count: '90',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
    },
    {
        count: '91',
        title: '1984',
        author: 'George Orwell',
    },
    {
        count: '92',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
    },
    {
        count: '93',
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
    },
    {
        count: '94',
        title: 'Brave New World',
        author: 'Aldous Huxley',
    },
    {
        count: '95',
        title: 'Moby-Dick',
        author: 'Herman Melville',
    },
    {
        count: '96',
        title: 'War and Peace',
        author: 'Leo Tolstoy',
    },
    {
        count: '97',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
    },
    {
        count: '98',
        title: 'The Odyssey',
        author: 'Homer',
    },
    {
        count: '99',
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
    },
    {
        count: '100',
        title: 'The Stranger',
        author: 'Albert Camus',
    },



];

