import NavigationMenu from "components/navigationMenu";
import React from "react";

import { routes, baseUrl } from "../../routes";
import "./styles.scss";

export default function ProfileIndexPage() {
  return (
    <div id="page" className="page-container">
      <div>
        <div>IndexPage</div>
        <NavigationMenu baseUrl={baseUrl} items={routes} />
      </div>
    </div>
  );
}
