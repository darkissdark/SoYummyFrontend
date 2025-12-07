import Image from "next/image";
import Link from "next/link";
import Button from "@/components/forms/button/Button";

const WelcomePage = () => {
  return (
    <section className="text-white mx-auto text-center px-[35px] md:max-w-[505px] lg:max-w-[540px]">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Image
          src="/auth/welcome.jpg"
          alt="Background Image"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <Link className="inline-flex" href="/" title="Go to homepage">
        <Image
          className="w-[54px] h-[54px] mb-7 md:w-[68px] md:h-[68px] md:mb-11 mx-auto"
          src="/logo.svg"
          alt="So Yummy Logo"
          priority
          width={68}
          height={68}
        />
      </Link>
      <h1 className="font-semibold tracking-[-0.02em] mb-3.5 text-[24px] leading-[24px] md:text-[28px] md:leading-[28px]">
        Welcome to the app!
      </h1>
      <p className="text-[14px] leading-[18px] tracking-[-0.02em] mb-11 md:text-[18px] md:leading-[24px]">
        This app offers more than just a collection of recipes - it is designed
        to be your very own digital cookbook. You can easily save and retrieve
        your own recipes at any time.
      </p>
      <div className="flex justify-center gap-3 md:gap-[18px]">
        <Button as="link" href="/register" variant="primary" rounded>
          Registration
        </Button>
        <Button
          as="link"
          href="/signin"
          variant="transparent"
          rounded
          color="white"
        >
          Sign in
        </Button>
      </div>
    </section>
  );
};

export default WelcomePage;
