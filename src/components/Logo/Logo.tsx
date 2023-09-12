import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        priority
        src="/assets/ooca-logo.svg"
        alt="occa logo"
        width={65}
        height={65}
      />
    </div>
  );
};

export default Logo;
