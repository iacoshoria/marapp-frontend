import { getUrlQueryParams } from './index';

export interface IUrlCoordinates {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const toUrlCoordinateNumber = (value) => Number(parseFloat(value).toFixed(7));

export const isValidCoordinate = (value, limit) => value && value >= -1 * limit && value <= limit;

export const isValidLatitude = (value) => isValidCoordinate(value, 90);

export const isValidLongitude = (value) => isValidCoordinate(value, 180);

// https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/?size=n_10_n#maxzoom
export const isValidZoom = (value) => value && value >= 0 && value <= 24;

/**
 * Extract valid viewport coordinates from the url (string)
 */
export const extractCoordinatesFromUrl = (): IUrlCoordinates => {
  const { coordinates } = getUrlQueryParams();

  const result = {
    latitude: null,
    longitude: null,
    zoom: null,
  };

  if (coordinates) {
    const [latitude, longitude, zoom] = (coordinates as string).split(',');

    result.latitude = toUrlCoordinateNumber(latitude);
    result.longitude = toUrlCoordinateNumber(longitude);
    result.zoom = parseInt(zoom, 10);
  }

  return result;
};

/**
 * Based on the viewport stored in redux, under map.viewport
 * extract only the valid properties that need to be stored in the URL
 */
export const mapReduxStoreViewportToUrlParams = (value: IUrlCoordinates) => {
  return [
    toUrlCoordinateNumber(value.latitude),
    toUrlCoordinateNumber(value.longitude),
    parseInt(String(value.zoom), 10),
  ];
};

/**
 * Url params (from the URL component) are returned as an array
 * Create a valid viewport, based on the coordinates provided by the URL component
 */
export const mapUrlParamsToReduxStoreViewport = (value): IUrlCoordinates => {
  const [latitude, longitude, zoom] = value;

  return { latitude, longitude, zoom };
};

export const isValidUrlCoordinateGroup = (value: IUrlCoordinates) => {
  return (
    isValidLatitude(value.latitude) && isValidLongitude(value.longitude) && isValidZoom(value.zoom)
  );
};