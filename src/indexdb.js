// //  export const openDatabase=()=> {
// //   return new Promise((resolve, reject) => {
// //     const request = indexedDB.open('MessageDB', 1);
// //     request.onupgradeneeded = (event) => {
// //       const db = event.target.result;
// //       const objectStore = db.createObjectStore('messages', { keyPath: 'id'});
// //       objectStore.createIndex('timestamp', 'timestamp', { unique: false });
// //     };
// //     request.onsuccess = (event) => {
// //       resolve(event.target.result);
// //     };
// //     request.onerror = (event) => {
// //       reject(event.target.error);
// //     };
// //   });
// // }
// // export const storeMessage=(db, userId, message)=> {
// //   const transaction = db.transaction(['messages'], 'readwrite');
// //   const objectStore = transaction.objectStore('messages');

// //   const messageWithUserId = { ...message, userId }; // Add userId to the message
// //   objectStore.add(messageWithUserId);
// // }
// // export const getMessagesFromIndexedDB=(db)=> {
// //   return new Promise((resolve, reject) => {
// //     const transaction = db.transaction(['messages'], 'readonly');
// //     const objectStore = transaction.objectStore('messages');
// //     const request = objectStore.getAll();
// //     request.onsuccess = () => {
// //       resolve(request.result);
// //     };
// //     request.onerror = (event) => {
// //       reject(event.target.error);
// //     };
// //   });
// // }



// export function openDatabase() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open('MessageDB', 1);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       const objectStore = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
//       objectStore.createIndex('userId', 'userId', { unique: false });
//       objectStore.createIndex('timestamp', 'timestamp', { unique: false });
//     };

//     request.onsuccess = (event) => {
//       resolve(event.target.result);
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// }

// // Function to check if a user's messages exist
// export function checkIfMessagesExist(db, userId) {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction(['messages'], 'readonly');
//     const objectStore = transaction.objectStore('messages');
//     const userIndex = objectStore.index('userId');
//     const request = userIndex.getAll(userId); // Get all messages for the specific user

//     request.onsuccess = () => {
//       resolve(request.result); // Return the list of user's messages
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// }

// // Function to delete old messages for a user
// export function deleteMessagesByUserId(db, userId) {
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction(['messages'], 'readwrite');
//     const objectStore = transaction.objectStore('messages');
//     const userIndex = objectStore.index('userId');
//     const request = userIndex.openCursor(userId); // Open a cursor to iterate over user's messages

//     request.onsuccess = (event) => {
//       const cursor = event.target.result;
//       if (cursor) {
//         cursor.delete(); // Delete each record
//         cursor.continue(); // Move to the next
//       } else {
//         resolve(); // All records deleted
//       }
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// }

// // Function to add new messages
// export function addMessage(db, message) {
//   const transaction = db.transaction(['messages'], 'readwrite');
//   const objectStore = transaction.objectStore('messages');

//   const request = objectStore.add(message); // Add new message

//   request.onsuccess = () => {
//     console.log('Message added to IndexedDB:', message);
//   };

//   request.onerror = (event) => {
//     console.error('Error adding message:', event.target.error);
//   };
// }