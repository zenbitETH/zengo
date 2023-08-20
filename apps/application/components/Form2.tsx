import { useState } from "react";
import Map from "./Map";
import Autocomplete from "react-google-autocomplete";

export default function Form2(props: any) {
  const { nextStep } = props;
  const [searchLocation, setSearchLocation] = useState<google.maps.LatLng>();

  return (
    <div className="p-3 gap-5 grid font-exo">
      <div>
        <div className="formLabel">Ubicación de la propuesta</div>
        <div
          id="map-parent"
          className="h-96 bg-gray-300 rounded-med relative grid text-center"
        >
          <Autocomplete
            style={{
              height: "40px",
            }}
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
            onPlaceSelected={(place) => {
              console.log(place);
              setSearchLocation(place.geometry?.location);
            }}
            options={{
              types: ["address"],
            }}
          />
          <Map searchLocation={searchLocation} />
          {/* <input
            type="text"
            placeholder="Escribe una dirección para ubicar tu propuesta"
            className="placeholder:italic px-6 py-3 text-black w-full mx-auto rounded-med absolute top-0 left-0"
          /> */}
        </div>
      </div>
    </div>
  );
}
