import { Socket } from 'socket.io';
import { listenerWrapper } from '../../../utils/listener-wrapper';
import { validate } from 'class-validator';
import * as dmService from '../../dm/services/dm-service';
import { DmEnterSingleValidator } from '../validators/dm-enter-single-validator';
import { DmEnterSingleOnceValidator } from '../validators/dm-enter-single-once-validator';
import { mapToPublicDm } from '../../dm/dm-mapper';

module.exports = (io: Socket, socket: Socket) => {
  const dmEnterSingle = async (...args: any[]) => {
    console.log(
      `receiving emit from client(${socket.user.username}) of event: dm:enter:single`
    );
    const data = new DmEnterSingleValidator();
    data.args = args;
    const errors = await validate(data);
    if (errors.length > 0) throw new Error(`validation error: ${errors}`);

    const singleDm = await dmService.getSingleDmInstanceByUserId(
      socket.user,
      args[0]
    );
    socket.emit('dm:enter:single', mapToPublicDm(singleDm));
  };

  const dmEnterSingleOnce = async (...args: any[]) => {
    console.log(
      `receiving emit from client(${socket.user.username}) of event: dm:enter:single:once`
    );
    const data = new DmEnterSingleOnceValidator();
    data.args = args;
    const errors = await validate(data);
    if (errors.length > 0) throw new Error(`validation error: ${errors}`);

    const singleDm = await dmService.getSingleDmInstanceById(
      socket.user,
      args[0]
    );
    if (!singleDm) {
      socket.emit('error', 'dm not found');
      return;
    }
    socket.emit('dm:enter:single:once', mapToPublicDm(singleDm));
  };

  const dmSendSingleMessage = async (...args: any[]) => {
    // TODO: validate arguments
    if (args.length !== 2) return;
    const { dmId, message }: { dmId: string; message: string } = args[0];
    const callback: ({ status }: { status: string }) => void = args[1];

    const singleDm = dmService.getSingleDmInstanceById(socket.user, dmId);
  };

  socket.on('dm:enter:single', listenerWrapper(dmEnterSingle));
  socket.on('dm:enter:single:once', listenerWrapper(dmEnterSingleOnce));
  socket.on('dm:send:single:message', listenerWrapper(dmSendSingleMessage));
};
