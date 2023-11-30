import NavigationMenu from "components/navigationMenu";
import { routes, baseUrl } from "pages/profile/routes";
import React from "react";

import "./styles.scss";

export default function ProfileMessagesPage() {
  return (
    <div id="page" className="page-container">
      <div>ProfileMessagesPage</div>
      <NavigationMenu baseUrl={baseUrl} items={routes} />
    </div>
  );
}
