"use client";

import {
  Disclosure as DisclosurePrimitive,
  Transition,
} from "@headlessui/react";

type DisclosureData = {
  id: string;
  header: JSX.Element;
  content: JSX.Element;
};

type AccordionProps = {
  datasource?: DisclosureData[];
};

const Disclosure = ({ header, content }: Omit<DisclosureData, "id">) => {
  return (
    <div className="w-full px-4 border-red-200 border">
      <DisclosurePrimitive>
        {({ open }) => (
          <>
            <DisclosurePrimitive.Button className="w-full text-left">
              {header}
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
