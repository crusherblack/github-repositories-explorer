"use client";

import {
  Disclosure as DisclosurePrimitive,
  Transition,
} from "@headlessui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export type DisclosureData = {
  id: string;
  header: JSX.Element;
  content: JSX.Element;
};

type AccordionProps = {
  datasource?: DisclosureData[];
};

const Disclosure = ({ header, content }: Omit<DisclosureData, "id">) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-400 rounded-md p-[2px] mb-3">
      <div className="w-full px-4 p-2   rounded-md bg-white dark:bg-gray-900">
        <DisclosurePrimitive>
          {({ open }) => (
            <>
              <DisclosurePrimitive.Button className="w-full text-left flex justify-between items-center">
                {header}
                {open ? (
                  <FaChevronUp className="text-gray-700 dark:text-teal-400" />
                ) : (
                  <FaChevronDown className="text-gray-700  dark:text-teal-400" />
                )}
              </DisclosurePrimitive.Button>

              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <DisclosurePrimitive.Panel static>
                  {content}
                </DisclosurePrimitive.Panel>
              </Transition>
            </>
          )}
        </DisclosurePrimitive>
      </div>
    </div>
  );
};

const Accordion = (props: AccordionProps) => {
  const { datasource = [] } = props;

  return (
    <div>
      {datasource.map((item) => (
        <Disclosure key={item.id} header={item.header} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;
