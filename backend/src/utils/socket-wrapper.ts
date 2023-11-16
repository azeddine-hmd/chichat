export const wrap =
  (middleware: (req: any, res: any, next: any) => void) =>
  (socket: any, next: any) => {
    try {
      middleware(socket.request, {}, next);
    } catch (err) {
      console.error('middleware exception:');
      console.error(err);
    }
  };
