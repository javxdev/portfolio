import { images } from '../../images/images';
import CV_Javier_Gonzalez_PDF from './CV_-_Javier_González.pdf';


export default function Hero() {
  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = CV_Javier_Gonzalez_PDF;
    link.download = 'CV_Javier_González.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='md:flex items-center px-3 md:px-0 mt-2 md:mt-10 gap-x-10 mb-16'>
        <img className='border-4 border-neutral-200 size-28 md:size-36 rounded-full mx-auto md:m-0 mb-2 md:mb-0' 
          src={images.personalPhoto} alt="Foto de Javier González" />
        <div className='text-center'>
            <h1 className='text-yellow-500 font-bold text-3xl md:flex md:text-6xl md:pb-2'>Javier González</h1>
            <h2 className='text-black dark:text-neutral-200 font-semibold text-lg pt-1 pb-2'>
              Analista de sistemas y Desarrollador Full Stack de <span className='text-blue-400'>Argentina</span>.</h2>
            <div className='md:flex'>
              <button 
                className="text-black font-semibold px-4 py-2 bg-yellow-400/90 hover:bg-yellow-300 rounded-md" 
                onClick={downloadPDF}>
                  Descargar CV
              </button>
            </div>
        </div>
    </div>
  )
}
