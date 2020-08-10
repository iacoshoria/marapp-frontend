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

import * as React from 'react';
import { ReactNode, useContext, useEffect, useState } from 'react';
import {InlineCardOverlay} from './index';

export interface InlineCardProps {
  editable?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  editAction?: (v:boolean) => void;
  saveAction?: (v: boolean) => void;
  children?: ReactNode
}

import './styles.scss';

export default function InlineCard( props: InlineCardProps ) {
  const { children, editAction, editable } = props;

  const editCard = () => {
    editAction(true);
  };

  return (
    <div className="ng-background-ultradkgray ng-padding-medium ng-inline-card">
      {!editable && <button className="ng-button ng-button-link" onClick={editCard}>edit</button>}
      {children}
      {editable && <InlineCardOverlay/>}
    </div>
  );
}


