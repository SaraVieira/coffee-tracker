import { Transition } from '@headlessui/react'
import { useDetectClickOutside } from 'react-detect-click-outside'

const AsideWrapper = ({ children, closeAside }) => {
  const ref = useDetectClickOutside({ onTriggered: console.log })
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition ease-out duration-400"
      enterFrom="transform right-[-500px] absolute top-0 h-full w-full md:w-96 z-20"
      enterTo="transform right-0 absolute absolute top-0 h-full w-full md:w-96 z-20"
      leave="transition ease-in duration-75"
      leaveFrom="transform right-0"
      leaveTo="transform right-[-500px]"
      entered="absolute top-0 h-full w-full md:w-96 z-20 right-0"
    >
      <aside
        className=" bg-white p-8 border-l border-gray-200 overflow-y-auto pt-20 h-full relative z-10"
        ref={ref}
      >
        <div className="flex justify-end relative top-[-40px]">
          <button onClick={closeAside}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </aside>
    </Transition>
  )
}

export default AsideWrapper
