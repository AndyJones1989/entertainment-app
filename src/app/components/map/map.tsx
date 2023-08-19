import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRef, useEffect } from "react";

function MapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    const marker = new google.maps.Marker({
      position: center,
      map: map,
      title: "Hello World!",
      label: "1",
      //icon: Svg,
    });
  });

  return <div ref={ref} id="map" style={{ height: "500px" }} />;
}

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div>loading...</div>;
    case Status.FAILURE:
      return <div> fail</div>;
    case Status.SUCCESS:
      return (
        <MapComponent
          center={{ lat: 53.79854468471944, lng: -1.5490573883626326 }}
          zoom={16}
        />
      );
    default:
      return <div />;
  }
};

const key = process.env.MAPS_API_KEY;

const CustomMap = () => <Wrapper apiKey={key} render={render} />;

export default CustomMap;
