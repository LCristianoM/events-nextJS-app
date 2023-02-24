import CatEvent from "@/src/components/events/catEvent";
import Image from "next/image";
import Link from "next/link";

function EventsCatPage({ data, pageName }) {
  return (
    <CatEvent data = {data} pageName={pageName} />
  );
}

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((e) => {
    return {
      params: {
        cat: e.id.toString(),
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");

  const data = allEvents.filter((e) => e.city === id);
  console.log(data);

  return {
    props: { data, pageName: id },
  };
}
