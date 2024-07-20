import { Server, Socket } from 'socket.io';
import * as chatRoomService from '../../chat-room/services/chat-room-service';
import * as messageService from '../../chat-room/services/message-service';
import { EnterDirectChatRoomValidator } from '../validators/enter-direct-chat-room-validator';
import { GetChatRoomValidator } from '../validators/get-chat-room-validator';
import { validateEventArgument } from '../../../utils/validate-event-argument';
import { listenerWrapper } from '../../../utils/listener-wrapper';
import { mapToMessage } from '../../chat-room/message-mapper';
import { SendMessageChatRoomValidator } from '../validators/send-message-chat-room-validator';
import { GetMessagesChatRoomValidator } from '../validators/get-messages-chat-room-validator';
import { DeleteMessageChatRoomValidator } from '../validators/delete-message-chat-room-validator';
import { mapToPublicChatRoom } from '../../chat-room/chat-room-mapper';
import { UpdateMessagechatRoomValidator } from '../validators/update-message-chat-room-validator';

module.exports = (io: Server, socket: Socket) => {
  const enterDirectChatRoom = async (...args: any[]) => {
    console.info(
      'event triggered: chatroom:direct:enter from',
      socket.user.username
    );
    const { otherId } = await validateEventArgument(
      new EnterDirectChatRoomValidator(args)
    );
    const directChatRoom = await chatRoomService.getChatRoom(
      socket.user,
      otherId
    );
    socket.join('chatroom:' + directChatRoom.id);
    console.log(
      'chatroom:' + directChatRoom.id + ' socket exists are:',
      io.sockets.adapter.rooms.get('chatroom:' + directChatRoom.id)
    );
    socket.emit('chatroom:direct:enter', directChatRoom.id);
  };

  const getChatRoom = async (...args: any[]) => {
    console.info(
      'event triggered: chatroom:getChatRoom from',
      socket.user.username
    );
    const { chatRoomId } = await validateEventArgument(
      new GetChatRoomValidator(args)
    );
    const chatRoom = await chatRoomService.getChatRoom(socket.user, chatRoomId);
    if (!chatRoom) {
      socket.emit('error', 'chatroom not found');
      return;
    }
    socket.join('chatroom:' + chatRoom.id);
    console.log(
      'chatroom:' + chatRoom.id + ' socket exists are:',
      io.sockets.adapter.rooms.get('chatroom:' + chatRoom.id)
    );
    socket.emit(
      'chatroom:getChatRoom',
      mapToPublicChatRoom(socket.user.id, chatRoom)
    );
  };

  const saveMessageChatRoom = async (...args: any[]) => {
    console.info(
      'event triggered: chatroom:sendMessage from',
      socket.user.username
    );
    const { chatRoomId, message } = await validateEventArgument(
      new SendMessageChatRoomValidator(args)
    );
    const chatRoom = await chatRoomService.getChatRoom(socket.user, chatRoomId);
    const msg = await messageService.saveMessage(
      socket.user,
      chatRoom,
      message
    );
    console.log(
      'chatroom:' + chatRoom.id + ' socket exists are:',
      io.sockets.adapter.rooms.get('chatroom:' + chatRoom.id)
    );
    io.in('chatroom:' + chatRoom.id).emit(
      'chatroom:receivedMessage',
      mapToMessage(msg)
    );
  };

  const getMessagesChatRoom = async (...args: any[]) => {
    console.info(
      'event triggered: chatroom:getMessages from',
      socket.user.username
    );
    const { chatRoomId, ackFn } = await validateEventArgument(
      new GetMessagesChatRoomValidator(args)
    );
    const messages = await messageService.getMessages(socket.user, chatRoomId);
    ackFn(messages.map((message) => mapToMessage(message)));
  };

  const deleteMessageChatRoom = async (...args: any[]) => {
    console.info(
      'event triggered: chatroom:deleteMessage from',
      socket.user.username
    );
    const { chatRoomId, messageId } = await validateEventArgument(
      new DeleteMessageChatRoomValidator(args)
    );
    const { success } = await messageService.deleteMessage(
      socket.user,
      chatRoomId,
      messageId
    );
    io.in('chatroom:' + chatRoomId).emit(
      'chatroom:deleteMessage',
      messageId,
      success
    );
  };

  const updateMessageChatRoom = async (...args: any[]) => {
    console.info(
      'event triggered: chatroom:updateMessage from',
      socket.user.username
    );
    const { chatRoomId, messageId, newContent } = await validateEventArgument(
      new UpdateMessagechatRoomValidator(args)
    );
    const { success, newMessage } = await messageService.updateMessage(
      socket.user,
      chatRoomId,
      messageId,
      newContent
    );
    io.in('chatroom:' + chatRoomId).emit(
      'chatroom:updateMessage',
      success,
      newMessage
    );
  };

  socket.on(
    'chatroom:direct:enter',
    listenerWrapper(socket, enterDirectChatRoom)
  );
  socket.on('chatroom:getChatRoom', listenerWrapper(socket, getChatRoom));
  socket.on(
    'chatroom:saveMessage',
    listenerWrapper(socket, listenerWrapper(socket, saveMessageChatRoom))
  );
  socket.on(
    'chatroom:getMessages',
    listenerWrapper(socket, getMessagesChatRoom)
  );
  socket.on(
    'chatroom:deleteMessage',
    listenerWrapper(socket, deleteMessageChatRoom)
  );
  socket.on('chatroom:updateMessage', updateMessageChatRoom);
};
