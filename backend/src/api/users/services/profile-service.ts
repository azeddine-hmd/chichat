import { prisma } from '../../../config';
import { HttpError } from '../../../utils/error';

export async function getProfile(id: number) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      files: true,
    },
  });
  const avatar = user.files.find((file) => file['fieldname'] === 'avatar');
  return {
    user: user,
    avatar: avatar,
  };
}

export async function uploadFile(me: Express.User, file: Express.Multer.File) {
  try {
    const avatar = await prisma.file.create({
      data: {
        filename: file.originalname,
        fieldname: file.fieldname,
        filePath: file.path,
        url: `${process.env.BACKEND_DOMAIN}/static/${file.originalname}`,
        mimeType: file.mimetype,
        fileSize: file.size,
        uploadedBy: { connect: { id: me.id } },
      },
    });
    return avatar;
  } catch (err) {
    throw new HttpError(500, 'File upload failed');
  }
}
