// https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetCapabilities
export enum GEOGRAPHIC_LAYERS {
  MODIS_AQUA = 'MODIS_Aqua_CorrectedReflectance_TrueColor',
  VIIRS_SNPP = 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
  MODIS_TERRA = 'MODIS_Terra_CorrectedReflectance_TrueColor',
}

// https://nasa-gibs.github.io/gibs-api-docs/access-basics/#overview_1
export enum PROJECTION {
  GEOGRAPHIC = 'epsg4326',
  WEB_MERCATOR = 'epsg3857',
  NSIDC_SEA_ICE_POLAR = 'epsg3413',
  ANTARCTIC_POLAR_STEREOGRAPHIC = 'epsg3031',
}

export type GenerateImageQuery = {
  day?: string;
  zoom?: string;
  latitude: string;
  longitude: string;
  projection: keyof typeof PROJECTION;
  layer: keyof typeof GEOGRAPHIC_LAYERS;
};
