import { JSX, SVGProps } from "react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export const socialMediaButtons: {
  link: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}[] = [
  {
    link: "https://www.instagram.com/garibcatastrofe/?hl=es-la",
    Icon: InstagramIcon,
  },
];
