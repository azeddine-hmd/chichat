import React from "react";
import ChichatSvg from "../../public/svg/chichat-logo-primary.svg";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { motion } from "framer-motion";

export type SplashScreenProps = {} & React.ComponentProps<"div">;

export default function SplashScreen({ className }: SplashScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const logoVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: 360, transition: { duration: 2, repeat: Infinity, ease: 'linear' } },
  };

  return (
    <motion.div className={twMerge(
        "flex flex-col h-full w-full items-center justify-center bg-gray-500",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="mb-4"
        variants={logoVariants}
      >
        <Image className="text-primary" priority src={ChichatSvg} alt="Chichat logo" />
      </motion.div>
      <h1 className="font-bold text-lg text-primary" >
        Connecting to Chichat server...
      </h1>
    </motion.div>
  );
}
