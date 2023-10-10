import Form from "../components/Form";
import '../pages/home.css';
const Home = () => {
  return (
    <>
      <main className="d-flex flex-column">
        <h1 className="text-center  text-primary my-4">Encuesta Mineria de Datos IPF</h1>
        <Form />
      </main>
    </>
  );
};

export default Home;
