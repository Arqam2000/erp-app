import { useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className=" p-1 rounded text-blue-600 underline text-lg mb-6 cursor-pointer px-2">
      {/* <ArrowBackIcon /> */}
      Back
    </button>
  )
}

export default BackButton
