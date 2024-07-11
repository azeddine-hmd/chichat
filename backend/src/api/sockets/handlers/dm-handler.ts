import { Server, Socket } from 'socket.io';
import * as dmService from '../../dm/services/dm-service';
import * as messageService from '../../dm/services/message-service';
import { EnterSingleDmValidator } from '../validators/enter-single-dm-validator';
import { GetSingleDmValidator } from '../validators/get-single-dm-validator';
import { mapToPublicDm } from '../../dm/dm-mapper';
import { validateEventArgument } from '../../../utils/validate-event-argument';
import { SendMessageSingleDmValidator } from '../validators/send-message-single-dm-validator';
import { listenerWrapper } from '../../../utils/listener-wrapper';
import { GetMessagesSingleDmValidator } from '../validators/get-messages-single-dm-validator';
import { mapToMessage } from '../../dm/message-mapper';

module.exports = (io: Server, socket: Socket) => {
  const enterSingleDm = async (...args: any[]) => {
    console.info('event triggered: dm:single:enter from', socket.user.username);
    const { otherId } = await validateEventArgument(
      new EnterSingleDmValidator(args)
    );
    const singleDm = await dmService.getSingleDm(socket.user, otherId);
    socket.join('dm:single:' + singleDm.id);
    console.log(
      'dm:single:' + singleDm.id + ' socket exists are:',
      io.sockets.adapter.rooms.get('dm:single:' + singleDm.id)
    );
    socket.emit('dm:single:enter', singleDm.id);
  };

  const getSingleDm = async (...args: any[]) => {
    console.info('event triggered: dm:single:getDm from', socket.user.username);
    const { dmId } = await validateEventArgument(
      new GetSingleDmValidator(args)
    );
    const singleDm = await dmService.getSingleDm(socket.user, dmId);
    if (!singleDm) {
      socket.emit('error', 'dm not found');
      return;
    }
    socket.join('dm:single:' + singleDm.id);
    console.log(
      'dm:single:' + singleDm.id + ' socket exists are:',
      io.sockets.adapter.rooms.get('dm:single:' + singleDm.id)
    );
    socket.emit('dm:single:getDm', mapToPublicDm(singleDm));
  };

  const saveMessageSingleDm = async (...args: any[]) => {
    console.info(
      'event triggered: dm:single:sendMessage from',
      socket.user.username
    );
    const { dmId, message } = await validateEventArgument(
      new SendMessageSingleDmValidator(args)
    );
    const singleDm = await dmService.getSingleDm(socket.user, dmId);
    const msg = await messageService.saveSingleMessage(
      socket.user,
      singleDm,
      message
    );
    console.log(
      'dm:single:' + singleDm.id + ' socket exists are:',
      io.sockets.adapter.rooms.get('dm:single:' + singleDm.id)
    );
    io.in('dm:single:' + singleDm.id).emit(
      'dm:single:receivedMessage',
      mapToMessage(msg)
    );
  };

  const getMessagesSingleDm = async (...args: any[]) => {
    console.info(
      'event triggered: dm:single:getMessages from',
      socket.user.username
    );
    const { dmId, ackFn } = await validateEventArgument(
      new GetMessagesSingleDmValidator(args)
    );
    const messages = await messageService.getMessages(socket.user, dmId);
    ackFn(messages.map((message) => mapToMessage(message)));
  };

  socket.on('dm:single:enter', listenerWrapper(socket, enterSingleDm));
  socket.on('dm:single:getDm', listenerWrapper(socket, getSingleDm));
  socket.on(
    'dm:single:saveMessage',
    listenerWrapper(socket, listenerWrapper(socket, saveMessageSingleDm))
  );
  socket.on(
    'dm:single:getMessages',
    listenerWrapper(socket, getMessagesSingleDm)
  );
};
