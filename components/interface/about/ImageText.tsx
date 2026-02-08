import Image, { StaticImageData } from "next/image";

export function ImageText({
  title,
  text,
  image,
  alt,
}: {
  title: string;
  alt: string;
  image: StaticImageData;
  text: string;
}) {
  return (
    <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full">
      <div className="w-full h-fit">
        <div className="items-center justify-center block w-full px-6 py-12 m-auto h-fit lg:flex lg:w-4/6 lg:px-0">
          <div className="w-full lg:w-[calc(100%-350px)] h-fit lg:pr-6">
            <h1
              className="pb-3 text-3xl font-medium"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {title}
            </h1>
            <p className="mb-4" style={{ fontFamily: "var(--font-lora)" }}>
              {text}
            </p>
          </div>
          <div className="hidden sm:block my-4 lg:m-0 w-50 h-50 lg:mt-0 lg:w-87.5 lg:h-87.5 md:w-100 md:h-100 m-auto">
            <Image
              src={image}
              alt={alt}
              width={700}
              height={700}
              unoptimized
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
