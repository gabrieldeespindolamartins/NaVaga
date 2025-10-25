  import MainContent from "./components/MainContent";
  import AnimatedLine from "./components/AnimatedLine";
  import Footer from "./components/Footer";

  function App() {

    return (
      <div className="flex flex-col min-h-screen">
        <div className="grow">
          <MainContent/>
          <AnimatedLine />
        </div>
        <Footer />
      </div>
    );
  } 

  export default App
