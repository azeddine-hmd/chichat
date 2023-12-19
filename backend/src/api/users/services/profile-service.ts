import { prisma } from '../../../config';
import { HttpError } from '../../../utils/error';

export async function getProfile(id: number) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      avatar: true,
    },
  });
  return {
    profile: user,
    avatar: user.avatar,
  };
}

export async function uploadAvatar(
  me: Express.User,
  file: Express.Multer.File
) {
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
    console.error('file upload failed: ', err);
    throw new HttpError(500, 'File upload failed');
  }
}
