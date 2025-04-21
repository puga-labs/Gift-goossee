'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { AiOutlineBgColors } from "react-icons/ai";
import { PiStickerBold } from "react-icons/pi";
import { CiTextAlignCenter } from "react-icons/ci";


const icons = {
  background: <AiOutlineBgColors size={30}/>,
  stickers: <PiStickerBold size={30}/>,
  text: <CiTextAlignCenter size={30}/>,
};




/* -------------------------------------------------------------------------- */
/*                               How Item card                               */
/* -------------------------------------------------------------------------- */

function HowItem({ step, title, children }) {
  const cardHeight = step === 3 ? 'h-[144px]' : 'h-[288px]';
  const cardWidth  = step === 3 ? 'w-[35%]'  : 'w-[25%]';

  return (
    <div
      className={clsx(
        'relative flex flex-col items-start justify-start rounded-lg border bg-white p-2 shadow-main ',
        cardHeight,
        cardWidth
      )}
    >
      <header className="mb-2 flex items-center space-x-2 w-full">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border bg-green-200">
          {step}
        </span>
        <h2 className="text-md font-bold  w-full">{title}</h2>
      </header>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           «How it works» section                           */
/* -------------------------------------------------------------------------- */

export default function HowMain() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-purple-100">
      {/* title banner */}
      <h1 className="absolute top-0 rounded-b-lg border border-t-0 bg-green-200 px-40 py-4 text-2xl font-bold">
        How&nbsp;it&nbsp;works?
      </h1>

      {/* first row */}
      <div className="flex w-full items-center justify-center space-x-[120px]">
        {/* step 1 */}
        <HowItem step={1} title="Customize and create your NFT">
          <div className="flex h-full w-full items-center space-x-8">
            {/* options list */}
            <ul className="flex h-full w-full flex-col items-center justify-center space-y-4 px-2 py-8">
              {['Background', 'Stickers', 'Text'].map(label => (
                <li
                  key={label}
                  className="flex w-full items-center justify-between rounded-lg border bg-orange-300 p-2 text-sm shadow-main"
                >
                  <span className='text-base '>{label}</span>
                  <span>{icons[label.toLowerCase()]}</span>
                </li>
              ))}
            </ul>
            {/* goose image */}
            <Image
              src="/step1goossee.png"
              alt="Goossee"
              width={200}
              height={100}
              priority
            />
          </div>
        </HowItem>

        {/* step 2 */}
        <HowItem step={2} title="Pick Date, Gift & Animation">
          <ul className="flex h-full w-full flex-col items-center justify-between space-y-4 px-2 py-8">
            {[
              ['Choose Date', '05.05.2025'],
              ['Choose Gift', '10 MON'],
              ['Choose Animation', 'Legendary'],
            ].map(([label, value]) => (
              <li
                key={label}
                className="flex w-full items-center justify-between rounded-lg border bg-orange-300 p-2 text-sm shadow-main"
              >
                <span className="text-lg">{label}</span>
                <span className="text-sm">{value}</span>
              </li>
            ))}
          </ul>
        </HowItem>
      </div>

      {/* second row */}
      <div className="mt-[120px] flex w-full items-center justify-center space-x-[10vw]">
        {/* step 3 */}
        <HowItem step={3} title="Send vibes to your bestie!">
          <div className="flex h-full w-full items-center justify-center space-x-4 px-2 py-4">
            <div className="flex h-3/4 w-2/3 items-center justify-start rounded-lg border pl-4">
              mybestie.eth
            </div>
            <button className="btn-sm w-1/3">Send!</button>
          </div>
        </HowItem>
      </div>
    </section>
  );
}
