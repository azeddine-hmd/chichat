import { prisma } from '../../../config';
import { HttpError } from '../../../utils/error';

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

export async function getProfile(id: number) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      avatar: true,
      blocked: true,
    },
  });
  return user;
}

export async function getBlockedUsersProfile(id: number) {
  const blockRecords = await prisma.block.findMany({
    where: { blockedById: id },
    include: { blocked: { include: { avatar: true } } },
  });
  const blockedUsers = blockRecords.map((blockRecord) => blockRecord.blocked);
  return blockedUsers;
}

export async function getFriendsProfile(id: number) {
  const friendshipRecords = await prisma.friendship.findMany({
    where: {
      OR: [{ user1Id: id }, { user2Id: id }],
    },
    include: {
      user1: { include: { avatar: true } },
      user2: { include: { avatar: true } },
    },
  });
  const friendsProfile = friendshipRecords.map((friendshipRecord) => {
    return friendshipRecord.user1.id === id
      ? friendshipRecord.user2
      : friendshipRecord.user1;
  });
  return friendsProfile;
}

// get pending friend requests
export async function getPendingFRProfile(id: number) {
  const pendingFriendshipRecords = await prisma.pendingFriendship.findMany({
    where: {
      OR: [{ sender: { id: id } }, { recipient: { id: id } }],
    },
    include: {
      sender: { include: { avatar: true } },
      recipient: { include: { avatar: true } },
    },
  });
  const sentFR = pendingFriendshipRecords
    .map((pFRRecord) => {
      return pFRRecord.senderId === id ? pFRRecord.recipient : null;
    })
    .filter((record) => record != null);
  const acceptFR = pendingFriendshipRecords
    .map((pFRRecord) => {
      return pFRRecord.recipientId === id ? pFRRecord.sender : null;
    })
    .filter((record) => record != null);

  return {
    sentFR: sentFR,
    acceptFR: acceptFR,
  };
}
