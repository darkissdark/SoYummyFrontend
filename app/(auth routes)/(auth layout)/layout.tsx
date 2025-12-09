type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <div className="relative w-full px-[20px] flex flex-col gap-0 lg:flex-row lg:items-start lg:gap-[115px] overflow-hidden justify-center max-w-[1440px]">
        <div
          className="
            w-full h-auto 
            bg-no-repeat bg-center 
            -mb-[33px]
            md:-mb-[10px]
            md:z-10
            bg-[url('/auth/auth-mobile-banner.svg')] 
            bg-contain 
            min-h-[250px] 
            lg:bg-[url('/auth/auth-desktop-banner.svg')] 
            lg:w-[532px] 
            lg:h-[468px] 
            lg:bg-cover 
            lg:min-h-0 
          "
        />
        <div className="bg-[var(--secondary-background)] fixed bottom-0 left-0 w-full h-[40vh] lg:top-[40%] lg:h-[auto]">
          <div className="hidden lg:block rounded-[0_0_100%_100%] w-full h-[20vh] bg-[var(--primary-background-light)] absolute top-0"></div>
        </div>
        <div className="relative grow">
          <div className="bg-[var(--secondary-background)] w-[calc(100%_+_40px)] absolute top-[20px] md:top-[-30px] h-full -ml-[20px] lg:hidden">
            <div
              className="
                  w-[100%] h-0
                  border-[10rem] 
                  border-solid
                  md:border-[17rem] 
                  border-b-[var(--secondary-background)] 
                  border-t-[var(--primary-background-light)]
                  border-t-[3rem]
                  sm:border-t-[1rem]
                  md:border-t-[7rem]
                  border-b-0
                  border-l-transparent 
                  border-r-transparent
              "
            ></div>
          </div>
          <div className="relative">{children}</div>
        </div>
      </div>
    </>
  );
}
