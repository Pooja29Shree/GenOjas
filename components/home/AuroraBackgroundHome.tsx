"use client";

import { motion } from "motion/react";
import { AuroraBackground } from "../ui/aurora-background";
import React from "react";

const AuroraBackgroundHome = (props: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 1.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        {props.children}
      </motion.div>
    </AuroraBackground>
  );
};

export default AuroraBackgroundHome;
