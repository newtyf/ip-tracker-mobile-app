import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import Mapbox from '@rnmapbox/maps';

type AnnotationProps = PropsWithChildren<{
  coordinates: number[];
  city?: string;
}>;

export const Annotation = ({coordinates, city = 'London'}: AnnotationProps) => {
  return (
    <Mapbox.PointAnnotation
      key="annotation"
      id="annotation"
      coordinate={coordinates}>
      <View
        style={{
          height: 10,
          width: 10,
          backgroundColor: 'red',
          borderRadius: 50,
        }}
      />
      <Mapbox.Callout title={city} contentStyle={{borderRadius: 5}} />
    </Mapbox.PointAnnotation>
  );
};
