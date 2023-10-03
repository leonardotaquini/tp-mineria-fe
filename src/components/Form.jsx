import { useState } from "react";
import { getGenders, getLocations, getStudies } from "../helpers/form.axios";
import { useEffect } from "react";
import { subjects } from "../helpers/subjects";
import { useForm } from 'react-hook-form';

const Form = () => {
  const [values, setValues] = useState({
    location: [],
    study: [],
    gender: [],
    age:'',
  });

  const {register, handleSubmit, formState: { errors }, reset, getValues } = useForm({ defaultValues: values });


  const onSubmit =  (encuesta) => {
    console.log(encuesta);
  }

  const getValuesDB = async () => {
    const locations = await getLocations();
    const studies = await getStudies();
    const genders = await getGenders();
    setValues({
      ...values,
      location: locations.data,
      study: studies.data,
      gender: genders.data,
    });
  };

  useEffect(() => {
    getValuesDB();
  }, []);

  return (
    <>
      <form className="p-5 shadow col-11 col-sm-7 col-lg-5 border m-auto" onSubmit={handleSubmit(onSubmit)}>

        <label className="form-label text-primary">Localidad</label>
        <select className="form-control" {...register("location", {required: true}) }>
          <option>Seleccione</option>
          {
            values.location.map((location) => (
                <option key={location.id} value={location.id}>{location.name}</option>
          ))
          }
        </select>

        <label className="form-label text-primary">Estudios</label>
        <select className="form-control" {...register("study", {required: true}) }>
          <option>Seleccione</option>
          {
            values.study.map((study) => (
                <option key={study.id} value={study.id}>{study.studyNivel}</option>
          ))
          }
        </select>

        <label className="form-label text-primary">Genero</label>
        <select className="form-control" {...register("gender", {required: true}) }>
          <option>Seleccione</option>
          {
            values.gender.map((gender) => (
                <option key={gender.id} value={gender.id}>{gender.gender}</option>
          ))
          }
        </select>
        
        <label className="form-label text-primary">Edad</label>
        <input type="number" className="form-control" {...register("age", {required: true}) } />

          <label className="form-label text-primary">¿Cual es el area académica que considerás mas importante?</label>
          <select className="form-control" {...register("subject", {required: true}) }>
            <option>Seleccione</option>
            {
              subjects.map((subject, i) => (
                <option key={i}>{subject}</option>
              ))
            }
          </select>

          

        <button type="submit" className="btn btn-primary w-100 mt-3">Enviar</button>
      </form>
    </>
  );
};

export default Form;
