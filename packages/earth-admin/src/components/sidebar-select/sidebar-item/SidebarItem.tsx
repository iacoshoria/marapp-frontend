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

import classnames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LinkWithOrg } from '@app/components/link-with-org';
import { Auth0Context } from '@app/utils/contexts';

export default function SidebarItem(props) {
  const [itemPermission, setItemPermission] = useState(false);
  const { item, selected } = props;
  const { getPermissions, selectedGroup } = useContext(Auth0Context);
  const { t } = useTranslation('admin');

  useEffect(() => {
    setItemPermission(getPermissions(item.guard));
  }, [item, selectedGroup]);

  return (
    itemPermission && (
      <li
        className={classnames('marapp-qa-sidebaritem ng-ep-dropdown-category', {
          'ng-ep-dropdown-selected': selected,
        })}
      >
        <LinkWithOrg
          className="ng-display-block ng-border-remove"
          to={item.url}
          state={{ refresh: true }}
          key={item.key}
        >
          <span className="ng-display-block ng-dropdown-item">{t(item.key)}</span>
        </LinkWithOrg>
      </li>
    )
  );
}
