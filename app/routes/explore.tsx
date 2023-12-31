import React from "react";
import PublicLayout from "~/components/layouts/public";

export default function Explore() {
  return (
    <PublicLayout>
      <p>Explore</p>
    </PublicLayout>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Blogger. -  Explore" },
    {
      name: "description",
      content: "Blog about anything and everything",
    },
    { name: "og:title", content: "Blogger." },
    {
      name: "og:description",
      content: "Blogger. Blog about anything and everything",
    },
    {
      name: "og:image",
      content:
        "https://media.istockphoto.com/vectors/letter-b-icon-vector-id521527924?k=6&m=521527924&s=612x612&w=0&h=CuLX6X3KP0BxCSI2qMkHu_hS664SH-jUuS3BtCKMCmg=",
    },
    { name: "og:url", content: "" },
  ];
};
