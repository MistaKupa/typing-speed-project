export default function Header() {
  const pb = localStorage.getItem("PB") || 0;

  return (
    <div className="flex justify-between items-center">
      <div className="">
        {/*LOGO MOBILE*/}
        <img
          src="/images/logo-small.svg"
          className=" md:hidden"
          alt="Typing Speed Test Logo"
        />

        {/*LOGO DESKTOP*/}
        <img
          src="/images/logo-large.svg"
          className="hidden md:inline"
          alt="Typing Speed Test Logo"
        />
      </div>
      <div className="flex gap-125 text-preset3-regular-mobile lg:text-preset4-regular">
        <img
          className="w-4.5 h-4"
          src="/images/icon-personal-best.svg"
          alt="Personal Best Icon"
        />
        <div className="flex gap-1">
          {/*SCORE MOBILE*/}
          <p className="md:hidden text-neutral-400">Best:</p>

          {/*SCORE DESKTOP*/}
          <p
            className="hidden md:inline 
          text-neutral-400"
          >
            Personal best:
          </p>
          <span className="text-neutral-100">{pb} WPM</span>
        </div>
      </div>
    </div>
  );
}
