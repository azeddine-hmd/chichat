import React, { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import PrimaryButton from "../molecules/primary-button";
import FieldInput from "../atoms/field-input";
import AvatarEditor from "react-avatar-editor";
import { motion } from "framer-motion";
import { useUploadAvatarMut } from "@/hooks/use-upload-avatar-mut";
import { useRouter } from "next/navigation";
import { base64toFile } from "@/lib/urlencoded-to-file";

type AvatarSelectionProps = {
  email: string;
  password: string;
};

export default function AvatarSelection({
  email,
  password,
}: AvatarSelectionProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageScale, setImageScale] = useState(1.0);
  const editor = useRef<AvatarEditor | null>(null);

  const uploadAvatarMut = useUploadAvatarMut({
    onSuccess: () => router.push("/verify-email"),
    onError: (error) => console.error(error.message),
  });

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) setSelectedFile(null);
    setSelectedFile(file);
  }

  function upload(e: MouseEvent<HTMLButtonElement>) {
    if (selectedFile) {
      const avatarUrlencoded = editor.current
        ?.getImageScaledToCanvas()
        .toDataURL();
      const avatar = base64toFile(
        avatarUrlencoded!!,
        "avatar.jpeg",
        "image/jpeg"
      );
      uploadAvatarMut.mutate({
        email: email,
        password: password,
        avatar: avatar,
      });
    }
  }

  console.log("inside avatar selection");

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-10 rounded-md bg-gray-600 p-8 shadow-2xl">
        <div className="flex h-fit w-[480px] flex-col items-center">
          <h1 className="mb-5 text-2xl font-medium text-white">
            choose avatar
          </h1>
          <div
            className="relative mb-4 flex h-60 w-60 items-center justify-center overflow-hidden rounded-full border border-gray-100/10 bg-gray-100/10 shadow-lg"
            onWheel={(e) => {
              e.deltaY > 0 &&
                imageScale - 0.1 > 1 &&
                setImageScale(imageScale - 0.1);
              e.deltaY < 0 &&
                imageScale + 0.1 < 2 &&
                setImageScale(imageScale + 0.1);
            }}
          >
            {!selectedFile ? (
              <BsImageFill className="fill-white" size="30" />
            ) : (
              <>
                <AvatarEditor
                  image={selectedFile}
                  width={250}
                  height={250}
                  border={50}
                  scale={imageScale}
                  rotate={0}
                  ref={editor}
                />
              </>
            )}
          </div>
          <div className="flex w-80  items-center justify-center space-x-2">
            <FieldInput
              className="h-10 rounded-md border border-gray-50/30 p-2 text-sm font-medium"
              type="file"
              id="avatar"
              onChange={handleAvatarChange}
            />
            <PrimaryButton
              disabled={selectedFile == null || uploadAvatarMut.isPending}
              onClick={upload}
            >
              Uplaod
            </PrimaryButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
