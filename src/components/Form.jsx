import { useState } from "react";
import { getGenders, getLocations, getStudies } from "../helpers/form.axios";
import { useEffect } from "react";
import { subjects } from "../helpers/subjects";

const Form = () => {
  const [values, setValues] = useState({
    location: [],
    study: [],
    gender: [],
  });

  const getValues = async () => {
    const locations = await getLocations();
    const studies = await getStudies();
    const genders = await getGenders();
    setValues({
      location: locations.data,
      study: studies.data,
      gender: genders.data,
    });
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <>
      <form className="p-5 shadow col-11 col-sm-7 col-lg-5 border m-auto">

        <label className="form-label text-primary">Localidad</label>
        <select className="form-control">
          <option>Seleccione</option>
          {
            values.location.map((location) => (
                <option key={location.id} value={location.id}>{location.name}</option>
          ))
          }
        </select>

        <label>Estudios</label>
        <select className="form-control">
          <option>Seleccione</option>
          {
            values.study.map((study) => (
                <option key={study.id} value={study.id}>{study.studyNivel}</option>
          ))
          }
        </select>

        <label className="form-label text-primary">Genero</label>
        <select className="form-control">
          <option>Seleccione</option>
          {
            values.gender.map((gender) => (
                <option key={gender.id} value={gender.id}>{gender.gender}</option>
          ))
          }
        </select>


          <label className="form-label text-primary">¿Cual es el area académica que considerás mas importante?</label>
          <select className="form-control">
            <option>Seleccione</option>
            {
              subjects.map((subject, i) => (
                <option key={i}>{subject}</option>
              ))
            }
          </select>
        
      </form>
    </>
  );
};

export default Form;
