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

import { createAction } from 'vizzuality-redux-tools';

export const setLayersLoading = createAction('LAYERS/loading');
export const setLayersError = createAction('LAYERS/setLayersError');
export const setLayersActive = createAction('LAYERS/setLayersActive');
export const setListActiveLayers = createAction('LAYERS/setListActiveLayers');
export const resetLayersActive = createAction('LAYERS/resetLayersActive');

export const toggleLayer = createAction('LAYERS/toggleLayer');
export const setLayerInfo = createAction('LAYERS/setLayerInfo');
export const setLayerOrder = createAction('LAYERS/setLayerOrder');
export const setLayerOpacity = createAction('LAYERS/setLayerOpacity');
export const setLayerVisibility = createAction('LAYERS/setLayerVisibility');
export const setLayerGroupCurrent = createAction('LAYERS/setLayerGroupCurrent');
export const setLayerTimelineCurrent = createAction('LAYERS/setLayerTimelineCurrent');
export const setLayerSettings = createAction('LAYERS/setLayerSettings');

export const resetLayers = createAction('LAYERS/resetLayers');
export const resetLayerCache = createAction('LAYERS/resetLayerCache');

// Search
export const setLayersSearch = createAction('LAYERS/setLayersSearch');
export const setLayersSearchOpen = createAction('LAYERS/setLayersSearchOpen');
export const setLayersSearchLoading = createAction('LAYERS/setLayersSearchLoading');
export const setLayersSearchFilters = createAction('LAYERS/setLayersSearchFilters');
export const setLayersSearchAvailableFilters = createAction(
  'LAYERS/setLayersSearchAvailableFilters'
);
export const setLayersSearchResults = createAction('LAYERS/setLayersSearchResults');
export const nextLayersPage = createAction('LAYERS/nextLayersPage');

export const resetLayersResults = createAction('LAYERS/resetLayersResults');

export default {
  setLayersLoading,
  setLayersError,
  setLayersActive,

  toggleLayer,

  setLayerInfo,
  setLayerOrder,
  setLayerOpacity,
  setLayerVisibility,
  setLayerGroupCurrent,
  setLayerTimelineCurrent,
  setLayerSettings,

  resetLayers,
  resetLayerCache,
};
