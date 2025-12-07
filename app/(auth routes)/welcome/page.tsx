import Image from "next/image";
import css from "./Welcome.module.css";
import Button from "@/components/forms/button/Button";

const WelcomePage = () => {
  return (
    <section className={css.main}>
      <div className={css.backgroundContainer}>
        <Image
          src="/auth/welcome.jpg"
          alt="Background Image"
          fill
          priority
          sizes="100vw"
          className={css.backgroundImage}
        />
      </div>
      <Image
        className={css.logo}
        src="/logo.svg"
        alt="So Yummy Logo"
        priority
        width={68}
        height={68}
      />
      <h1 className={css.title}>Welcome to the app!</h1>
      <p className={css.description}>
        This app offers more than just a collection of recipes - it is designed
        to be your very own digital cookbook. You can easily save and retrieve
        your own recipes at any time.
      </p>
      <div className={css.buttonsWrapper}>
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
