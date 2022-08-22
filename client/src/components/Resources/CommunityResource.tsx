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

import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { LinkData, LinkAttrs } from "components/Resources/resourcetypes";
import ResourceBlock from "components/Resources/ResourceBlock";

import ResourceLoading from "components/Resources/ResourceLoading";

import SettingsCtx from "components/ctx";

import getBaseUrl from "config";

import { shouldRefreshLinks } from "components/Resources/refresh";

const CommunityResource = () => {
  const ctx = useContext(SettingsCtx);
  const [linkData, setLinkData] = useState<LinkData>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getLinks = async () => {
    const res = await axios.get(`${getBaseUrl()}/resources?resource=community`);
    const data = await res.data;

    setLinkData(data);
    setLoading(false);
  };

  useEffect(() => {
    getLinks();
  }, []);

  let jsx;
  if (!loading) {
    const final = Object.entries(linkData).map(([k, v]) => {
      const items = v.map((link: LinkAttrs) => {
        return <ResourceBlock key={link.href} attrs={link} />;
      });
      return (
        <div key={k} className="block-container">
          <h1>{k}</h1> {items}
        </div>
      );
    });
    jsx = (
      <div className="resource-wrapper">
        <h1 className="resource-title">Resource Links</h1>
        {final}
      </div>
    );
  }

  return (
    <div className="app-resource">
      <div className="resource-header">
        <div className="resource-header__name">
          <h1>Community Connections</h1>
        </div>
        <div className="resource-header__body">
          <div className="resource">
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Overview
            </div>
            <div className="resource__content">
              Connecting with families who have experienced similar instances
              can help in your healing journey. There are active local and
              national communities to support you every step of the way. Hear
              about how Mothers of the Movement connected to their communities
              and launched organizations to empower and support you and your
              family.
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Wanda Johnson & The Oscar Grant Foundation
            </div>
            <div className="resource__content">
              Wanda Johnson is the Chair & President of the{" "}
              <a
                href="https://oscargrantfoundation.org/"
                target="_blank"
                rel="noreferrer"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
              >
                Oscar Grant Foundation
              </a>
              . The Oscar Grant Foundation was established to mend the distrust
              between residents in predominantly Black communities with
              high-crime rates and law enforcement. The program helps youth from
              the East Bay area build self-esteem and encourage them and the
              police to find creative ways to perceive themselves and others as
              individuals full of potential rather than a threat. The Oscar
              Grant Foundation creates a supportive community for you, providing
              grief sessions and youth services and activities (scholarships,
              school supplies giveaways, tutoring and athletic programs).
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Angela Williams & Mothers on a Mission
            </div>
            <div className="resource__content">
              Based in Troy, Alabama, Angela holds meetings where friends and
              family gather to speak about their experiences with police
              brutality, and the next steps in their efforts to find justice.
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Marion Gray-Hopkins and the Coalition of Concerned Mothers
            </div>
            <div className="resource__content">
              In 2015, Marion Gray-Hopkins co-founded the{" "}
              <a
                href="http://www.cocmdmv.org/"
                target="_blank"
                rel="noreferrer"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
              >
                Coalition of Concerned Mothers (COCM)
              </a>
              , a grassroots organization that brings mothers from around the
              nation together to support the movement against police terrorism
              and brutality. Mothers across the U.S. reach out to COCM for
              support or resources as they transition to a new, normal way of
              life. COCM stands in solidarity with mothers during their journey
              for justice. The organization also supports grieving mothers
              through legal and legislative processes.
            </div>
          </div>
        </div>
        <hr />
      </div>

      {loading ? <ResourceLoading /> : jsx}
    </div>
  );
};

export default CommunityResource;
