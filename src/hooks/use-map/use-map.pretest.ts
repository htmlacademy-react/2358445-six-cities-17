import {renderHook} from '@testing-library/react';
import useMap from './use-map';
import {makeFakeCity} from '../../mocks';
import {MutableRefObject} from 'react';
import React from 'react';

describe('Hook: useMap', () => {
  it('should return 1 element', () => {
    const city = makeFakeCity();
    const mapRef = React.createRef() as MutableRefObject<HTMLElement>;

    const { result } = renderHook(() => useMap(mapRef, city, false));
    const map = result.current;

    expect(result.current).toHaveLength(1);
    expect(typeof map).toBe(Map);
  });
});
