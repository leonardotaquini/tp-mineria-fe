import { useState } from "react";
import { getGenders, getLocations, getStudies, sendForm } from "../helpers/form.axios";
import { useEffect } from "react";
import { subjects } from "../helpers/subjects";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import './form.css';
const Form = () => {
  
  const [values, setValues] = useState({
    idLocation: [],
    idStudy: [],
    idGender: [],
    age:'',
    answerOne: '',
    answerTwo: '',
    answerThree: '',
    answerFour: '',
    answerFive: '',
    answerSix: '',
    answerSeven: '',
    answerEight: '',

  });

  const {register, handleSubmit, formState: { errors }, reset, getValues } = useForm({ defaultValues: values });

  
  const onSubmit =  async(encuesta) => {
   const respuesta = await sendForm(encuesta);
   if(respuesta.status !== 201){
     Swal.fire({
      icon: 'error',
      title: 'Error al enviar la encuesta',
      text: `${respuesta.status} - ${respuesta.statusText}`,
     });
    }
    Swal.fire({
      icon: 'success',
      title: 'Encuesta enviada',
      text: 'Gracias por participar',
      showConfirmButton: false,
      timer: 1500
    });
    console.log(respuesta)
    reset();
}

  const getValuesDB = async () => {
    const locations = await getLocations();
    const studies = await getStudies();
    const genders = await getGenders();
    setValues({
      ...values,
      idLocation: locations.data,
      idStudy: studies.data,
      idGender: genders.data,
    });
  };

  useEffect(() => {
    getValuesDB();
  }, []);

  



  return (
    <div className="container-fluid col-12 col-sm-8  col-lg-10 formulario rounded my-3">
      <form className=" p-5  row  m-auto  justify-content-center align-items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 col-sm-12 col-md-10 col-lg-12 mb-4">  
          <label className="form-label text-primary">Localidad</label>
          <select className="form-control" {...register("idLocation", {required: true}) }>
            <option value="Formosa" selected>Formosa</option>
            {
              values.idLocation.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}</option>
            ))
            }
          </select>

          <label className="form-label text-primary">Estudios</label>
          <select className="form-control" {...register("idStudy", {required: true}) }>
            
            {
              values.idStudy.map((study) => (
                  <option key={study.id} value={study.id}>{study.studyNivel}</option>
            ))
            }
          </select>

          <label className="form-label text-primary">Genero</label>
          <select className="form-control" {...register("idGender", {required: true}) }>
            
            {
              values.idGender.map((gender) => (
                  <option key={gender.id} value={gender.id}>{gender.gender}</option>
            ))
            }
          </select>
          
          <label className="form-label text-primary">Edad</label>
          <input type="number" className="form-control" {...register("age", {required: true, min: 17, max: 40}) } />
        </div>

        <div className="col-12 col-sm-12 col-md-10 col-lg-6 ">
          <label className="form-label text-primary small">¿Cual es el area académica que conciderás más importante?</label>
          <select className="form-control my-2" {...register("answerOne", {required: true}) }>
            
            {
              subjects.map((subject, i) => (
                <option key={i}>{subject}</option>
              ))
            }
          </select>

          <label className="form-label text-primary small">¿Cuál es tu nivel de satisfacción con la variedad de materias ofrecidas en tu área de estudio?</label>
          <select  className="form-control my-2" id="" {...register("answerTwo", {required: true}) }>
            
            <option value="Satisfecho">Satisfecho</option>
            <option value="Muy satisfecho">Muy satisfecho</option>
            <option value="Neutral">Neutral</option>
            <option value="Insatisfecho">Insatisfecho</option>
            <option value="Muy insatisfecho">Muy insatisfecho</option>
          </select>

          <label className="form-label text-primary small">Desde tu perspectiva ¿Cuál es la materia menos relevante para el cursado?</label>
          <select className="form-control my-2" {...register("answerThree", {required: true}) }>
            
            {
              subjects.map((subject, i) => (
                <option key={i}>{subject}</option>
              ))
            }
          </select>

          <label className="form-label text-primary small">¿Cómo describirías la comunicación entre los estudiantes y los departamentos académicos?</label>
          <select  className="form-control my-2" {...register("answerFour", {required: true}) }>
            
            <option value="eficiente">Eficiente y efectiva</option>
            <option value="aceptable">Aceptable pero podria mejorar</option>
            <option value="insatisfactoria">Insatisfactoria</option>
          </select>
        </div>

        <div className="col-12 col-sm-12 col-md-10 col-lg-6 ">

          <label className="form-label text-primary small">¿Qué materia crees que requiere más carga horaria en el cursado? </label>
          <select className="form-control my-2" {...register("answerFive", {required: true}) }>
            
            {
              subjects.map((subject, i) => (
                <option key={i}>{subject}</option>
              ))
            }
          </select>

          <label className="form-label text-primary small">En tu opinión, ¿Cuál es la asignatura que debería tener menos carga horaria?</label>
          <select className="form-control my-2" {...register("answerSix", {required: true}) }>
            
            {
              subjects.map((subject, i) => (
                <option key={i}>{subject}</option>
              ))
            }
          </select>

          <label className="form-label text-primary small">¿Que modalidad de cursado prefieres?</label>
          <select  className="form-control my-2" id="" {...register("answerSeven", {required: true}) }>
            
            <option value="Presencial">Presencial</option>
            <option value="Mixto">Mixto</option>
            <option value="Virtual">Virtual</option>
          </select>

          <label className="form-label text-primary small">¿Tienes alguna sugerencia específica para mejorar el plan académico? </label>
          <input type="text" className="form-control my-2" {...register("answerEight", {required: true, minLength: 20, maxLength:250}) } />
        </div>

          

        <button type="submit" className="btn btn-primary w-100 mt-3">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
