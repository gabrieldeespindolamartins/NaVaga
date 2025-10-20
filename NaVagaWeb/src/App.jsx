
function App() {

  return (
    <>
      <div className="relative flex flex-col items-center justify-center mt-30">
        <div>
          <p className="text-6xl font-bold text-white mb-5 hover:text-gray-200 transition-colors duration-300"
          >
            Baixe NaVaga
          </p>
        </div>
        <div>
            <img src="/NaVaga.png" className="w-225 h-auto"/>
        </div>
        <div>
          <p className="text-4xl text-white font-bold text-center hover:text-gray-200 transition-colors duration-300"
          >
          Bora dar um stop! Disponivel <br/> agora para Android e iOS!
          </p>
        </div>
      </div> 
      <div className="absolute top-75 left-0 w-full -z-10 border-white border-dashed border-t-60"/>
    </>
  );
} 

export default App
