import { Oval } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Oval
      visible={true}
      height={20}
      width={20}
      strokeWidth={8}
      color="#12141750"
      secondaryColor="#D1D5DB"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
