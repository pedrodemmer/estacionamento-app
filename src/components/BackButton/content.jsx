"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton({ href }) {
  return (
    <Link
      href={href}
      className="text-white text-xl hover:text-blue-400 transition"
      id="back-button"
    >
      <FontAwesomeIcon icon={faAngleLeft} className="text-white w-7 h-7" />
    </Link>
  );
}
