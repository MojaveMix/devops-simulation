import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Items List</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No items found. Add some!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Description</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{item.id}</td>
                  <td className="p-3 border-b">{item.name}</td>
                  <td className="p-3 border-b">{item.description}</td>
                  <td className="p-3 border-b space-x-2">
                    <Link
                      to={`/edit/${item.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 inline-block"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ItemList;
