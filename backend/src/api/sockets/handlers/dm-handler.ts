import { Socket } from 'socket.io';
import { listenerWrapper } from '../../../utils/listener-wrapper';
import { validate } from 'class-validator';
import * as dmService from '../../dm/services/dm-service';
import { SingleNumberArray } from '../validators/single-number-array-validator';
import { mapToPublicDm } from '../../dm/dm-mapper';

module.exports = (io: Socket, socket: Socket) => {
  socket.unsavedSingleDms = [];

  const dmEnterSingle = async (...args: any[]) => {
    console.log(
      `receiving emit from client(${socket.user.username}) of event: dm:enter:single`
    );
    const data = new SingleNumberArray();
    data.args = args;
    const errors = await validate(data);
    if (errors.length > 0) throw new Error(`validation error: ${errors}`);

    const { firstTime, dm, unsavedDm } = await dmService.enterSingleDm(
      socket.user,
      args[0]
    );
    if (firstTime) {
      socket.unsavedSingleDms.push(unsavedDm);
      socket.emit('dm:enter:single', mapToPublicDm(unsavedDm));
    } else {
      socket.emit('dm:enter:single', mapToPublicDm(dm));
    }
  };

  socket.on('dm:enter:single', listenerWrapper(dmEnterSingle));
};
