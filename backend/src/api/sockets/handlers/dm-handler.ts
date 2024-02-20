import { Socket } from 'socket.io';
import * as dmService from '../../dm/services/dm-service';
import * as messageService from '../../dm/services/message-service';
import { EnterSingleDmValidator } from '../validators/enter-single-dm-validator';
import { GetSingleDmValidator } from '../validators/get-single-dm-validator';
import { mapToPublicDm } from '../../dm/dm-mapper';
import { validateEventArgument } from '../../../utils/validate-event-argument';
import { SendMessageSingleDmValidator } from '../validators/send-message-single-dm-validator';
import { listenerWrapper } from '../../../utils/listener-wrapper';

module.exports = (io: Socket, socket: Socket) => {
  const enterSingleDm = async (...args: any[]) => {
    console.info('event triggered: dm:single:enter from', socket.user.username);
    const data = await validateEventArgument(new EnterSingleDmValidator(args));
    const singleDm = await dmService.getSingleDm(socket.user, data.otherId);
    socket.join('dm:single:' + singleDm.id);
    socket.emit('dm:single:enter', singleDm.id);
  };

  const getSingleDm = async (...args: any[]) => {
    console.info('event triggered: dm:single:getDm from', socket.user.username);
    const data = await validateEventArgument(new GetSingleDmValidator(args));
    const singleDm = await dmService.getSingleDm(socket.user, data.dmId);
    if (!singleDm) {
      socket.emit('error', 'dm not found');
      return;
    }
    socket.emit('dm:single:getDm', mapToPublicDm(singleDm));
  };

  const sendMessageSingleDm = async (...args: any[]) => {
    console.info(
      'event triggered: dm:single:sendMessage from',
      socket.user.username
    );
    const data = await validateEventArgument(
      new SendMessageSingleDmValidator(args)
    );
    const singleDm = await dmService.getSingleDm(socket.user, data.dmId);
    const message = await messageService.saveSingleTextMessage(
      socket.user,
      singleDm,
      data.message
    );
    console.log(Array.from(socket.rooms));
    io.in('dm:single:' + singleDm.id).emit(
      'dm:single:sendMessage',
      'success',
      // message
      'weofijweofiwjeofi'
    );
  };

  socket.on('dm:single:enter', listenerWrapper(socket, enterSingleDm));
  socket.on('dm:single:getDm', listenerWrapper(socket, getSingleDm));
  socket.on(
    'dm:single:sendMessage',
    listenerWrapper(socket, listenerWrapper(socket, sendMessageSingleDm))
  );
};
