/** Blueprint For Justice
 ** Copyright (C) 2022 Anish Sinha
 **
 ** This program is free software: you can redistribute it and/or modify
 ** it under the terms of the GNU General Public License as published by
 ** the Free Software Foundation, either version 3 of the License, or
 ** (at your option) any later version.
 **
 ** This program is distributed in the hope that it will be useful,
 ** but WITHOUT ANY WARRANTY; without even the implied warranty of
 ** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 ** GNU General Public License for more details.
 **
 ** You should have received a copy of the GNU General Public License
 ** along with this program.  If not, see http://www.gnu.org/licenses/.
 **/

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import SettingsCtx from "components/ctx";
import getBaseUrl from "config";

// default card size is "lg"
const Card: React.FC<{
  className?: string;
  title: string;
  label: string;
  imgSrc: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { className?: string }
  >;
  link?: string;
  imgAlt?: string;
  cover?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { className?: string }
  >;
  size?: "sm" | "md" | "lg";
  text?: string;
  absolute?: boolean;
  ext?: boolean;
}> = ({
  title,
  label,
  imgSrc,
  imgAlt,
  icon: Icon,
  link,
  size,
  cover: Cover,
  text,
  className,
  absolute,
  ext,
}) => {
  const ctx = useContext(SettingsCtx);
  const navigate = useNavigate();
  const [hasOverlay, setHasOverlay] = useState<boolean>(false);

  let linkHtml;
  if (absolute && link) {
    linkHtml = (
      <a
        href={link}
        target={ext ? "_blank" : "_self"}
        rel={ext ? "noreferrer" : ""}
      >
        {title}
      </a>
    );
  } else if (absolute && !link) {
    linkHtml = <div>{label}</div>;
  } else {
    linkHtml = (
      <>
        {link ? (
          <a
            href={link}
            target={ext ? "_blank" : "_self"}
            rel={ext ? "noreferrer" : ""}
          >
            {title}
          </a>
        ) : (
          label
        )}{" "}
      </>
    );
  }
  return (
    <div
      className={`app-card ${hasOverlay ? "card-overlay" : ""} ${
        size || "lg"
      } ${className}`}
      onMouseEnter={() => setHasOverlay(() => true)}
      onMouseLeave={() => setHasOverlay(() => false)}
      onClick={ext ? () => window.open(link, "_blank") : () => navigate(link!)}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        className={`app-card__img ${hasOverlay ? "card-overlay" : ""}`}
      />
      <h2
        className={`app-card__title title--${size || "lg"} ${
          hasOverlay ? "hidden" : ""
        }`}
      >
        {title}
      </h2>{" "}
      {Cover ? (
        <div className="cover-container">
          <Cover
            className={`app-card__cover ${hasOverlay ? "" : "hidden"} cover--${
              size || "lg"
            }`}
          />
        </div>
      ) : (
        <div
          className={`app-card__text ${hasOverlay ? "" : "hidden"} text--${
            size || "lg"
          }`}
        >
          {text}
        </div>
      )}
      <div
        className={`label-container ${
          hasOverlay ? "" : "hidden"
        } label-container--${size}`}
      >
        <Icon className="label-container__icon" />
        <h4 className={`label-container__label${ctx.darkmode ? "--dark" : ""}`}>
          {/* {link ? <Link to={link}>{label}</Link> : label} */}
          {linkHtml}
        </h4>
      </div>
    </div>
  );
};

export default Card;
