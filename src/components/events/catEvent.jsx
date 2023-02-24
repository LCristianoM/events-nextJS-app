import Link from "next/link";
import Image from "next/image";

function CatEvent({ data, pageName }) {
  return (
    <div className="cat_events">
      <h1>Events in {pageName}</h1>
      <div className="content">
        {data.map((e) => (
          <Link
            legacyBehavior
            key={e.id}
            href={`/events/${e.city}/${e.id}`}
            passHref
          >
            <a className="card">
              <Image width={380} height={290} alt={e.title} src={e.image} />
              <h2> {e.title} </h2>
              <p> {e.description} </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CatEvent;
