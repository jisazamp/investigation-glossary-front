import type { FC } from "react";

export interface CreditsAuthorCardProps {
  description: string;
  email: string;
  imgSrc: string;
  name: string;
  studies: string;
  orcidUrl?: string;
  title?: string;
}

export const CreditsAuthorCardUI: FC<CreditsAuthorCardProps> = (props) => {
  const { description, email, imgSrc, name, studies, title, orcidUrl } = props;

  return (
    <div className="border py-3 border-gray-300 hover:border-gray-500 rounded-md flex items-center px-2 gap-2">
      <img src={imgSrc} className="h-auto w-20 rounded-md" />
      <div className="flex flex-col">
        <p className="font-bold text-lg mb-1">
          {name} {title && <span>, {title}</span>}
        </p>
        <p>{studies}</p>
        <p>{description}</p>
        <p>
          <a className="underline" href={orcidUrl} target="_blank">
            {orcidUrl}
          </a>
        </p>
        <p className="underline">{email}</p>
      </div>
    </div>
  );
};
