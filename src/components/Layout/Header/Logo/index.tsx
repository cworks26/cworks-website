import { getImagePrefix } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src={`${getImagePrefix()}images/logo/logo-dark.png`}
        alt="CWorks Digital Agency"
        width={140}
        height={44}
        priority
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
  );
};

export default Logo;
