import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Define an async function called putDb that takes a parameter called content
export const putDb = async (content) => {
  // Log an error message indicating that the function is not yet implemented
  console.error('putDb not implemented')
  // Create a new transaction with read-write access to the 'jate' object store
  const txt = jateDb.transaction('jate', 'readwrite');
  // Open the 'jate' database
  const jateDb = await openDB('jate', 1);
  // Get a reference to the 'jate' object store
  const store = txt.objectStore('jate');
  const results = await request;
  // Send a request to add the content to the database
  const request = store.put({ jate: content });
  // Log a message indicating that the content was saved
  console.log('Saved!', results);
};


// Define an async function called getDb
export const getDb = async () =>{ 
   // Log an error message indicating that the function is not yet implemented
  console.error('getDb not implemented');
   // Open the 'jate' database
  const jateDb = await openDB('jate', 1);
  // Create a new transaction with read-only access to the 'jate' object store
  const txt = jateDb.transaction('jate', 'readonly');
  // Get a reference to the 'jate' object store
  const store = txt.objectStore('jate');
  // Log the results of the request
  const results = await request;
  console.log('results.value', results);
   // Send a request to get all the content from the database
  const request = store.getAll();
}
// Call the initdb function to create or upgrade the database
initdb();