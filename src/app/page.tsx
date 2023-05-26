import Accordion from "@/components/generics/accordion";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Accordion
        datasource={[
          {
            id: "1",
            header: <h1>Hallo</h1>,
            content: <>adwawd</>,
          },
          {
            id: "2",
            header: <h1>Hallo</h1>,
            content: <>adwawd</>,
          },
        ]}
      />
    </>
  );
}
