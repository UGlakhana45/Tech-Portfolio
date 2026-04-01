import { MdArrowOutward } from "react-icons/md";

type Props = {
  image?: string;
  alt?: string;
  link?: string;
};

const WorkImage = ({ image, alt = "", link }: Props) => {
  const img = image ? (
    <img
      src={image}
      alt={alt}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  ) : null;

  const inner = (
    <>
      {link ? (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      ) : null}
      {img}
    </>
  );

  return (
    <div className="work-image">
      {link ? (
        <a
          className="work-image-in"
          href={link}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
        >
          {inner}
        </a>
      ) : (
        <div className="work-image-in work-image-static">{inner}</div>
      )}
    </div>
  );
};

export default WorkImage;
