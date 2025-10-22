import React from 'react'

const MainContent = () => {
  return (
    <>
    <div className="flex flex-col items-center mt-20">
      <div>
        <p className="text-5xl font-bold text-white hover:text-gray-200 transition-colors duration-300"
        >
          Baixe NaVaga
        </p>
      </div>
      <div>
          <img src="/NaVaga.png" className="w-200 h-auto"/>
      </div>
      <div>
        <p className="text-3xl text-white font-bold text-center hover:text-gray-200 transition-colors duration-300"
        >
        Bora dar um stop! Disponivel <br/> agora para Android e iOS!
        </p>
      </div>
    </div> 
  </>
  )
}

export default MainContent