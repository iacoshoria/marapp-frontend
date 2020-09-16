/*
  Copyright 2018-2020 National Geographic Society

  Use of this software does not constitute endorsement by National Geographic
  Society (NGS). The NGS name and NGS logo may not be used for any purpose without
  written permission from NGS.

  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed
  under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
  CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

import { Router } from '@reach/router';
import { useAuth0 } from 'auth/auth0';
import { ProtectedRoute } from 'components/protected-route';
import { GATSBY_APP_BASE_URL } from 'config';
import { navigate } from 'gatsby';
import DashboardsPage from 'pages-client/dashboards';
import Homepage from 'pages-client/homepage';
import LayersPage from 'pages-client/layers/routes';
import Organization from 'pages-client/organization';
import OrganizationsPage from 'pages-client/organizations/routes';
import PlacesPage from 'pages-client/places/routes';
import UnauthorizedPage from 'pages-client/unauthorized';
import UsersPage from 'pages-client/users';
import WidgetsPage from 'pages-client/widgets';
import React, { useEffect } from 'react';

/**
 * All admin pages are client side pages only because the /:org makes them dinamic
 */
export default function IndexPage() {
  return (
    <Router basepath={GATSBY_APP_BASE_URL}>
      <ProtectedRoute path="/" component={RedirectToOrgHomepage} />
      <ProtectedRoute path="/:org" component={Organization}>
        <Homepage path="/" />
        <PlacesPage path="/places/*" />
        <DashboardsPage path="/dashboards/*" />
        <LayersPage path="/layers/*" />
        <WidgetsPage path="/widgets/*" />
        <UsersPage path="/users/*" />
        <OrganizationsPage path="/organizations/*" />
      </ProtectedRoute>
      <UnauthorizedPage path="/unauthorized" />
    </Router>
  );
}

/**
 * Just redirect to the default selectedGroup. (set in auth0.tsx)
 */
const RedirectToOrgHomepage = () => {
  const { selectedGroup } = useAuth0();
  useEffect(() => {
    selectedGroup && navigate(`/${selectedGroup}`, { replace: true });
  }, [selectedGroup]);
  return <div>This is homepage - should be redirected to /:org</div>;
};
