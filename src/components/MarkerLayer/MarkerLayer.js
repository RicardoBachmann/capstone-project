import {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';

export default function MarkerLayer({latitude, longitude, onClick, isSelected}) {
  const strokeColor = isSelected ? 'red' : '#3AD713';
  return (
    <StyledMarker longitude={longitude} latitude={latitude}>
      <svg
        width="116"
        height="116"
        viewBox="0 0 116 116"
        strokeWidth="2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="scale (0.8)"
        cursor="pointer"
        onClick={onClick}
      >
        <line x1="68.6066" y1="68.6066" x2="47.3934" y2="47.3934" stroke={strokeColor} />
        <line x1="68.6066" y1="47.3934" x2="47.3934" y2="68.6066" stroke={strokeColor} />
        <circle cx="58" cy="58" r="27.5" stroke={strokeColor} />
      </svg>
    </StyledMarker>
  );
}

const StyledMarker = styled(Marker)`
  color: ${props => (props.isHighlighted ? 'red' : '#3AD713')};
`;
