import { Socket } from 'socket.io';
import * as dmService from '../../dm/services/dm-service';
import * as messageService from '../../dm/services/message-service';
import { EnterSingleDmValidator } from '../validators/enter-single-dm-validator';
import { GetSingleDmValidator } from '../validators/get-single-dm-validator';
import { mapToPublicDm } from '../../dm/dm-mapper';
import { validateEventArgument } from '../../../utils/validate-event-argument';
import { SendMessageSingleDmValidator } from '../validators/send-message-single-dm-validator';
import { listenerWrapper } from '../../../utils/listener-wrapper';
import { GetMessagesSingleDmValidator } from '../validators/get-messages-single-dm-validator';

module.exports = (io: Socket, socket: Socket) => {
  const enterSingleDm = async (...args: any[]) => {
    console.info('event triggered: dm:single:enter from', socket.user.username);
    const { otherId } = await validateEventArgument(
      new EnterSingleDmValidator(args)
    );
    const singleDm = await dmService.getSingleDm(socket.user, otherId);
    socket.join('dm:single:' + singleDm.id);
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
    const messageRecord = await messageService.saveSingleTextMessage(
      socket.user,
      singleDm,
      message
    );
    io.in('dm:single:' + singleDm.id).emit(
      'dm:single:saveMessage',
      'success',
      messageRecord.messageContent.contentText // TODO: this is extermly dangerous
    );
  };

  const getMessagesSingleDm = async (...args: any[]) => {
    console.info(
      'event triggered: dm:single:getMessages from',
      socket.user.username
    );
    const { dmId } = await validateEventArgument(
      new GetMessagesSingleDmValidator(args)
    );
    const messages = await messageService.getMessages(socket.user, dmId);
    socket.emit(
      'dm:single:getMessages',
      // messages.map((message) => {
      //   return mapToMessage(message)
      // })
      messages.map((message) => {
        return message.messageContent.contentText;
      })
    );
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
