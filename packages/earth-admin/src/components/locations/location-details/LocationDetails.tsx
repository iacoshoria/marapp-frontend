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
import { useEffect, useState } from 'react';
import { isEmpty, groupBy, map } from 'lodash';

import { LocationProps } from '../model';
import { LocationMetrics } from '../location-metrics';
import { LocationIntersections } from '../location-intersections';
import { ErrorMessages, ActionModal, MapComponent, LinkWithOrg } from 'components';
import { formatDate } from 'utils';
import { MapComponentContext } from 'utils/contexts';
import { stripNumbers } from 'utils';
import { calculateAllForLocation } from 'services';
import { useAuth0 } from 'auth/auth0';
import { AuthzGuards } from 'auth/permissions';

export default function LocationDetails(props: LocationProps) {
  const {
    data: {
      id,
      slug,
      name,
      description,
      geojson,
      published,
      featured,
      bbox2d,
      areaKm2,
      createdAt,
      updatedAt,
      version,
      metrics,
      intersections,
    },
  } = props;

  const publishIcon = published ? 'check' : 'close';
  const featuredIcon = featured ? 'check' : 'close';

  const [mapData, setMapData] = useState({});
  const [mappedIntersections, setMappedIntersections] = useState();
  const [serverErrors, setServerErrors] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { getPermissions, selectedGroup } = useAuth0();

  const writePermissions = getPermissions(AuthzGuards.writeLocationsGuard);
  const metricsPermission = getPermissions(AuthzGuards.accessMetricsGuard);
  const writeMetricsPermission = getPermissions(AuthzGuards.writeMetricsGuard);

  useEffect(() => {
    setMapData({ geojson, bbox: bbox2d });
    setMappedIntersections(groupBy(intersections, 'type'));
  }, [geojson, bbox2d, intersections]);

  async function handleCalculateAll(e: MouseEvent, locationId: string) {
    e.preventDefault();
    e.stopPropagation();
    try {
      setServerErrors(false);
      await calculateAllForLocation(locationId, selectedGroup);
    } catch (error) {
      setServerErrors(error.data.errors);
    }
  }

  function handleServerErrors(errors) {
    setServerErrors(errors);
  }

  function handleDeleteToggle() {
    setShowDeleteModal(!showDeleteModal);
  }

  return (
    <div>
      {showDeleteModal && (
        <ActionModal
          id={id}
          navigateRoute={'locations'}
          name={name}
          toggleModal={handleDeleteToggle}
          visibility={showDeleteModal}
        />
      )}
      <div className="ng-flex ng-flex-space-between">
        <h2 className="ng-text-display-m ng-c-flex-grow-1">{name}</h2>
        <div className="ng-flex ng-align-center ng-flex-center ng-text-center ng-center">
          <span className="ng-padding-horizontal">
            Published
            <br />
            <i className={`ng-icon-${publishIcon}`}></i>
          </span>
          <span className="ng-padding-horizontal">
            Featured
            <br />
            <i className={`ng-icon-${featuredIcon}`}></i>
          </span>
        </div>
      </div>

      <div className="ng-padding-medium ng-background-white ng-margin-medium-bottom">
        <h3 className="ng-text-display-s">
          Location details for {name} version{version}
        </h3>
        <p>
          <span className="ng-text-weight-medium">Created at:</span> {formatDate(createdAt)}
        </p>
        <p>
          <span className="ng-text-weight-medium">Last updated at:</span> {formatDate(updatedAt)}
        </p>
        <p>
          <span className="ng-text-weight-medium">Description:</span> {description || '-'}
        </p>
        <p>
          <span className="ng-text-weight-medium">Slug:</span> {slug || '-'}
        </p>
        <p>
          <span className="ng-text-weight-medium">AreaKm2:</span> {stripNumbers(areaKm2)}
        </p>

        {!isEmpty(geojson) && (
          <div className="ng-margin-medium-bottom">
            <MapComponentContext.Provider value={mapData}>
              <MapComponent />
            </MapComponentContext.Provider>
          </div>
        )}

        {writePermissions && (
          <LinkWithOrg
            to={`/locations/${id}/edit`}
            className="ng-button ng-button-primary ng-margin-medium-right"
          >
            Edit Location
          </LinkWithOrg>
        )}
        <LinkWithOrg to="/locations" className="ng-button">
          Go back to location list
        </LinkWithOrg>
      </div>
      <div className="ng-padding-medium ng-background-white ng-margin-medium-bottom">
        {mappedIntersections &&
          map(mappedIntersections, (intersections, idx) => (
            <LocationIntersections
              key={idx}
              name={intersections[0].type}
              intersections={intersections}
            />
          ))}
      </div>
      {metricsPermission && (
        <div className="ng-padding-medium ng-background-white ng-margin-medium-bottom">
          {metrics && (
            <div>
              <h5 className="ng-text-display-s">Location Metrics</h5>
              <div className="ng-flex ng-flex-wrap">
                {metrics.map((metric) => (
                  <LocationMetrics
                    key={metric.id}
                    data={metric}
                    handlers={{ handleServerErrors }}
                  />
                ))}
              </div>
            </div>
          )}
          {writeMetricsPermission && (
            <button
              className="ng-button ng-button-primary"
              onClick={(e) => handleCalculateAll(e, id)}
            >
              Recalculate all
            </button>
          )}

          {serverErrors && <ErrorMessages key={id} errors={serverErrors} />}
        </div>
      )}
      {writePermissions && (
        <div className="ng-padding-medium ng-background-white ng-text-right">
          <button className="ng-button ng-button-primary" onClick={handleDeleteToggle}>
            Delete location
          </button>
        </div>
      )}
    </div>
  );
}
