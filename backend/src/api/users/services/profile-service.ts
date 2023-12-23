import { prisma } from '../../../config';
import { HttpError } from '../../../utils/error';

export async function getProfile(id: number) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      avatar: true,
      blocked: true,
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

export async function getBlockedUsersProfile(id: number) {
  const blockRecords = await prisma.block.findMany({
    where: { blockedById: id },
    include: { blocked: true },
  });
  console.log('blockRecords result:', blockRecords);
  const blockedUsersProfile = blockRecords.map((blockRecord) => {
    return blockRecord.blocked;
  });
  return blockedUsersProfile;
}

export async function getFriendsProfile(id: number) {
  const friendshipRecords = await prisma.friendship.findMany({
    where: {
      OR: [{ user1Id: id }, { user2Id: id }],
    },
    include: { user1: true, user2: true },
  });
  console.log('friendshipRecords result:', friendshipRecords);
  const friendsProfile = friendshipRecords.map((friendshipRecord) => {
    return friendshipRecord.user1.id === id
      ? friendshipRecord.user2
      : friendshipRecord.user1;
  });
  return friendsProfile;
}
