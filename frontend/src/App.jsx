import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">CRUD App</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/add" className="hover:underline">Add Item</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4 mt-4">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/add" element={<ItemForm />} />
            <Route path="/edit/:id" element={<ItemForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
