import { io } from '..';

io.on('friendsPresence', () => {
  console.log('subscribe to friendsPresence');
});
