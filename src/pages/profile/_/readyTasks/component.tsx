import NavigationMenu from "components/navigationMenu";
import { routes, baseUrl } from "pages/profile/routes";
import React from "react";

import "./styles.scss";

export default function ProfileReadyTasksPage() {
  return (
    <div id="page" className="page-container">
      <div>ProfileReadyTasksPage</div>
      <NavigationMenu baseUrl={baseUrl} items={routes} />
    </div>
  );
}
