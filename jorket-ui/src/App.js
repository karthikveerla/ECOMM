import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="pt-16">
         <AppRoutes />
      </main>
               {/* This loads your page content (LandingPage, Dashboard, etc.) */}

    </div>
  );
}

export default App;
