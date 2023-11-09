import NavigationMenu from "components/navigationMenu";
import React from "react";

import { routes, baseUrl } from "../../routes";
import "./styles.scss";

export default function ProfileBlackListPage() {
  return (
    <div id="page" className="page-container">
      <div>
        <div>BlackList</div>
        <NavigationMenu baseUrl={baseUrl} items={routes} />
      </div>
    </div>
  );
}
