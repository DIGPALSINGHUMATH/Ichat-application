// import { Client } from '@stomp/stompjs';

// // Create a new STOMP client
// const client = new Client({
//     brokerURL: 'ws://localhost:8080/ws', // WebSocket endpoint (adjust your server URL)
//     reconnectDelay: 5000, // Try reconnecting after 5 seconds on disconnect
//     debug: function(str) {
//         console.log(str);
//     }
// });

// // Connect the client
// client.onConnect = function(frame) {
//     console.log('Connected: ' + frame);
//     console.log('Headers: ', frame.headers); // Access headers returned from server

//     // Subscribe to a topic
//     client.subscribe('/topic/messages', function(message) {
//         console.log('Received: ' + message.body);
//     });
// };

// client.onStompError = function(frame) {
//     console.error('Broker reported error: ' + frame.headers['message']);
//     console.error('Additional details: ' + frame.body);
// }

// // Activate the client
// client.activate();
