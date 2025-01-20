import {renderHook} from '@testing-library/react';
import useMap from './use-map';
import {makeFakeCity} from '../../mocks';
import {MutableRefObject} from 'react';
import React from 'react';
import {Map} from 'leaflet';

describe('Hook: useMap', () => {
  it('should return 1 element', () => {
    const city = makeFakeCity();
    const mapRef = React.createRef() as MutableRefObject<HTMLElement>;
    mapRef.current = document.createElement('div');

    const { result } = renderHook(() => useMap(mapRef, city, false));
    const map = result.current;

    expect(map).not.toBeNull();
    expect(map).toBeInstanceOf(Map);
  });
});
